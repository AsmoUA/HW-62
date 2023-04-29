import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: String,
    product_id: String
});
const url = 'mongodb://127.0.0.1:27017/shop';

const connection = mongoose.createConnection(url, { maxPoolSize: 10 });
const Customer = connection.model('customer', customerSchema);

export { Customer};