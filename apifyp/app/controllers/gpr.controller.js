
let	ObjectID = require('mongodb').ObjectID;
let mongo = require('mongodb').MongoClient;
// mongo db url with password. blanked out for privacy 
const url = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

exports.setData = function(req, result) {
	this.currencyPair = req.params.currencyPair;
	this.result = result;
	function setDataInner(cursor){
		this.cursor = cursor;
		cursor.updateOne({ "currencyPair":this.currencyPair}, {
			$set: {
				"data":req.body
			}
			}, (err, res) => {
				if(err) throw err;
				if(res === null){
					this.result.send({"message":"update unsuccessful"});
			}
			else{
				this.result.send(res);
			}
		})
	}
	connectToDb(setDataInner);
	}

	exports.getData = function(req, result) {
		this.result = result;
		function getDataInner(cursor){
			this.cursor = cursor;

			cursor.find().toArray((err, res) => {
				this.result.send(res)
			})
		}
		connectToDb(getDataInner);
		}

//connects to database and takes a callback argument to use the connection
function connectToDb(callbackFunction) {
	mongo.connect(url, { useNewUrlParser: true }, (err, dataBase) => {
		if (err) throw err;
		let cursor = dataBase.db("ForexPlatform").collection('gpr');
		callbackFunction(cursor);
	})
}
