const express = require("express");
const router = express.Router();
const monk = require("monk");
const jwt = require("jsonwebtoken");

const url =
  process.env.DB_URL ||
  "mongodb://jbridges:12345@cluster0-shard-00-00-xozgh.mongodb.net:27017,cluster0-shard-00-01-xozgh.mongodb.net:27017,cluster0-shard-00-02-xozgh.mongodb.net:27017/MyHelioDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
const db = monk(url);
const cart = db.get("cart");

router.post("/", async (req, res) => {
    decode = req.cookies.userToken
      ? jwt.verify(req.cookies.userToken, secret)
      : "guest";
  
    item = req.body;
    item.user = decode;
    console.log(item.user);
    item.itemID = item._id;
    delete item._id;
  
    console.log(item);
  
    async function addItem(item) {
      console.log("ADD ITEM");
      await cart.insert(item);
      cart.find({ user: decode }).then(result => res.send(result));
    }
    addItem(item);
  });
  
  router.put("/", async (req, res) => {
    const item = req.body;
    console.log("update item");
  
    decode = req.cookies.userToken
      ? jwt.verify(req.cookies.userToken, secret)
      : "guest";
  
    await cart.findOneAndUpdate({ _id: item._id }, item);
    cart.find({ user: decode }).then(result => res.send(result));
  });
  
  
  router.delete("/:_id", async (req, res) => {
    decode = req.cookies.userToken
      ? jwt.verify(req.cookies.userToken, secret)
      : "guest";
    console.log("cart DELETE activated");
  
    await cart.findOneAndDelete({ _id: req.params._id });
    cart.find({ user: decode }).then(result => res.send(result));
  });

module.exports = router;