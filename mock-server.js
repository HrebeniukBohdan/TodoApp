const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

let settings = {
  name: '',
  surname: '',
  mode: 'mode0',
  params: {
    param0: true,
    param1: false,
    param2: false,
    param3: false,
    param4: false,
    param5: false
  }
}

server.get('/settings', (req, res) => {
  res.json(settings)
})

server.patch('/settings', (req, res) => {
  if (req.body) {
    settings = req.body;
    res.json(settings)
  } else {
    res.sendStatus(400);
  }
})

server.post('/login', (req, res) => {
  console.log(req);
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    res.json({ token: '7ed3f27a-c87b-4d86' })
  } else {
    res.sendStatus(500);
  }
})

server.use((req, res, next) => {
  router;
  function isAuthorized(req) {
    return req.headers['x-auth-token'] === '7ed3f27a-c87b-4d86';
  }
  if (isAuthorized(req)) {
    next() // continue to JSON Server router
  } else {
    res.sendStatus(401)
  }
})

server.use((req, res, next) => {
  if (req.url === '/tasks' && req.method === 'POST') {
    req.body.creationDate = Date.now();
    req.body.completed = false;
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3001, () => {
  console.log('Todo mock-server is running')
})
