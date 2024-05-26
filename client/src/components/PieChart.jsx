import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import './styles.css';

const PieChart = ({ month }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();

        return () => {
            // Clean up the chart instance
            if (window.chartInstance) {
                window.chartInstance.destroy();
            }
        };
    }, [month]);

    const fetchData = async () => {
        const response = await axios.get('/api/piechart', { params: { month } });
        setData(response.data);
    };

    const chartData = {
        labels: data.map((item) => item._id),
        datasets: [
            {
                label: 'Number of Items',
                data: data.map((item) => item.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
            },
        ],
    };

    return <Pie data={chartData} ref={(chart) => { window.chartInstance = chart && chart.chartInstance; }} />;
};

export default PieChart;

