var mongo = require('mongodb')
	.MongoClient;
const url = 'NEED TO ADD MONGO DB ATLAS URL';

//get user
exports.getUser = function(req, result){
	this.userName = req.params.userName;
	this.password = req.params.password;
	this.result = result;

	function getUserInner(cursor){
		this.cursor = cursor;
		cursor.findOne({"userName":userName, "password":password}, (err, res) => {
			if(err){
        throw err;
      }
			else {
        if(res !== null){
          if((res.userName == this.userName) && (res.password == this.password)){
				    this.result.send(res);
          } else {
            this.result.send({"message":"get failure"});
          }
        } else {
          this.result.send({"message":"get failure"});
        }
      }
    })
  }
  connectToDb(getUserInner);
}

//create account
exports.createAccount = function(req, result) {
	this.body = req.body;
	 this.userName = body.userName;
	this.result = result;

	function createAccountInner(cursor) {
		this.cursor = cursor;
		cursor.find({ "userName": userName }).toArray((errFind, resFind) => {
			if (errFind) throw errFind;
			  if (resFind.length === 0){
				  this.cursor.insertOne(body, (err, res) => {
					if (err){
            throw err;
            this.result.send(err);
          } else {
            if(res !== null){
              if(res.ops[0].userName == this.userName){
                this.result.send(res.ops);
              } else {
				        this.result.send({"message":"create account failure"});
              }
            } else {
				        this.result.send({"message":"create account failure"});
            }
          }
				});
			} else {
				this.result.send({"message":"account already exists"});
			}
		});
	}
	connectToDb(createAccountInner);
}

// log in
exports.logIn = function(req, result){
	this.userName = req.body.userName;
	this.password = req.body.password;
	this.result = result;

	function logInInner(cursor){
		this.cursor = cursor;
		cursor.findOne({ "userName": this.userName, "password": this.password }, (err, res) => {
			if (err) {
				this.result.send(err);
				throw err;
				}
			else{
        if(res !== null)
        {
          if(res.userName == this.userName && res.password === this.password){
				    this.result.send(res);
          } else {
		        this.result.send({"message":"login failure"});
          }
        } else {
		      this.result.send({"message":"login failure"});
        }
			}
		})
	}
	connectToDb(logInInner);
}

// deletes a user account using their userName and password
exports.deleteUser = function(req, result) {
	this.userName = req.params.userName;
	this.password = req.params.password;
	this.result = result;
	function deleteUserInner(cursor) {
		cursor.deleteOne({ "userName": this.userName, "password": this.password }, (err, res) => {
			if (err) throw err;
      if(res !== null){
        if(res.result.n > 0){
          this.result.send(res);
        } else {
          this.result.send({"message":"Delete failure"});
        }
      } else {
        this.result.send({"message":"Delete failure"});
      }
		})
	}
	connectToDb(deleteUserInner);
}

//update user
exports.updateUser = function(req, result) {
	this.userName = req.body.userName;
	this.password = req.body.password;
	this.body = req.body;
	this.result = result;

function updateUserInner(cursor){
		this.cursor = cursor;

		cursor.updateOne({ "userName": body.userName }, {
			$set: {
				"userName":body.userName,
				"firstName":body.firstName,
				"lastName":body.lastName,
				"email":body.email,
				"password":body.password,
				"equity":body.equity,
				"trades":body.trades
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
	connectToDb(updateUserInner);
}

//connects to database and takes a callback argument to use the connection
function connectToDb(callbackFunction) {
	mongo.connect(url, { useNewUrlParser: true }, (err, dataBase) => {
		if (err) throw err;
		let cursor = dataBase.db("ForexPlatform").collection('customers');
		callbackFunction(cursor);
	}) //end connection
}
