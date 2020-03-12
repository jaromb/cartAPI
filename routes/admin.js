const express = require("express");
const router = express.Router();
const monk = require("monk");
const jwt = require("jsonwebtoken");
const secret = "this is my secret";

const url =
  process.env.DB_URL ||
  "mongodb://jbridges:12345@cluster0-shard-00-00-xozgh.mongodb.net:27017,cluster0-shard-00-01-xozgh.mongodb.net:27017,cluster0-shard-00-02-xozgh.mongodb.net:27017/MyHelioDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
const db = monk(url);
const items = db.get("items");
const users = db.get("users");
const admins = db.get("admins");

router.get("/items", (req, res) => {
  try {
    console.log("attempting to access items database");
    jwt.verify(req.cookies.adminToken, secret);
    items.find().then(results => res.send(results));
  } catch {
    console.log("items GET catch process performed");
    res.status(401).end();
  }
});

router.post("/user-management", async (req, res) => {
  console.log("users creation (POST) endpoint activated");
  console.log(req.body.username);
  let userSearch;
  await users
    .findOne({ username: req.body.username })
    .then(result => (userSearch = result));
  console.log(userSearch);
  try {
    console.log("user POST try activated");
    if (userSearch === null) {
      console.log("if statement passed");
      await users.insert(req.body);
      users.find().then(result => res.send(result));
    } else {
      console.error(error);
    }
  } catch {
    console.log("user POST catch activated");
    res.status(409).end();
  }
});

router.post("/login", (req, res) => {
  console.log("Admin login POST activated");
  admins
    .findOne({ username: req.body.username, password: req.body.password })
    .then(result => {
      const adminToken = jwt.sign(result.username, secret);
      res.cookie("adminToken", adminToken, { SameSite: "None", Secure: true });
      res.status(200).send({
        result
      });
    })
    .catch(() => {
      res.status(401).end();
    });
});

router.get("/logout", (req, res) => {
  res
    .clearCookie("adminToken")
    .status(200)
    .end();
});

module.exports = router;
