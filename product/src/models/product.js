import mongoose from 'mongoose';
import Category from './category.js'; // Import Category model

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1, // Minimum length of 1 character
        unique: true // Enforce uniqueness
    },
    description: String,
    price: {
        type: Number,
        required: true,
        min: 0 // Minimum value of 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId type to reference Category
        ref: 'Category' // Reference the Category model
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be a positive number'] // Minimum value of 0 with custom error message
    },
    batchNumber: String,
    dateSold: Date
});
// Create an index on the name field
productSchema.index({ name: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
