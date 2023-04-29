import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: String,
    price: Number,
    rating: Number,
    category: String,
    brand: String
});
const url = 'mongodb://127.0.0.1:27017/shop';

const connection = mongoose.createConnection(url, { maxPoolSize: 10 });
const Product = connection.model('product', productSchema);

export {Product};