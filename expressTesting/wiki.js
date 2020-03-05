

// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();
var app = express();

// Home page route.
router.get('/', function (request, response) {
	console.log(parseRequest(request)) ;
	response.send('Wiki home page');
})

// About page route.
router.get('/about', function (request, response) {
  response.send('About this wiki');
})

router.post('/validateLogin', function(request, response){
	response.send('validate login request');
	console.log ("post request made");
})

const parseRequest = (request) => {
  let params = request.params || {}
  const body = request.body || {}

  // if (Object.keys(body).length) {
  //   params = Object.assign(params, body)
  // }

  return {
    params: params,
    query: request.query || {}
  }
}

// module.exports = {
// 	getSome: getSome
// }
module.exports = router
	//getSome: getSome,
	
