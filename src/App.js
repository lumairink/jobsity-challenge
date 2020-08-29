import React, { useState } from 'react';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const handleDayClick = (date) => {};

  return (
    <div className="App">
      <Calendar onAddClick={console.log} onDayClick={handleDayClick} />
    </div>
  );
}

export default App;
