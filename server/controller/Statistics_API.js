const Transaction = require('../Model/transaction')
app.get('/statistics', async (req, res) => {
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
            totalSaleAmount: totalSaleAmount[0].totalAmount,
            soldItems: soldItemsCount,
            notSoldItems: notSoldItemsCount
        });
    } catch (error) {
        res.status(500).send('Error fetching statistics');
    }
});
