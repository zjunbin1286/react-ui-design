import React from 'react';
import Calendar from './Calendar';
import dayjs from 'dayjs';
import { PlusOutlined, MailOutlined, UserOutlined } from './Icon/icons';
import { createFromIconfont } from './Icon/createFrontIconfont';

const IconFont = createFromIconfont(
  '//at.alicdn.com/t/c/font_3836578_jrc58m0r5v.js'
);

function App() {
  return (
    <div className="App" style={{ padding: '50px' }}>
      <div>
        {/* 日历组件 */}
        {/* <Calendar value={dayjs(new Date())}></Calendar> */}
      </div>
      <div>
        {/* 图标组件 */}
        <PlusOutlined size="40px" spin />
        <MailOutlined style={{ color: 'blue', fontSize: '50px' }} />
        <IconFont type="icon-xihuan" size="40px" fill="blue" />
        <IconFont type="icon-wangyiyunyinle" size="40px" />
      </div>
    </div>
  );
}

export default App;
