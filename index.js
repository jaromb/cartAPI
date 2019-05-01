const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')
const headers = require('./headers')
const monk = require('monk')
const jwt = require('jsonwebtoken');

const secret = 'this is my secret'

const port = process.env.PORT || 4000
const url = process.env.DB_URL || 'mongodb://jbridges:12345@cluster0-shard-00-00-xozgh.mongodb.net:27017,cluster0-shard-00-01-xozgh.mongodb.net:27017,cluster0-shard-00-02-xozgh.mongodb.net:27017/MyHelioDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const db = monk(url)

db.then(() => {
    console.log('connected')
  })

const items = db.get('items')
const cart = db.get('cart')
const users = db.get('users')
const admins = db.get('admins')


app.use(headers)
app.use(bodyParser.json())
app.use(cookieParser())

//using async await
//app.get('/', async function(req, res) {
//     const results = aewait items.find()
//     res.status(200).send(results)
// })

//using promises
app.get('/items', (req,res)  => {
        console.log('get items activated')
    items.find()
    .then(results => res.send(results))   
}
)

app.get('/admin/items', (req,res) => {
    try {
        console.log('attempting to access user database')
        jwt.verify(req.cookies.adminToken, secret) 
        items.find()
        .then(results => res.send(results)) 
        
    }
    catch {
        console.log('User GET catch process performed')
        res.status(401).end()
    }
})

app.get('/unique-cart', (req,res) => {
    // verify user and get cart specific to that user
    decode = req.cookies.userToken ? jwt.verify(req.cookies.userToken, secret) : 'guest'

    try {
        cart.find({user: decode})
        .then(results => res.send(results))
    }
    catch {
        res.status(401).end()
    }
}
)

app.get('/users', (req,res) => {
    try {
        console.log('attempting to access user database')
        jwt.verify(req.cookies.adminToken, secret) 
        users.find()
        .then(results => res.send(results)) 
        
    }
    catch {
        console.log('User GET catch process performed')
        res.status(401).end()
    }
})

app.get('/admins', (req,res) =>{
    try {
        jwt.verify(req.cookies.adminToken, secret)
        admins.find()
        .then(results => res.send(results))
    }
    catch {
            res.status(401).end()
    }
}
)


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
    try{ jwt.verify(req.cookies.adminToken, secret)
    await handlePost(req)
    items.find()
        .then(result => res.status(200).send(result))
    }
    catch {
        res.status(401).end()
    }
})


app.post('/users', async (req, res) => {
    console.log('users creation (POST) endpoint activated')
    console.log(req.body.username)
    let userSearch
    await users.findOne({username: req.body.username})
    .then(result => userSearch = result)
console.log(userSearch)
    try {    
        console.log('user POST try activated')
        if(userSearch === null) {
            console.log('if statement passed')
             await users.insert(req.body)
             users.findOne({username: req.body.username})
                .then(result => res.send(result))  
        }
        else {
            console.error(error)
        }
    }
    catch {
        console.log('user POST catch activated')
        res.status(409).end()
    }
})


app.post('/admins', async (req, res) => {
    jwt.verify(req.cookies.adminToken, secret)
    await admins.insert(req.body)
    users.find().then(result => res.send(result))
})

app.post('/admin/login', (req, res) => {
    console.log('Admin login POST activated')
    admins.findOne({username: req.body.username, password: req.body.password})
    .then(result =>  {
        const adminToken = jwt.sign(result.username, secret)
        res.cookie('adminToken', adminToken)
        res.status(200).send({
            result      
        }) 
    })
        .catch(() => {
            res.status(401).end();
        }) 
})

app.post('/user/login', (req, res) => {
    console.log('user login POST activated')
    users.findOne({username: req.body.username, password: req.body.password})
    .then(result => {
        console.log(result)
        const userToken = jwt.sign(result.username, secret)
        res.cookie('userToken', userToken)
        res.status(200).send({
            result
        })
    })
        .catch(() =>{
            res.status(401).end();
    })
})

app.get('/user/logout', (req, res) => {
    res.clearCookie('userToken').status(200).end()
})

app.get('/admin/logout', (req, res) => {
    res.clearCookie('adminToken').status(200).end()
})


app.post('/cart', async (req, res) => {

   decode = req.cookies.userToken ? jwt.verify(req.cookies.userToken, secret) : "guest"

   item = req.body
   item.user = decode
   console.log(item.user)
   item.itemID = item._id
   delete item._id

   console.log(item)

    async function addItem(item) {
        console.log("ADD ITEM")
        await cart.insert(item)
            cart.find({user: decode})
            .then(result => res.send(result))
        } 
        addItem(item)                    
    })

   
app.put('/cart', async (req,res) => {
    const item = req.body
    console.log('update item')

    decode = req.cookies.userToken ? jwt.verify(req.cookies.userToken, secret) : "guest"

    await cart.findOneAndUpdate({_id: item._id}, item)
        cart.find({user: decode})
            .then(result => res.send(result))
    })

app.put('/users', async (req,res) => {
    const item = req.body
    console.log('update user')
    
    try {jwt.verify(req.cookies.adminToken, secret)
     await users.findOneAndUpdate({_id: item._id}, item)
         users.find()
             .then(result => res.send(result))
    }
    catch {
        res.status(401).end()
    }
     })

app.put('/admins', async (req, res) => {
    const item = req.body
    try {
        jwt.verify(req.cookies.adminToken, secret)
        await admins.findOneAndUpdate({_id: item._id}, item)
            admins.find()
                .then(result => res.send(result))
    }
    catch{
        res.status(401).end()
    }

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
    decode = req.cookies.userToken ? jwt.verify(req.cookies.userToken, secret) : "guest"
    console.log('cart DELETE activated')
               
    await cart.findOneAndDelete({_id : req.params._id})
        cart.find({user: decode})
            .then(result => res.send(result))     
})

app.delete('/users/:_id', async (req, res) => {  
    console.log('user DELETE activated')
     
    try { jwt.verify(req.cookies.adminToken, secret)           
     await users.findOneAndDelete({_id : req.params._id})
         users.find()
             .then(result => res.send(result))   
    }
    catch{
        res.status(401).end()
    }  
 })



app.delete('/items/:_id', async (req, res) => {  
   jwt.verify(req.cookies.adminToken, secret)
    await items.findOneAndDelete({_id: req.params._id})
    items.find()
        .then(result=> res.send(result))          
})

app.listen(port, (err) => {
    if(err){ throw err}
    console.log('Server up and running on port ' + port)
})

