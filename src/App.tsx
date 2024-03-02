import React from 'react';
import Calendar from './Calendar';
import dayjs from 'dayjs';

function App() {
  return (
    <div className="App">
      <Calendar value={dayjs(new Date())}></Calendar>
    </div>
  );
}

export default App;
