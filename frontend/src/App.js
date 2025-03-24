import React from 'react';
import './App.css';
import AppointmentConsole from './components/AppointmentConsole/AppointmentConsole';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{process.env.REACT_APP_TITLE || 'Healthcare Appointment Scheduler'}</h1>
      </header>
      <main>
        <AppointmentConsole />
      </main>
    </div>
  );
}

export default App;
