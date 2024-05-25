const Transaction = require('../Model/transaction')
app.get('/piechart', async (req, res) => {
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
});
