const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('Buyer', BuyerSchema);