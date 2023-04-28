import express from 'express';
import mongoose from 'mongoose';
import {  productSchema, customerSchema } from './model/product.js';

// const url = 'mongodb://localhost:27017/shop';
const url = 'mongodb://127.0.0.1:27017/shop';
const port = 8000;

const app = express();
mongoose.connect(url)
        .then(()=> {
            console.log(`Connected to DB`);
            app.listen(port, ()=> {
                console.log(`Server started on http://localhost:${port}`);
            })
        })
  .catch((err) => { console.log(`DB connection error: ${err}`) });
        

const connection = mongoose.createConnection(url, { maxPoolSize: 10 });
const Product = connection.model('product', productSchema);
const Customer = connection.model('customer', customerSchema);
connection.on('open', () => {
  console.log("Conected");
});
connection.on('error', (err) => {
  console.log(err);
});

const getPurchases = async () => {
  const customers = await Customer.find();
  const purchases = [];

  for (const customer of customers) {
    const product = await Product.findOne({ _id: customer.product_id });

    purchases.push({
      name: customer.name,
      title: product.title,
      price: product.price
    });
  }

  return purchases;
};

app.get('/', async (req, res) => {
  const purchases = await getPurchases();

  let html = '<h1>Users purchases:</h1>';

  for (const purchase of purchases) {
    html += `<div style="display: flex; justify-content: space-between; width: 200px; border: 1px solid black; margin-bottom"><span>${purchase.name}</span> <span>${purchase.title}</span> <span>Price: ${purchase.price}</span></div><br>`;
  }

  res.send(html);
});