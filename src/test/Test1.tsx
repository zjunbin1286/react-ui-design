import React, { useRef } from 'react';
// import './App.css';

// import Calendar from './Calendar';
// import dayjs from 'dayjs';

import {
  PlusOutlined,
  MailOutlined,
  UserOutlined,
  SuccessMsg
} from '../Icon/icons';
// import { createFromIconfont } from './Icon/createFrontIconfont';
// const IconFont = createFromIconfont(
//   '//at.alicdn.com/t/c/font_3836578_jrc58m0r5v.js'
// );

import Space from '../Space';
// import { ConfigProvider } from './Space/ConfigProvider';

import { ConfigProvider } from '../Message/ConfigProvider';
import { useMessage } from '../Message/useMessage';

function Test1() {
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
        {/* <Space>
          <button>按钮1</button>
          <button>按钮2</button>
        </Space>
        <ConfigProvider space={{ size: 20 }}>
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
        <ConfigProvider>
          <div>
            <TestMessage></TestMessage>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
}

// 测试全局消息提示组件
function TestMessage() {
  const message = useMessage();
  const handleMsg = (type: any, content: string) => {
    message.add({
      type,
      content
    });
  };
  return (
    <Space>
      <button onClick={() => handleMsg('info', '一条普通的消息提示')}>
        Info
      </button>
      <button onClick={() => handleMsg('success', '更新成功！')}>Succes</button>
      <button onClick={() => handleMsg('error', '网络请求失败！')}>
        Error
      </button>
      <button onClick={() => handleMsg('warning', '警告，该数据不可删除！')}>
        Warning
      </button>
    </Space>
  );
}

export default Test1;
