const mongoose = require('mongoose');
const BrandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Brand', BrandSchema);


        // id: String(global.brands.length + 1),
        // brandName: brandData.brandName,
        // description: brandData.description || '',
        // active: brandData.active !== undefined ? brandData.active : true
