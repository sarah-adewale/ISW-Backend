
// models/Category.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1, // Minimum length of 1 character
        unique: true // Enforce uniqueness
    },
    description: String
});

// Create an index on the name field
categorySchema.index({ name: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category;
