const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dateOfSale: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    sold: {
        type: Boolean,
        default: false
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

// const mongoose = require('mongoose');

// const transactionSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     price: Number,
//     dateOfSale: Date,
//     category: String,
//     sold: Boolean,
// });

// const Transaction = mongoose.model('Transaction', transactionSchema);

// export default Transaction;