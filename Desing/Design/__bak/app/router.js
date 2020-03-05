//Import module "models"
const models = require('./models')

//Break the request into parameters, query and body
const parseRequest = (request) => {
  let params = request.params || {}
  const body = request.body || {}

  if (Object.keys(body).length) {
    params = Object.assign(params, body)
  }

  return {
    params: params,
    query: request.query || {}
  }
}


class Response {
  constructor(response) {
    this.response = response
    this.result = {
      status: null,
      message: null,
      data: null
    }
  }

  error(message = '') {
    this.result.status = 'error'
    this.result.message = message.toString()

    return this.send()
  }

  success(data) {
    this.result.status = 'success'

    if (typeof data !== 'undefined') {
      this.result.data = data
    }

    return this.send()
  }

  send() {
    return this.response.json(this.result)
  }
}


//Handle get users request
const getUsers = async (request, response) => {
  const data = await models.users.get()

  return new Response(response)
    .success(data)
}

const getUser = async (request, response) => {
  const {params} = parseRequest(request)
  const data = await models.users.get({
    id: params.id || 0
  })

  return new Response(response)
    .success(data)
}

//Handle post users request
const postUsers = async (request, response) => {
  const {params} = parseRequest(request)
  const id = await models.users.save(params)

  return new Response(response)
    .success({
      id: id
    })
}

const postLogin = async (request, response) => {
  const {params} = parseRequest(request)

  try {
    const data = await models.users.get(params)

    if (!Object.keys(data).length) {
      return new Response(response)
        .error('Unable to log in. Please try again')
    }

    if (!data.status) {
      return new Response(response)
        .error('Your account has been suspended')
    }
  } catch (e) {
    return new Response(response)
      .error('An error occurred while processing request')
  }

  return new Response(response)
    .success({
      token: Date.now().toString()
    })
}

const getCollections = async (request, response) => {
  const data = await models.collections.get()

  return new Response(response)
    .success(data)
}

const postCollections = async (request, response) => {
  const {params} = parseRequest(request)
  const id = await models.collections.save(params)

  return new Response(response)
    .success({
      id: id
    })
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  postUsers: postUsers,
  postLogin: postLogin,
  getCollections: getCollections,
  postCollections: postCollections
}
