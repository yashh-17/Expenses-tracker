import React from 'react';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <h1>Expense Tracker</h1>
      </header>
      
      <main>
        <ExpenseTracker />
      </main>
    </div>
  );
}

export default App;
