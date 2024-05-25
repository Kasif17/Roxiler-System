import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import './components/styles.css';

const App = () => {
    const [month, setMonth] = useState('March');

    return (
        <div className="app">
            <h1>MERN Stack Coding Challenge</h1>
            <select onChange={(e) => setMonth(e.target.value)}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                {/* Add other months */}
            </select>
            <TransactionsTable month={month} />
            <Statistics month={month} />
            <BarChart month={month} />
            <PieChart month={month} />
        </div>
    );
};

export default App;
