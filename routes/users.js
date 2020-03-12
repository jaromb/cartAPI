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

router.get("/", (req, res) => {
  try {
    console.log("attempting to access user database");
    jwt.verify(req.cookies.adminToken, secret);
    users.find().then(results => res.send(results));
  } catch {
    console.log("User GET catch process performed");
    res.status(401).end();
  }
});

router.post("/", async (req, res) => {
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
      users
        .findOne({ username: req.body.username })
        .then(result => res.send(result));
    } else {
      console.error(error);
    }
  } catch {
    console.log("user POST catch activated");
    res.status(409).end();
  }
});

router.put("/", async (req, res) => {
  const item = req.body;
  console.log("update user");

  try {
    jwt.verify(req.cookies.adminToken, secret);
    await users.findOneAndUpdate({ _id: item._id }, item);
    users.find().then(result => res.send(result));
  } catch {
    res.status(401).end();
  }
});

router.delete("/:_id", async (req, res) => {
  console.log("user DELETE activated");

  try {
    jwt.verify(req.cookies.adminToken, secret);
    await users.findOneAndDelete({ _id: req.params._id });
    users.find().then(result => res.send(result));
  } catch {
    res.status(401).end();
  }
});

module.exports = router;
