const Transaction = require('../Model/transaction')

app.get('/barchart', async (req, res) => {
    const { month } = req.query;
    const query = { dateOfSale: { $regex: `${month}`, $options: 'i' } };

    try {
        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            // Add other ranges...
        ];

        const barChartData = await Promise.all(priceRanges.map(async (range) => {
            const count = await Transaction.countDocuments({
                ...query,
                price: { $gte: range.min, $lte: range.max }
            });
            return { range: range.range, count };
        }));

        res.status(200).json(barChartData);
    } catch (error) {
        res.status(500).send('Error fetching bar chart data');
    }
});
