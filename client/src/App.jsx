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
            <h1>MERN Stack Coding Challenge</h1>
            {message && <p className="message">{message}</p>}
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



// import React, { useState } from 'react';
// import TransactionsTable from './components/TransactionsTable';
// import Statistics from './components/Statistics';
// import BarChart from './components/BarChart';
// import PieChart from './components/PieChart';
// import './components/styles.css';

// const App = () => {
//     const [month, setMonth] = useState('March');

//     return (
//         <div className="app">
//             <h1>MERN Stack Coding Challenge</h1>
//             <select onChange={(e) => setMonth(e.target.value)}>
//                 <option value="January">January</option>
//                 <option value="February">February</option>
//                 <option value="March">March</option>
//                 {/* Add other months */}
//             </select>
//             <TransactionsTable month={month} />
//             <Statistics month={month} />
//             <BarChart month={month} />
//             <PieChart month={month} />
//         </div>
//     );
// };

// export default App;
