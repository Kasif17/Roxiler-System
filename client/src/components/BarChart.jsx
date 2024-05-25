import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import './styles.css';

const BarChart = ({ month }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [month]);

    const fetchData = async () => {
        const response = await axios.get('/api/barchart', { params: { month } });
        setData(response.data);
    };

    const chartData = {
        labels: data.map((item) => item.range),
        datasets: [
            {
                label: 'Number of Items',
                data: data.map((item) => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default BarChart;
