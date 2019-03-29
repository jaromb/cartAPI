module.exports = (req, res, next) => {
    res.header('access-control-allow-origin', '*') //who is allowed to access
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, PATCH')  //what methods are allowed
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
  }