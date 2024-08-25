import React from 'react';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import Upload, { UploadProps } from '../Upload';
import TestAntdUpload from '../Upload/TestAntdUpload';

const props: UploadProps = {
  name: 'file',
  action: 'http://localhost:3333/upload',
  headers: {},
  multiple: true,
  beforeUpload(file) {
    if (file.name.includes('1.image')) {
      return false;
    }
    return true;
  },
  onSuccess(ret) {
    console.log('onSuccess', ret);
  },
  onError(err) {
    console.log('onError', err);
  },
  onProgress(percentage, file) {
    console.log('onProgress', percentage);
  },
  onChange(file) {
    console.log('onChange', file);
  }
};

const TestUpload: React.FC = () => (
  <>
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
    <Upload {...props} drag>
      <p>
        <InboxOutlined style={{ fontSize: '50px' }} />
      </p>
      <p>点击或者拖拽文件到此处</p>
    </Upload>
  </>
);

export default TestUpload;
