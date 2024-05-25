// controllers/transactionController.js
const axios = require('axios');
const Transaction = require('../models/transaction');

const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;
        await Transaction.deleteMany({});
        await Transaction.insertMany(transactions);
        res.status(200).send('Database initialized successfully');
    } catch (error) {
        res.status(500).send('Error initializing database');
    }
};

const listTransactions = async (req, res) => {
    const { month, page = 1, perPage = 10, search = '' } = req.query;
    const regex = new RegExp(search, 'i');
    const query = {
        dateOfSale: { $regex: `${month}`, $options: 'i' },
        $or: [
            { title: regex },
            { description: regex },
            { price: regex }
        ]
    };

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).send('Error fetching transactions');
    }
};

const getStatistics = async (req, res) => {
    const { month } = req.query;
    const query = { dateOfSale: { $regex: `${month}`, $options: 'i' } };

    try {
        const totalSaleAmount = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: null, totalAmount: { $sum: '$price' } } }
        ]);

        const soldItemsCount = await Transaction.countDocuments({ ...query, sold: true });
        const notSoldItemsCount = await Transaction.countDocuments({ ...query, sold: false });

        res.status(200).json({
            totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0,
            soldItems: soldItemsCount,
            notSoldItems: notSoldItemsCount
        });
    } catch (error) {
        res.status(500).send('Error fetching statistics');
    }
};

const getBarChart = async (req, res) => {
    const { month } = req.query;
    const query = { dateOfSale: { $regex: `${month}`, $options: 'i' } };

    try {
        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity },
        ];

        const barChartData = await Promise.all(priceRanges.map(async (range) => {
            const count = await Transaction.countDocuments({
                ...query,
                price: { $gte: range.min, $lte: range.max === Infinity ? undefined : range.max }
            });
            return { range: range.range, count };
        }));

        res.status(200).json(barChartData);
    } catch (error) {
        res.status(500).send('Error fetching bar chart data');
    }
};

const getPieChart = async (req, res) => {
    const { month } = req.query;
    const query = { dateOfSale: { $regex: `${month}`, $options: 'i' } };

    try {
        const pieChartData = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.status(200).json(pieChartData);
    } catch (error) {
        res.status(500).send('Error fetching pie chart data');
    }
};

const getCombinedData = async (req, res) => {
    const { month } = req.query;

    try {
        const [statistics, barChart, pieChart] = await Promise.all([
            axios.get(`http://localhost:5000/statistics?month=${month}`),
            axios.get(`http://localhost:5000/barchart?month=${month}`),
            axios.get(`http://localhost:5000/piechart?month=${month}`)
        ]);

        res.status(200).json({
            statistics: statistics.data,
            barChart: barChart.data,
            pieChart: pieChart.data
        });
    } catch (error) {
        res.status(500).send('Error fetching combined data');
    }
};

module.exports = {
    initializeDatabase,
    listTransactions,
    getStatistics,
    getBarChart,
    getPieChart,
    getCombinedData
};
