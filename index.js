const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const Farm = require('./models/farm')
const Product = require('./models/product');
const mongoose = require("mongoose");
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log("mongoose connection open")
}

app.set('views', path.join(__dirname, '/views'));
app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.listen(3000, () => {
    console.log("listening on port 3000");
})


//FARM ROUTES

app.get('/', (req, res) => {
    res.redirect('/farms');
})

app.get('/farms/new', (req, res) => {
    res.render("farms/new.ejs");
})


app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/farms.ejs', { farms })
})

app.get('/farms/:id', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id).populate("products");
    res.render('farms/details.ejs', { farm });
})

app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { id, farm })
})

app.post('/farms/:id/products', async (req, res) => {
    const newProduct = new Product(req.body);
    const farm = await Farm.findById(req.params.id);
    farm.products.push(newProduct);
    newProduct.farm = farm;
    await newProduct.save();
    await farm.save();
    res.redirect(`/farms/${req.params.id}`);
})

app.post('/farms', async (req, res) => {
    const newFarm = new Farm(req.body);
    await newFarm.save();
    res.redirect("/farms");
})

//PRODUCT ROUTES

app.get('/products/new', (req, res) => {
    res.render("products/new.ejs");
})

app.get('/products/category', async (req, res) => {
    const { category } = req.query;
    if (!category) {
        const products = await Product.find({});
        res.render('products/index.ejs', { products })
    }
    const products = await Product.find({ category: category });
    res.render("products/productsByCategory.ejs", { products });
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm');
    res.render('products/details.ejs', { product });
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const selectedProduct = await Product.findById(id);
    res.render("products/edit.ejs", { selectedProduct });
})


app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index.ejs', { products })
})



app.post('/products', (req, res) => {

    const newProduct = new Product(req.body);
    newProduct.save()
        .then(data => {
            console.log(data + " Inserted into database");
        })
        .catch(err => {
            console.log("error inserting into database " + err);
        });
    res.redirect('/products');
})

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    await Product.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
    res.redirect(`/products/${id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log("deleted" + await Product.findOneAndDelete({ _id: id }));
    res.redirect('/products');
})