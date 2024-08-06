const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    bio: { type: String }
});

module.exports = mongoose.model('Author', authorSchema);
