import mongoose from 'mongoose';

const sellerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    required: true,
  },
  colorPreference: {
    type: String,
    default: '#000000', // Default color
  },
  fontPreference: {
    type: String,
    default: 'Arial', // Default font
  },
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
