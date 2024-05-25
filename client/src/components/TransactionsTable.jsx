import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const TransactionsTable = ({ month }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);

    useEffect(() => {
        fetchData();
    }, [month, search, page]);

    const fetchData = async () => {
        const response = await axios.get('/api/transactions', {
            params: { month, search, page, perPage }
        });
        setTransactions(response.data);
    };

    return (
        <div className="transactions-table">
            <select onChange={(e) => setMonth(e.target.value)}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                {/* Add other months */}
            </select>
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
            <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
    );
};

export default TransactionsTable;
