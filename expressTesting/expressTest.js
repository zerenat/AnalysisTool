const express = require ("express");
var wiki = require ('./wiki');

var app = express();

app.use('/', wiki);

// app.get('/', wiki);
// app.get('/about', wiki);
// app.post('/validateLogin', wiki);

app.listen(3000, ()=> {
	console.log(`listening to port ${3000}`)
})