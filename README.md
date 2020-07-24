# final_year_project
My final year project for university. It is a trading simulator that lets users view an interactive chart showing data from the Forex market. Users can make practice trades and view a prediction that uses gaussian processes.


![Image_1](https://github.com/jamesbindin/final_year_project/blob/master/fyp_1.PNG)
The project consisted of three parts.

The website, seen above, was written mostly in React.js, it used D3.js  for the charts, and mocha for testing. It features a login system that uses hashing to keep the password secure.
The user can create, delete and login to their account, as well as make and end trades. The data is from Oanda's API.

The prediction part of the project is written in python, it is set on a timer that wakes the app and runs the algorithm for the prediction then stores it using the API.
The prediction used is called Gaussian Process regression. It is a form of machine learning which is non parametric, it gives the regressions mean and its confidence, illustrated in the screenshots.

The API is written in Express.js. It is used for crud operations on the DB. Specifically for the user accounts, their trades and the prediction data.

The database used was MongoDB, I used MongoDB Atlas, which is a cloud based database, for the project.

Each part of the project were Separate apps. Each deployed on Heroku. The API and main website used Node.js. The prediction used Django because it was written in Python.
![Image_2](https://github.com/jamesbindin/final_year_project/blob/master/fyp_2.PNG)

![Image_3](https://github.com/jamesbindin/final_year_project/blob/master/fyp_3.PNG)


PLEASE NOTE: The projects api keys have been deleted for my own privacy. If you get an api key from oanda, a url for the express app and a mongodb atlas account. I should work fine.
