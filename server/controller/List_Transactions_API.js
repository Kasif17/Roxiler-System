const Transaction = require('../Model/transaction')

app.get('/transactions', async (req, res) => {
    const { month, page = 1, perPage = 10, search } = req.query;
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
});
