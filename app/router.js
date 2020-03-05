const express = require ('express');
const router = express.Router();
const mySQL = require('mysql-model');
const bodyParser = require ('body-parser');
const users = require ('./users');
const promise = require('Promise');

//general register request===============================
//THIS GETS CALLED=======================================
router.post('/register', async function (request, response) {

    const params = parseRequest(request);
    console.log("register");
    let columns = ["users.email"];
    let conditions = ["users.email = 'Johnon@gmail.com'", "users.firstname = 'John'"];
    console.log('blah')
    let resp = await users.get(columns, conditions);

    response.send(resp);
});
//==================================================

router.post('/login', function (request, response, error){
  const params = parseRequest(request);
	console.log(request.body);
  console.log("post user");
	response.send('server is listening');
  if (error) {
    throw(error);
    console.log("something went rot");
  } 
});

router.delete('/user', function (request, response){
  const params = parseRequest(request);
  consolse.log("delete requst");
})

const parseRequest = (request) => {
  let params = request.params || {}
  const body = request.body || {}

  if (Object.keys(body).length) {
    console.log("called");
    params = Object.assign(params, body)
  }

  return {
    params: params,
    query: request.query || {}
  }
}


router.post('/validateLogin', function (request, response){
	let body = request.body;
	console.log(body.name);
	console.log(body.job);
	console.log("validateLogin");
	response.send('success!');
})

class Response {
  constructor(response) {
    this.response = response
    this.result = {
      status: null,
      message: null,
      data: null
    }
  }

  //Failed data retrieval 
  error(message = '') {
    this.result.status = 'error'
    this.result.message = message.toString()

    return this.send()
  }

  //Successful query data that is sent back to the client using "send()"
  success(data) {
    this.result.status = 'success'

    if (typeof data !== 'undefined') {
      this.result.data = data
    }

    return this.send()
  }

  //Send back a response from the server
  send() {
    return this.response.json(this.result)
  }
}

module.exports = router









