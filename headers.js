module.exports = (req, res, next) => {
  var allowedOrigins = [
    "https://my-helio-cart.herokuapp.com",
    "https://my-helio-cart-admin.herokuapp.com",
    "http://localhost:3002",
    "http://localhost:3001",
    "http://localhost:3000"
  ];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) !== -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000') //who is allowed to access
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH"); //what methods are allowed
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
};
