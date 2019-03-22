const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const headers = require('./headers')

app.use(headers)
app.use(bodyParser.json())

let items = [
    {name: 'Cereal',
    image: 'https://images-na.ssl-images-amazon.com/images/G/01/aplusautomation/vendorimages/c3d80660-ba9e-4f42-b989-a423ba979fc2.jpg._CB289958391_.jpg',
    price: '4.00'},
    {name: 'Bananas',
    image: 'https://img.purch.com/rc/300x200/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA2NS8xNDkvb3JpZ2luYWwvYmFuYW5hcy5qcGc=',
    price: '2.00'},
    {name:'Steak',
    image: 'https://cdn.shopify.com/s/files/1/1579/5769/products/ribeye_prime_1_1024x1024.jpg?v=1479226988',
    price: '8.00'},
    {name:'Orange Juice',
    image: 'https://instamartkauai.com/wp-content/uploads/2018/04/large_add3b7ed-a890-485b-827a-294c0a3a740e-600x600.jpg',
    price: '3.50'},
    {name: 'Bread',
    image: 'https://e22d0640933e3c7f8c86-34aee0c49088be50e3ac6555f6c963fb.ssl.cf2.rackcdn.com/0072250037060_CL_default_default_large.jpeg',
    price: '1.00'},
    {name: 'Milk',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhAQDxAPEBIQFRAQEBAPDxAPDw8QFRIWFhUVFRUYHSghGBolHRUVITEhJikrLi8uGB8zODMtNygtLisBCgoKDg0OGhAPGCseHR0tLS0tLS0wKystLystLS0tKy0tLTctKy0tLS0rLTArLTAvKzAvKy8tLS0tKystKy0uLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAgMEBQEGB//EAEEQAAIBAgQCBwYCCAMJAAAAAAABAgMRBBIhMQVBIjJRYXGBkQYTUqGxwSPRFBVCYnKisuGC8PEHM1NjkpPCw9L/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAQIDBAUG/8QAOhEBAAECAwQHBwIEBwEAAAAAAAECEQMhMQQSQVEFYXGRobHwExQygcHR4SJSFUJi8XKCkqKys9IG/9oADAMBAAIRAxEAPwD9xAAAAAAAAAAAAAByeI+0eEoNxqVektHGEJ1Gn2PKnZ+JwxNpwsObVVZ971YWxY+LG9RTl8o82CXtxglzqvwpNfU5e/YPPwl3/he0co74eR9usFzdVeNP8mPfsHnPdJ/C9o5R3t2A9p8HWkoU6yzSaSU4Tp3b2Sckk33HTD2rCrm1NWfc44uw7RhU71VOXynydg9DyAAAAAAAAAAAAAAAAAAAAAAAAAAAAPyfFyTqVJaPNOcm973k3c/I41pxKp65837fApmMOmOqPJjxFTs+hh2pjmy1azVraGmrLcLipXi29IyjJ9yTTu/Q1TVaqJ5TDniURNMxzh+0n61+EAAAAAAAAAAAAAAAAAAAAAAAAAAAqxVRxhKUVdrb8/LcLEXmz4On7OTtmU1Jb3dkz4FXRld96Krv00dJUfDa0s+J9na0tabTXa2jnV0biz8NnWnpHCpyqYMR7PVla8oxe2/5EnYcWNbOtO3YVWmbTS9mp5X7yqrWs7O7R2jo6vjMQ41dI0X/AEw/SMDUcoRlJWbXrbS/nv5n3Y0flq4tVMQvKyAAAAAAAAAAAAAAAAAAAAAAAAHjfaBir183RV1Hm+cv7EmWohFUI9iMbsOsYtSuphIvu8G0SaW4x6mefDKb3u/FmfZRxbjaa40ShgYJaL7mooiGZx65XYSu6fRd3DlzlBfdfQ6Q89UXzdOMk0mmmns1qmVh6AAAAAAAAAAAAAAAAAAAAAAAjOSSbbsluwMM5ub5qPJdveySsJqNiKNBUWBTOZFToTuBbOhzKzdRTm6buruP7UVz70uT+oiSYu6VOopJSi7p7M0ykAAAAAAAAAAAAAAAAAAAADyckk23ZLVt8kBzas5VHe7UFtHa/Y5fl9ySsL4IirLBHjAz1pkVir1RMqhhK9nqzMSS6tLEJ6XLFSWTqRVrmkVU5KF5LqvWSX9Vu37eRYJhtTKj0AAAAAAAAAAAAAAAAAAAOfi55pZP2YWb75b/AC0833ElYWU4EFiRB6yimrMDn4isRqGCVS9/UzdVSk7nOZWybUrp3empi03aiz6DC1c0U/J+J6KZcZhBvl2aeTNLCXD6ln7tvTXL919/UqS3lQAAAAAAAAAAAAAAAAAPJSsm3y1A5+Fhpd7tuT8W7syrUoge2AjMDBiKhFhy69S5mWlKevqBKlEwt2zLoQhq4ZPrR819H9jdLNTRiN/E3KQyzb3Wj3T/AHlt9iwrsUailGMl+0k/U0wmAAAAAAAAAAAAAAAAAZ8bLo2+JpeW7EhSiZVYBKwRmxMgrlY2ZmWoc+aCvIkF8UZkaYLQgYaeWcfG3qWCdHRxK0OjEMSkIbdHhkui4/C36PX7v0NsS2BAAAAAAAAAAAAAAAABkxDvNL4V83/oSVhbAglECUmEYK8iLDmYzcS1DK0QeWILo8iSNNIyqqtowsOtN3jftSZ1hzc2+pI1abeHTtO3xL5rVfK5uEqdQrIAAAAAAAAAAAAAAAAxQ1lJ9/00+xmVaFsBKIRCtLQDBUZFc/F7iWmdgeIgtp7EnQaKJhUcSgsOhhZXpx8Lemh0pYnVz6jtIcWl9GdpRl2Nej0fybNwk6O4VgAAAAAAAAAAAAAAAjVlZN9ib+QGTDqyRlWh8gJIIz4iQVhmyKyYrcqwysg8RBZSZBppGFTrx0A1cP6ng2bpZq1c/FdZiWoWvVG0d2lO8YvtSfqjTCYAAAAAAAAAAAAAAFGNfQfe0vmBCmtjKrHuBJsIx4hhYZJhWfEoLDJIgiBZTZkaaRhWqVNtAXYGLUWn2v6I1SzU52N6zNSsLY7I0rrcPlenHuuvRtGnOWkAAAAAAAAAAAAAADNjX1V339F/ckhAipJgJMIx1mRVEkVVVWN0BkcSKrcSCUImRvoUxYbYdhEXRjZGohJcjHR6RZahZS6qKN/CZdGS7JP0aX9zbMtwQAAAAAAAAAAAAABkxfWgu5/YkqlEyCKPZAZKhFhU0UFECqpQAr/RrkVdSwpBojCxEe+AsixVSwOdi9WGoQhtYsK3cGlrUX8L+ptiXUCAAAAAAAAAAAAAAMeJ66/hX1ZJVIyJIDyRRw/aDjtDCRTrSs5XyQis0523suzvemqOOLjU4cXl7dj2HF2mq2HGms8IfOQ/2hYduzo10u21N/8AkeaNvo4xL6s//O43Cunx+zr4H2swVXRV4xfw1L03f/FZPyPRRtWFVxeDG6J2rD1omezPydylVjJXTTT2ad0zvExL59VE0zaYWqKDKQRFsgi5ARlMoxV6qI1CmNUK38Jl+I++L+TX5moZqdgrIAAAAAAAAAAAAADFX6/kiSqaMiSATKPw3/aHipyx2Ivd+693ThHSygoRb+cpPfmfJ2nPFm79t0XTFGyUTTxvM9/2fPU8S72VnonlVtPPtPPND6dOLN0I1Xu83NvRrnpr4FmmGYqnWbvpfZfhnEK8ZVcFeKhLJKSr+5Up2T2T10a37Ttg7Pi1RM0TZ4tt23ZcOYpx6YmZjlfLm+uwk+PUnGMo4aq3tGpVpKcla9lZpvZ667Hrpp2mnKbT22/D5GLHRmLE1U3p64ibeUuhi/a2rhnBY/Bzo+8vknSq0q8JWtfRNNbr1NVbRVh29pTa/wA3mo6Lox7zs2JFVucTGrbgvarB1upXgm9LVL0nfstK1/I3TtOFVlvPNi9F7Vh5zRMx1Z+TqKqnqmmnzO17vDNMxqprVNCssE5EaIso6fC5fiR71JfK/wBiwzU7hWQAAAAAAAAAAAAAGGt135fQkqnEyLEBGRR+Ye1PsfVqYitiZ1adKlUnG0stSpNdGMVeKWmqtvzR4MXZqpqmuqbRL9VsPSOHGDRhURNVURplEd8/ZmXsJhIKE8RjqrUlOalTw2VZYJZ23aVt0td3ZLUvu2FTF6qsp6uTUdI7TiVzGFhReJiM6ovedOX9s3RwvsXwu7viMW2nBONT8JpyaUbxdJNau3imt07bjZtnnjPr5OdXSO36xRTx0z01z3p7ey08YdbA8MwMIfo9KpVySrQqJveVWUIWi3NJaxUNP312q+4owYp3KZyv4+vNwrx9rmr2tdMXimY+UTOeXKb93VK2phKCsv0isk5yc80k3KTl7vL1tnNqL7dt2Waaf3Tr+PNKcXGnP2caRa0dV76cs+rVn4xwLC4r3dGpiZxdGdVrp05VHOrVy5ZXvtKnKK22tyJXg4eJaJq0v4z+LLg7XtGBfEpwomKojhNrUxe8acJifFwsR7AU5J+5x0Gk7WlS5tJpZlLvXI8/uFM501vbHTdcZYmDMdk/j6ufT9n8fhW5YarSkk9qOIir37YTSi36mPdsajOmqPlLde27Hjxu4tExf91P1i8vquB8VrVYuOIozo1YWveLUKie0oPZ99m7Htwa66otXFpfn9u2bDwqr4VUVUz3x1S3HZ4UkB0eGv8AEh4v+llhmXfKyAAAAAAAAAAAAAAwVuvLy+hJVOJBYgPGBzOKUczo2lJOE86SUXGXQlG0k07rpctefIVReKep7Nmr3d+8axbxictM8nIxXBoTjGL97HSurNp5ffQpxlys7Wlb13sca8CKotN+PjZ9HC22qiqZi0/D892ZmOPf3c05cFi3duWuV6OnGOSEpTUEkujeVtex2WwnBiSNtqiLRHPnOc2i/XaPF7DhrVTNKUn0qNWVoxWd0oU0o3vZJ+6g9r9KX+F7LPXlPdb7euCdpiaLRERlMazlvTOf+6ePCPnFcNj7yNVznHpQbjlUo2WNjiH3rVdtrLYz7KL3v63rr71V7OaLROv/AF7nrr4qanCYqdStTlacqqru9O+aUa06sbrOnZJqOnZfnpPYxEzVE53v435/J0p2uZppw64yind1/pimeE9vhwb+G8LyU3CNTNFTbTs1e7cntLZylJp9jSO+FhWptEvFtW1b9e9NNpt+OXKM+vNJ4WS3kn29F6rze+i+Z1iiY4vJXi01cPXcqrrb/PIV6OCmxgEB0eHf7yHj9mWEl9AVgAAAAAAAAAAAAABgr9eXl9CSqUTIsuUeNgcT2iwzqKllhncZSlZTdOV8jSyy5O7W9+ZjFpmqmLRd9Lo/FjDmq82vERpeNeMcmLAcHUpS94q2GyKOScMTC8k224vS6t9+65zpwbznen5vXjbZNNMbk0131iaZy69eJjeHyVVr3js4wcW61NTkllgpO9NtvTfM9bbX0VUTva+X2+q4W0Uzh33c7zfKbcZt8XhbTsW1cLkpRl72Vqk4tRnOGRt/DKK5pXtsWabU66sU4u/izG5GUcIm/dfnxUSw1TO1nnfPayxVZNXd9I3VuenkSaZvr4y6Ri4e5E2i1v20+dvF18Fh68IZPeySi5W95SqVpNN3vmcr21tZ7WOtNNURa/1eHGxMKure3NeUxT4Ws5FSKySUpKdqjV1mq5lGLjzk8rsnddt9+fP+XPPPteyJnfiaYtl2azfln6+WW1O7c4uSf/LcXdu2r1vzJG7xhavaWtTNvnf7OhB3jDSS30kmpK11zPR/LD5GNFq5ziex40Ryh5bUK38P/wB5T8fsywzL6ErIAAAAAAAAAAAAADBiOu/BElUokErgeNgczis7e76Lkm5KUVGnJtW7JtL53JXOUPbssX3s7d/0iWfhFVKorRlHMrSXuFBQsk1mlGbS5a210M4c/q08Py9G00zOHnMTb+q9+yLRKWLxl6zp9FWeXoVqak12uDV76vbuFVX6rfUw8G2Fv5/OJ812HrWhdxjJ51FKWTmlopKybvey0dyxNoYro3q8pmMuF/LVXi3eTdKc3dwcXCNKavfdXd+aevdYk5zl9GsOLUxFcRx1vHr1dZRxNVazp4mV8qSaScWlrJ5ZWs/sWJq4xLNeHhz8NVMW9W04MvEHHK51E6EISWbNK107xUu+7to7G93e1yYnFnCtaYqv4aZOTLHYO7/Hum9U6kNVrp1tNx7KOaTtlVtIbKPEaVV5ack7K+ji7LbkzVbx3WswPFuFb+Gr8Sn4v+llhmX0BWQAAAAAAAAAAAAAGHE9fyRJWBEV6ERbA5HG5O0ElGWbOmpxUoWtzTkv8+ZnEvuxZ79iteZmZi1tMp8pc2NNKGaeGpzlCUIwUIOnKMbbxdpOy5WZz3crzTE29db378zXanFmImJveb9/w69jVXV26nSU5PNZvE2XRXR6Oid+asu41MXz4/NzoqtG5laP8PPXmsdO10pTu3ntKFRxlFdt95b+I3fWbMV34Ry1j1ZR+jdJzjo7ZnJUVnjZ33yXesYu2+3cZ3c7/T8Ovtf07s6duX/LlLd71rSeJxCkt8saOXbWzdPXW5001qnw+zzTTE504dNv83/ph4zJ+6upznezjOqoRktJq2aMOhu9ct9WdqO27yY/K0R2Xtw5zL5WpVnzlHzxlZ/+lGnnb+AVLzlrF9H9mpVqc/3kkYqHeMLCK3CujwtfiQ7s39LLDMu+VkAAAAAAAAAAAAABixXX/wAK+rJKwiiKkwISCOVxjCKpFdGMnFtpSipJ3TXNrt+Rmujfpta9ns2TH9lXraJfPRpro2kk7cpUo2autei/3fl5+eIjn5PszXOd48/vDpRo05SilWrQ3t0Uopu7u3ttp5Lnqdt2mZ+KYeScTEppmZoifX3z/DauEJdL3r0bkm/eNLR9k1dbb32N+x439d7h77Mzbc6uH2yV4LAQnScoVaknJOKlTq1U4xkoqTSlOSzWV0+TfjfNGHE05TPfP3bxdproxIiqmItnnEcL20iJtwnn3Wxy4HP/AI3EvLExOfu886u96Pf6f2Yf+mWfi2GlSw8o56887barSVSfVSyqy1Wm2urZ6MKjcjWZ7XztsxoxaomIpi37YtH93x04P4Jrwpzj9jq8bu+yOHknVm3K1oxV3U33fW07NjnUPpWZaRSA6nBl+J4Rb+aX3LDMu4VkAAAAAAAAAAAAABjxS6S8PuySsIEVJgVzIKJIsSM1fDxl1k3vtJx38PAs2nWHXDxaqPhlX+gU+yp/1yf1Zndo63WNqxOruhbDCx0TdVq1srm3G3qatT1pOPVraL87PaWChGEqac+le8m7y5+XPsERTEWKtoqqriubZdytcNinf3lZ6JauLVk09rd31M7tN73ludrqmLbsevmSwUciptzlFO7u5Kb006UWrWOlMxTFnDFxJxKt6YszT4bT5Rn/AN6t/wDRd+HNKFBQVlfzbk/V6nNFUg0IDr8Ej0pPsjb1f9iwzU7BWQAAAAAAAAAAAAAGXHLqy7NH5/6ElYZ1MipqQFc2QUNgRbKPVICyMiCaYHtwISKKZoKoqhGSQaeRA7fBI9d/wr6lhmp1CsgAAAAAAAAAAAAAI1IJpp7MDkYhSg7PyfJozLUIUsSnpzItlrkEVTYEGwomBOMgJqQErgeNgQkwKKpRkmiKRRR9Fwujlpq+8ul67fI0xLWEAAAAAAAAAAAAAAAIVKakrSSa7wMFTg8HtKS9GZmmGt4nw+SXRk5NcnZN+AsXYZN7PRrdPQioXA9TAnFgSUgr24HlwgBXUAzyiBs4bgXJqUl0F/M/yLEJMu6aZAAAAAAAAAAAAAAAAAAAAqr4eE+sk+/ZrzBdlfCofFNea/Im61vPP1VH4p/y/kN03nv6rj8U/wCX8ibpvH6sj8UvkN03j9Wr436IbpvH6tXxv0Q3Tee/q2PxS+Q3TeP1ZH4p/wAv5FsbyVLh1NO9nL+J3XoLJdsKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=',
    price: '2.50'},
    {name: 'Tomatoes',
    image: 'https://cdn.shopify.com/s/files/1/2918/4630/products/Image_3_104b31f8-80a1-44f7-b624-56a429a073f9.jpg?v=1527364299',
    price: '2.70'},
    {name: 'Cheese',
    image: 'https://static1.squarespace.com/static/5a1592ff0abd04e470d48744/t/5a27bbeeec212d905273a14c/1512996237223/Kaas.jpeg?format=1500w',
    price: '4.00'},
    {name: 'Ice Cream',
    image: 'https://i5.walmartimages.com/asr/05613edd-98e9-453d-9e94-cb1ebdd5a841_1.f7e72f0841619ffcb1e30e5482a23e00.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
    price: '2.99'},
    {name: 'Chicken',
    image: 'http://robbieflexibles.com/getmedia/bb525202-dcf5-40ae-b369-03b36ed92dc5/rotisserie-website.aspx',
    price: '3.50'},
    {name: 'Pizza',
    image: 'https://www.dollargeneral.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/0/0/00071921825881_a1l1_900_900.jpg',
    price: '5.00'},
    {name: 'Lettuce',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41CGtIyWgML._SX355_.jpg',
    price: '1.29'}]

let cart = []

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.get('/items', (req, res) => {
    res.send(items)
})

app.get('/cart', (req, res) => {
    res.send(cart)
})

app.post('/cart', (req, res) => {
    console.log('/cart POST end point activated')
    console.log(req.body)
    req.body.quantity =1
    req.body.id = Math.random().toString(36).substring(2, 15)
    
    cart.push(req.body)
    res.send(cart)
})

app.delete('/cart/:id', (req, res) => {  
    cart = cart.filter((item => item.id != req.params.id
    ))
       res.send(cart)
       
})

app.listen(5000, (err) => {
    if(err){ throw err}
    console.log('Server up and running on port 5000...')
})

