import React from 'react';
import Calendar from './Calendar';
import dayjs from 'dayjs';

function App() {
  function getListData(value: any) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  function dateCellRender(value: any) {
    const listData = getListData(value);
    
    return (
      <ul className="events">
        {listData.length ? listData.map(item => (
          <li key={item.content}>
             · {item.content}
          </li>
        )) : value.date()}
      </ul>
    );
  }
  return (
    <div className="App" style={{display: 'flex', margin: '50px auto'}}>
      {/* <div className="left" style={{ width: 400}}>啊哈哈</div>
      <div className="right" style={{ width: 800, height: 450}}>
        <Calendar value={dayjs('2024-02-29')} style={{height: '40px'}} dateRender={dateCellRender}></Calendar>
      </div> */}
      <Calendar value={dayjs('2024-02-29')}></Calendar>
    </div>
  );
}

export default App;
