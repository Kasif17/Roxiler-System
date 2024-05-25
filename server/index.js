// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');


const app = express();

// MongoDB Connection
mongoose.connect('mongodb+srv://developer786kasif:7860323258@cluster0.gp5zanz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Mongoose Schema and Model
const transactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    category: String,
    sold: Boolean,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// API to Initialize Database
app.get('/initialize', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;
        await Transaction.deleteMany({});
        await Transaction.insertMany(transactions);
        res.status(200).send('Database initialized successfully');
    } catch (error) {
        res.status(500).send('Error initializing database');
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
