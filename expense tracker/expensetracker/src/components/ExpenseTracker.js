import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseTracker = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const addExpense = async () => {
    try {
      await axios.post('http://localhost:5000/api/expenses/add', {
        description,
        amount,
        date,
      });
      setDescription('');
      setAmount('');
      setDate('');
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses/current-month');
      setExpenses(response.data.groupedExpenses);
      setTotal(response.data.totalExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="button" onClick={addExpense}>
          Add Expense
        </button>
      </form>

      <h2>Total Expenses: ${total}</h2>

      <div>
        <h3>Expenses for the Current Month</h3>
        {Object.keys(expenses).map((day) => (
          <div key={day}>
            <h4>{day}</h4>
            <ul>
              {expenses[day].map((expense, index) => (
                <li key={index}>
                  {expense.description}: ${expense.amount}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTracker;
