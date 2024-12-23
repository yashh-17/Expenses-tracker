const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/expenseTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
