app.get('/combined', async (req, res) => {
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
});
