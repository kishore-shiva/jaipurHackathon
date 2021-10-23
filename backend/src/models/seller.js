const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    companyName: {
        type: String
    },
    companyID: {
        type: Number
    },
    ownerName: {
        type: String
    },
    associationID: {
        type: String
    },
    officeAddress: {
        type: String
    },
    typeOfGoods: {
        type: String
    },
    productClass: {
        type: String
    },
    mfdLocation: {
        type: String,
    },
    companyEmail: {
        type: String
    },
    goodReviews: {
        type: Number
    },
    badReviews: {
        type: Number
    },
    trustablity: {
        type: Number
    }
})

const Seller = mongoose.model('Seller', SellerSchema);

module.exports = Seller;