const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { description, amount, date } = req.body;

    const newExpense = new Expense({
      description,
      amount,
      date,
    });

    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding expense', error: err });
  }
});

router.get('/current-month', async (req, res) => {
  try {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const expenses = await Expense.find({
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      }
    });

    const groupedExpenses = expenses.reduce((acc, expense) => {
      const day = expense.date.toISOString().split('T')[0]; 
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(expense);
      return acc;
    }, {});

    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    res.status(200).json({
      groupedExpenses,
      totalExpenses
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving expenses', error: err });
  }
});

module.exports = router;
