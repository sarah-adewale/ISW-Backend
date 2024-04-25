import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    description: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Create an index on the name field
categorySchema.index({ name: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category;