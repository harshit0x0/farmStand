const mongoose = require("mongoose");
const Product = require('./models/product');

main().catch(err => console.log("MONGO CONNECTION ERROR!" + err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log("mongoose connection open")
}

// const p = new Product({
//     name: "grape fruit",
//     price: 1.99,
//     category: 'fruits'
// })

// p.save().then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })

// const seedProducts = [
//     {
//         name: 'Fairy Eggplant',
//         price: 1.00,
//         category: 'vegetable'
//     },
//     {
//         name: 'Organic Goddess Melon',
//         price: 4.99,
//         category: 'fruits'
//     },
//     {
//         name: 'Organic Mini Seedless Watermelon',
//         price: 3.99,
//         category: 'fruits'
//     },
//     {
//         name: 'Organic Celery',
//         price: 1.50,
//         category: 'vegetable'
//     },
//     {
//         name: 'Chocolate Whole Milk',
//         price: 2.69,
//         category: 'dairy'
//     },
// ]

// Product.insertMany(seedProducts)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })