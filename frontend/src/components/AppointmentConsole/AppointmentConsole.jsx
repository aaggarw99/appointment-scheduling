import React, { useState } from 'react';
import Search from './Search/Search';
import './AppointmentConsole.css';

const AppointmentConsole = () => {
  const [selectedTab, setSelectedTab] = useState('search');

  return (
    <div className="appointment-console">
      <div className="appointment-console__header">
        <h1>Appointment Scheduling</h1>
        <div className="appointment-console__tabs">
          <button
            className={`tab ${selectedTab === 'search' ? 'active' : ''}`}
            onClick={() => setSelectedTab('search')}
          >
            Search
          </button>
          <button
            className={`tab ${selectedTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setSelectedTab('schedule')}
          >
            Schedule
          </button>
          <button
            className={`tab ${selectedTab === 'my-appointments' ? 'active' : ''}`}
            onClick={() => setSelectedTab('my-appointments')}
          >
            My Appointments
          </button>
        </div>
      </div>

      <div className="appointment-console__content">
        {selectedTab === 'search' && <Search />}
        
        {selectedTab === 'schedule' && (
          <div className="schedule-section">
            {/* Schedule component will go here */}
            <p>Schedule an appointment</p>
          </div>
        )}
        
        {selectedTab === 'my-appointments' && (
          <div className="my-appointments-section">
            {/* My Appointments component will go here */}
            <p>View your appointments</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentConsole; 