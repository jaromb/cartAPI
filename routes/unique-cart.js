const express = require("express");
const router = express.Router();
const monk = require("monk");
const jwt = require("jsonwebtoken");
const secret = "this is my secret";

const url =
  process.env.DB_URL ||
  "mongodb://jbridges:12345@cluster0-shard-00-00-xozgh.mongodb.net:27017,cluster0-shard-00-01-xozgh.mongodb.net:27017,cluster0-shard-00-02-xozgh.mongodb.net:27017/MyHelioDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
const db = monk(url);
const cart = db.get("cart");

router.get("/", (req, res) => {
    // verify user and get cart specific to that user
    decode = req.cookies.userToken
      ? jwt.verify(req.cookies.userToken, secret)
      : "guest";
  
    try {
      cart.find({ user: decode }).then(results => res.send(results));
    } catch {
      res.status(401).end();
    }
  });

  module.exports = router;