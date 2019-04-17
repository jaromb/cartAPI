const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')
const headers = require('./headers')
const cors = require('cors')
const monk = require('monk')
const jwt = require('jsonwebtoken');

const secret = 'this is my secret'

const port = process.env.PORT || 4000
const url = process.env.DB_URL
const db = monk(url)

db.then(() => {
    console.log('connected')
  })

const items = db.get('items')
const cart = db.get('cart')
const users = db.get('users')

// app.use(cors())
app.use(headers)
app.use(bodyParser.json())
app.use(cookieParser())

//using async await
//app.get('/', async function(req, res) {
//     const results = aewait items.find()
//     res.status(200).send(results)
// })

//using promises
app.get('/items', (req,res)  =>
    items.find()
    .then(results => res.send(results))
)

app.get('/cart', (req,res) =>
    cart.find()
        .then(results => res.send(results))
)

app.get('/users', (req,res) => 
    users.find()
        .then(results => res.send(results)))


app.get('/', async (req, res) => {
    res.send('Welcome to my API')
})

app.post('/items', async (req, res) => {
    console.log('/items POST end point activated')
    console.log(req.body)
    
    handlePost = (req) => {
    if(req.body._id === undefined) {
        console.log('ID undefined, add item')
        items.insert(req.body)
    }
    else {
        console.log('update item')
            items.update({_id: req.body._id}, {_id: req.body._id, name: req.body.name, price: req.body.price, image: req.body.image})
    } 
}
    await handlePost(req)
    items.find()
        .then(result => res.send(result))
})


app.post('/users', async (req, res) => {
    console.log('users POST endpoint activated')
    await users.insert(req.body)
    users.find().then(result => res.send(result))
})

app.post('/admin/login', (req, res) => {
    console.log('login POST activated')
    users.findOne({username: req.body.username, password: req.body.password})
        .then(result =>  {
            const token = jwt.sign(result, secret);
            console.log(token)
            res.cookie('token', token, {httpOnly: false})
        })  
})


app.post('/cart', async (req, res) => {
   item = req.body
    async function addItem(item) {
        console.log("ADD ITEM")
        await cart.insert(item)
            cart.find()
            .then(result => res.send(result))
        } 
        addItem(item)                    
    })

   
app.put('/cart', async (req,res) => {
    item = req.body
    console.log('update item')
    await cart.findOneAndUpdate({_id: item._id}, item)
        cart.find()
            .then(result => res.send(result))
    })

app.put('/users', async (req,res) => {
    item = req.body
    console.log('update item')
     await users.findOneAndUpdate({_id: item._id}, item)
         users.find()
             .then(result => res.send(result))
     })


// app.patch('/items/:id', (req, res) => {
//     cart = cart.ap(item => item.id === req.params.id ? {
//     ...item,
//     ...req.body
// }) : item
//     }
// res.send(cart)
// })


app.delete('/cart/:_id', async (req, res) => {  
   console.log('cart DELETE activated')
               
    await cart.findOneAndDelete({_id : req.params._id})
        cart.find()
            .then(result => res.send(result))     
})

app.delete('/users/:_id', async (req, res) => {  
    console.log('cart DELETE activated')
                
     await users.findOneAndDelete({_id : req.params._id})
         users.find()
             .then(result => res.send(result))     
 })



app.delete('/items/:_id', async (req, res) => {  
   await items.findOneAndDelete({_id: req.params._id})
    items.find()
        .then(result=> res.send(result))          
})

app.listen(port, (err) => {
    if(err){ throw err}
    console.log('Server up and running on port ' + port)
})

