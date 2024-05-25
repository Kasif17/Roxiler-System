import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        fetchData();
    }, [month]);

    const fetchData = async () => {
        const response = await axios.get('/api/statistics', { params: { month } });
        setStatistics(response.data);
    };

    return (
        <div className="statistics">
            <h3>Statistics for {month}</h3>
            <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
            <p>Sold Items: {statistics.soldItems}</p>
            <p>Not Sold Items: {statistics.notSoldItems}</p>
        </div>
    );
};

export default Statistics;
