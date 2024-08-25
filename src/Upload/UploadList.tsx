import { FC } from 'react';
import { Progress } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  FileOutlined,
  LoadingOutlined
} from '@ant-design/icons';

export interface UploadFile {
  /**文件 uid */
  uid: string;
  /**文件大小 */
  size: number;
  /**文件名称 */
  name: string;
  /**文件状态 */
  status?: 'ready' | 'uploading' | 'success' | 'error';
  /**文件上传进度 */
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="upload-list">
      {fileList.map((item) => {
        return (
          <li
            className={`upload-list-item upload-list-item-${item.status}`}
            key={item.uid}
          >
            <span className="file-name">
              {(item.status === 'uploading' || item.status === 'ready') && (
                <LoadingOutlined />
              )}
              {item.status === 'success' && <CheckOutlined />}
              {item.status === 'error' && <CloseOutlined />}
              {item.name}
            </span>
            <span className="file-actions">
              <DeleteOutlined
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>
            {item.status === 'uploading' && (
              <Progress percent={item.percent || 0} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
