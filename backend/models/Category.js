const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true }
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
