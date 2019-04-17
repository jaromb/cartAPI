module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'localhost:3000') //who is allowed to access
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')  //what methods are allowed
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Credentials', true)
    next()
  }