// models/product.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    description: String,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be a positive number']
    },
    batchNumber: String,
    dateSold: Date,
    imageUrl: {
        type: String,
        match: /^https?:\/\/.+/
    }
});

// Create an index on the name field
productSchema.index({ name: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
