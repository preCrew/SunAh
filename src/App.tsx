import React from 'react';
import './App.css';
import Home from './components/ToDate/Date'

function App() {
  return (
    <div className="App">
      <Home month={0} day={0} date={0}></Home>
    </div>
  );
}

export default App;
