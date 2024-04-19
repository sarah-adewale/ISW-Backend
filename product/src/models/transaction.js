import mongoose from 'mongoose';
// import Category from './category.js';
// import Product from './product.js';

const { Schema } = mongoose;

const transactionSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    batchNumber: String,
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be a positive number'] // Minimum value of 0 with custom error message
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
