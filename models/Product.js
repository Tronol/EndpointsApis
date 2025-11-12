const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: false
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    }
});
module.exports = mongoose.model('Product', ProductSchema);
