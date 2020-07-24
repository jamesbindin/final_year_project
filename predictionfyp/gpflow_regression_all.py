#!/usr/bin/env python
# coding: utf-8

# In[24]:


import gpflow
import numpy as np
import matplotlib
import requests
import json
from datetime import datetime, timedelta
import tensorflow
import sys
import pickle
import os


# In[25]:


#All currency pairs and timeframes
currencyPairs = ["EUR_USD", "USD_JPY", "GBP_USD", "USD_CHF"]
timeFrames = ["M5", "M15", "M30", "H1", "H4"]

#Object to store the called chart data
chartData = { "EUR_USD":{}, "USD_JPY":{}, "GBP_USD":{}, "USD_CHF":{} }

#Object to store processed data 
processedData = { "EUR_USD":{"M5":[], "M15":[],"M30":[], "H1":[], "H4":[] },
                 "USD_JPY":{"M5":[], "M15":[],"M30":[], "H1":[], "H4":[] },
                 "GBP_USD":{"M5":[], "M15":[],"M30":[], "H1":[], "H4":[] },
                 "USD_CHF":{"M5":[], "M15":[],"M30":[], "H1":[], "H4":[] }
                }
#Number of data points
N = 100
for cp in currencyPairs:
    currencyPair = cp
    for tf in timeFrames:
        timeFrame = tf

        url = "https://api-fxpractice.oanda.com/v3/instruments/" + currencyPair + "/"
        p = "candles?count="+str(N)+"&granularity=" + timeFrame

        h={
            "Authorization": "NEED OANDA API KEY",
            "Content-Type": "application/json"
        }

        res = requests.get(url+p, headers=h).json()
        chartData[cp][tf] = res["candles"]


# In[26]:


for cp in currencyPairs:
    for tf in timeFrames:

        #Reset tensorflow session and pass to gpflow
        tensorflow.reset_default_graph()
        graph = tensorflow.get_default_graph()
        gpflow.reset_default_session(graph=graph)

        #Store candle data for a specific currency pair and timeframe
        candles = chartData[cp][tf]
        #Stores the median value of candle for Y axis and 
        #sequence between 0 and 1.10 for X
        data = np.zeros(shape=(N,2))

        maxVal = 0.
        minVal = 1000.
        for c in candles:

            median = 0.0
            i = candles.index(c)

            closePipVal = float(candles[i]["mid"]["c"])
            openPipVal =  float(candles[i]["mid"]["o"])   

            #get the median betwen open and close values of candlestick bars
            if(closePipVal >= openPipVal):
                median = ( (closePipVal - openPipVal) / 2) + openPipVal
            else:
                median = ( (openPipVal - closePipVal) / 2) + closePipVal

            #find min and max values
            if median > maxVal:
                maxVal = median
            if median < minVal:
                minVal = median

            #set values of data and scale for easier calculation
            data[i,0] = float(i)/N
            data[i,1] = median
        
        #calculate mean and standard deviation from colleced data
        initialMean = np.sum(data[:,1]) / N
        initialStdDev = np.sqrt(np.sum((data[:,1] - initialMean) ** 2) / N)

        #scale data using standisation
        data[:,1] = (data[:,1] - initialMean) / initialStdDev

        X = data[:, 0].reshape(-1,1)
        Y = data[:, 1].reshape(-1,1)
        
        #initilise first kernal and model
        k1 = gpflow.kernels.Matern52(1, lengthscales = 0.5)
        m1 = gpflow.models.GPR(X, Y, k1)
        m1.compile()
        
        xx1 = np.linspace(0.0, 1.0, 100).reshape(100, 1)

        mean1, var1 = m1.predict_y(xx1)             
        
        
#       second kernal and model initilisation
        k2 = gpflow.kernels.Matern52(1, lengthscales = 0.5)
        m2 = gpflow.models.GPR(X, mean1, k2)
        m2.kern.lengthscales.trainable = False
        
#       check model exists if so load its trainables
        if os.path.isfile('./model_'+cp+'_'+tf) == True:
            with open('./model_'+cp+'_'+tf, 'rb') as fp:
                param_dict = pickle.load(fp)
                m2.assign(param_dict)
        
        m2.compile()
        gpflow.train.ScipyOptimizer().minimize(m2)
        
        xx2 = np.linspace(0, 1.1, 110).reshape(110, 1)
        mean2, var2 = m2.predict_y(xx2)
        
        with open('./model_'+cp+'_'+tf, 'wb') as fp:
            pickle.dump(m2.read_trainables(), fp)
        
        # scale values back to normal 
        Y = (Y * initialStdDev) + initialMean
        mean2 = (mean2 * initialStdDev) + initialMean
        var1 = var1 * initialStdDev
        
        
        for i in range(0,mean2.shape[0]):
            processedData[cp][tf].append({"mean":mean2[i][0], "var":var2[i][0]})
            if i < N:
                processedData[cp][tf][i]["time"] = candles[i]["time"]


# In[27]:


formatStr = '%Y-%m-%dT%H:%M:%S.%f000Z'

marketClose = datetime.strptime("21:00:00", "%H:%M:%S").time()
hr48 = timedelta(hours=48)
for cp in currencyPairs:
    for tf in timeFrames:
        timeOne = datetime.strptime(processedData[cp][tf][98]["time"], formatStr)
        timeTwo = datetime.strptime(processedData[cp][tf][99]["time"], formatStr)
        
        compareTime = timeTwo - timeOne
        for i in range(100, 110):
            previousTime = datetime.strptime(processedData[cp][tf][i-1]["time"], formatStr)
            day = previousTime.strftime('%A')
            timeAfterBarFin = previousTime + compareTime

            if (day == "Friday") and (timeAfterBarFin.time() == marketClose):
                newTime = previousTime + compareTime + hr48
            else:
                newTime = previousTime + compareTime

            processedData[cp][tf][i]["time"] = newTime.strftime(formatStr)


# In[28]:


for cp in currencyPairs:
    jsonData = processedData[cp]

    url = 'URL TO API'+cp
#     url = 'http://localhost:5000/gpr/'+cp
    r = requests.post(url, json = jsonData)
    print(r)
    sys.stdout.flush()

