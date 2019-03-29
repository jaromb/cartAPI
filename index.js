const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const headers = require('./headers')

app.use(headers)
app.use(bodyParser.json())

let items = [
    {name: 'Cereal',
    id: 'rtql91bvnkr',
    image: 'https://images-na.ssl-images-amazon.com/images/G/01/aplusautomation/vendorimages/c3d80660-ba9e-4f42-b989-a423ba979fc2.jpg._CB289958391_.jpg',
    price: '4.00'},
    {name: 'Bananas',
    id: 'q5v4hl7at3a',
    image: 'https://img.purch.com/rc/300x200/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA2NS8xNDkvb3JpZ2luYWwvYmFuYW5hcy5qcGc=',
    price: '2.00'},
    {name:'Steak',
    id: 'jzngrdlngf',
    image: 'https://cdn.shopify.com/s/files/1/1579/5769/products/ribeye_prime_1_1024x1024.jpg?v=1479226988',
    price: '8.00'},
    {name:'Orange Juice',
    id: '6plkngyk23i',
    image: 'https://instamartkauai.com/wp-content/uploads/2018/04/large_add3b7ed-a890-485b-827a-294c0a3a740e-600x600.jpg',
    price: '3.50'},
    {name: 'Bread',
    id: 'p5n3m5xud5m',
    image: 'https://e22d0640933e3c7f8c86-34aee0c49088be50e3ac6555f6c963fb.ssl.cf2.rackcdn.com/0072250037060_CL_default_default_large.jpeg',
    price: '1.00'},
    {name: 'Milk',
    id: 'wsjv48lpgsj',
    image: 'https://static.meijer.com/Media/000/41250/0004125010210_1_A1C1_0600.png',
    price: '2.50'},
    {name: 'Tomatoes',
    id: 'c84p825ldir',
    image: 'https://cdn.shopify.com/s/files/1/2918/4630/products/Image_3_104b31f8-80a1-44f7-b624-56a429a073f9.jpg?v=1527364299',
    price: '2.70'},
    {name: 'Cheese',
    id: 'dub7jzkbss4',
    image: 'https://static1.squarespace.com/static/5a1592ff0abd04e470d48744/t/5a27bbeeec212d905273a14c/1512996237223/Kaas.jpeg?format=1500w',
    price: '4.00'},
    {name: 'Ice Cream',
    id: '8x3gx0h0tt',
    image: 'https://i5.walmartimages.com/asr/05613edd-98e9-453d-9e94-cb1ebdd5a841_1.f7e72f0841619ffcb1e30e5482a23e00.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
    price: '2.99'},
    {name: 'Chicken',
    id: '5cohj0on21l',
    image: 'http://robbieflexibles.com/getmedia/bb525202-dcf5-40ae-b369-03b36ed92dc5/rotisserie-website.aspx',
    price: '3.50'},
    {name: 'Pizza',
    id: 'jxoyf0l8qqe',
    image: 'https://www.dollargeneral.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/0/0/00071921825881_a1l1_900_900.jpg',
    price: '5.00'},
    {name: 'Lettuce',
    id: '3dt6a7oo73h',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41CGtIyWgML._SX355_.jpg',
    price: '1.29'}]

let cart = []

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.get('/items', (req, res) => {
    res.send(items)
})

app.post('/items', (req, res) => {
    console.log('/items POST end point activated')
    console.log(req.body)
    

    if(req.body.id === undefined) {
        console.log('ID undefined, add item')
        req.body.id = Math.random().toString(36).substring(2, 15);
        items.push(req.body)
    }
    else {
        console.log('identify match')
        const matchingIndex = items.findIndex(item =>
            item.id === req.body.id
        )
        console.log(matchingIndex)
        items.splice(matchingIndex, 1, req.body)
    } 
    // ()= (item) => {
//     for (i=0; i<items.length; i++) {
//     if (this.items.item.id == req.body.id) {
//         this.items.item.name = req.body.name;
//         this.items.item.price = req.body.price;
//         this.items.item.image = req.body.image;
//     }
    
//     }
    
// }
    res.send(items)
})

/////////////////////////////////////

app.get('/cart', (req, res) => {
    res.send(cart)
})



app.post('/cart', (req, res) => {
    console.log('/cart POST end point activated')
    
     inCart = (array) => {
        for (i=0; i<array.length; i++) {
            if (array[i].name == req.body.name) {
                array[i].quantity +=1
                res.send(cart)
                return true
            }
        }
        req.body.quantity =1
        cart.push(req.body)
        res.send(cart)
        return false
    };
    inCart(cart)

})

// app.patch('/items/:id', (req, res) => {
//     cart = cart.ap(item => item.id === req.params.id ? {
//     ...item,
//     ...req.body
// }) : item
//     }
// res.send(cart)
// })





app.delete('/cart/:id', (req, res) => {  
    decreaseOrDelete = (id) => {
        for (i=0; i<cart.length; i++) {
            if (cart[i].id == id && cart[i].quantity > 1) {
                cart[i].quantity -=1
                res.send(cart)
                return true
            }
        }
        cart = cart.filter((item => item.id != req.params.id
            ))
               res.send(cart)
        return false
    };
    decreaseOrDelete(req.params.id)
    
    
    
       
})

app.delete('/items/:id', (req, res) => {  
    items= items.filter((item => item.id != req.params.id
    ))
       res.send(items)
       
})

app.listen(5000, (err) => {
    if(err){ throw err}
    console.log('Server up and running on port 5000...')
})

