import React from 'react';
import Calendar from './Calendar';
import dayjs from 'dayjs';

function App() {
  return (
    <div className="App" style={{display: 'flex', margin: '50px auto'}}>
      <div className="left" style={{ width: 400}}>啊哈哈</div>
      <div className="right" style={{ width: 600, height: 150}}>
        <Calendar value={dayjs('2024-02-29')}></Calendar>
      </div>
    </div>
  );
}

export default App;
