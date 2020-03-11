const express = require("express");
const router = express.Router();
const monk = require("monk");
const jwt = require("jsonwebtoken");

const url =
  process.env.DB_URL ||
  "mongodb://jbridges:12345@cluster0-shard-00-00-xozgh.mongodb.net:27017,cluster0-shard-00-01-xozgh.mongodb.net:27017,cluster0-shard-00-02-xozgh.mongodb.net:27017/MyHelioDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
const db = monk(url);
const admins = db.get("admins");

router.get("/", (req, res) => {
    try {
      jwt.verify(req.cookies.adminToken, secret);
      admins.find().then(results => res.send(results));
    } catch {
      res.status(401).end();
    }
  });    
  
  
  router.post("/", async (req, res) => {
    jwt.verify(req.cookies.adminToken, secret);
    await admins.insert(req.body);
    admins.find().then(result => res.send(result));
  });
  
  router.put("/", async (req, res) => {
    const item = req.body;
    console.log("admin PUT activated");
    try {
      console.log("admin PUT try activated");
      jwt.verify(req.cookies.adminToken, secret);
      await admins.findOneAndUpdate({ _id: item._id }, item);
      admins.find().then(result => res.send(result));
    } catch {
      console.log("admin PUT catch activated");
      res.status(401).end();
    }
  });
  
  router.delete("/:_id", async (req, res) => {
    console.log("user DELETE activated");
  
    try {
      jwt.verify(req.cookies.adminToken, secret);
      await admins.findOneAndDelete({ _id: req.params._id });
      admins.find().then(result => res.send(result));
    } catch {
      res.status(401).end();
    }
  });



module.exports = router;