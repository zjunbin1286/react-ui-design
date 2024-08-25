import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload as AntdUpload } from 'antd';

const props: UploadProps = {
  name: 'file',
  action: 'http://localhost:3333/upload',
  headers: {},
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

const TestAntdUpload: React.FC = () => (
  <AntdUpload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </AntdUpload>
);

export default TestAntdUpload;
