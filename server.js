const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const router = require('./app/router');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/login', router);
app.post('/register', router);
app.delete('/user', router);

app.listen(3000, ()=>{
	console.log(`listening to port ${port}`);
	console.log(app.req);
});