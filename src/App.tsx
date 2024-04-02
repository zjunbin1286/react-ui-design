import React from 'react';

import Calendar from './Calendar';
import dayjs from 'dayjs';

import { PlusOutlined, MailOutlined, UserOutlined } from './Icon/icons';
import { createFromIconfont } from './Icon/createFrontIconfont';
const IconFont = createFromIconfont(
  '//at.alicdn.com/t/c/font_3836578_jrc58m0r5v.js'
);

import Space from './Space';
import { ConfigProvider } from './Space/ConfigProvider';
import './App.css';

import Toggle from './Toggle';
import useCounter from './useCounter';

function App() {
  const [count, increment, decrement] = useCounter();
  return (
    <div className="App" style={{ padding: '50px' }}>
      <div>
        {/* 日历组件 */}
        {/* <Calendar value={dayjs(new Date())}></Calendar> */}
      </div>
      <div>
        {/* 图标组件 */}
        {/* <PlusOutlined size="40px" spin />
        <MailOutlined style={{ color: 'blue', fontSize: '50px' }} />
        <IconFont type="icon-xihuan" size="40px" fill="blue" />
        <IconFont type="icon-wangyiyunyinle" size="40px" /> */}
      </div>
      <div>
        {/* 间距组件 */}
        {/* <ConfigProvider space={{ size: 20 }}>
          <Space direction="horizontal">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
          </Space>
          <Space direction="vertical">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
          </Space>
        </ConfigProvider> */}
      </div>
      <div>
        {/* 单元测试 */}
        <Toggle />
        <div>
          <div>{count}</div>
          <div>
            <button onClick={() => increment(1)}>加一</button>
            <button onClick={() => decrement(2)}>减二</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
