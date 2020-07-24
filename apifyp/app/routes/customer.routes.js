module.exports = function(app) {
var cors = require('cors');
app.use(cors());
var customers = require('../controllers/customer.controller.js');
//get user
app.get('/customers/:userName/:password', customers.getUser);

// Create a new Customer
app.post('/customers/createAccount', customers.createAccount);

//log in using userName and password
app.post('/customers/logIn', customers.logIn);

// deletes a user account using their userName
app.delete('/customers/:userName/:password', customers.deleteUser);

app.post('/customers/updateUser', customers.updateUser);

}
