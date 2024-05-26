import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import './components/styles.css';

const App = () => {
    const [month, setMonth] = useState('March');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/initialize');
                setMessage(response.data);
            } catch (error) {
                console.error('Error initializing database:', error);
                setMessage('Error initializing database');
            }
        };

        initializeDatabase();
    }, []);

    return (
        <div className="app">
            <h1>Roxiler System Coding Ass. Challenge</h1>
            {message && <p className="message">{message}</p>}
            <select onChange={(e) => setMonth(e.target.value)} value={month}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="Noverber">November</option>
                <option value="December">December</option>
            </select>
            <TransactionsTable month={month} />
            <Statistics month={month} />
            <BarChart month={month} />
            <PieChart month={month} />
        </div>
    );
};

export default App;
