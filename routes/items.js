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


router.get('/', (req, res) => {
  console.log("get items activated");
  items.find().then(results => res.send(results));
});

router.post("/", async (req, res) => {
    console.log("/items POST end point activated");
    console.log(req.body);
  
    handlePost = req => {
      if (req.body._id === undefined) {
        console.log("ID undefined, add item");
        items.insert(req.body);
      } else {
        console.log("update item");
        items.update(
          { _id: req.body._id },
          {
            _id: req.body._id,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
          }
        );
      }
    };
    try {
      jwt.verify(req.cookies.adminToken, secret);
      await handlePost(req);
      items.find().then(result => res.status(200).send(result));
    } catch {
      res.status(401).end();
    }
  });

  router.delete("/:_id", async (req, res) => {
    jwt.verify(req.cookies.adminToken, secret);
    await items.findOneAndDelete({ _id: req.params._id });
    items.find().then(result => res.send(result));
  });

  // router.patch('/:id', (req, res) => {
//     cart = cart.ap(item => item.id === req.params.id ? {
//     ...item,
//     ...req.body
// }) : item
//     }
// res.send(cart)
// })

module.exports = router;
