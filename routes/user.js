const express = require("express");
const router = express.Router();
const monk = require("monk");
const jwt = require("jsonwebtoken");
const secret = "this is my secret";

const url =
  process.env.DB_URL ||
  "mongodb://jbridges:12345@cluster0-shard-00-00-xozgh.mongodb.net:27017,cluster0-shard-00-01-xozgh.mongodb.net:27017,cluster0-shard-00-02-xozgh.mongodb.net:27017/MyHelioDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
const db = monk(url);
const users = db.get("users");

router.post("/login", (req, res) => {
  console.log("user login POST activated");
  users
    .findOne({ username: req.body.username, password: req.body.password })
    .then(result => {
      console.log(result);
      const userToken = jwt.sign(result.username, secret);
      const response = { username: result.username, token: userToken };
      res.cookie("userToken", userToken, { sameSite: "none", secure: true });
      res.status(200).send({
        response
      });
    })
    .catch(() => {
      res.status(401).end();
    });
});

router.get("/logout", (req, res) => {
  res
    .clearCookie("userToken")
    .status(200)
    .end();
});

module.exports = router;
