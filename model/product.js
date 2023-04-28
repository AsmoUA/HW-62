import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: String,
    price: Number,
    rating: Number,
    category: String,
    brand: String
});
const customerSchema = new Schema({
    name: String,
    product_id: String
});

const Product = mongoose.model('product', productSchema);
const Customer = mongoose.model('customer', customerSchema);

export {Product, productSchema, Customer, customerSchema};