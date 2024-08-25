import React, {
  FC,
  useRef,
  ChangeEvent,
  PropsWithChildren,
  useState
} from 'react';
import axios from 'axios';
import './index.scss';
import UploadList, { UploadFile } from './UploadList';
import Dragger from './Dragger';

/**
 * Upload Props Type
 */
export interface UploadProps extends PropsWithChildren {
  /**上传地址 */
  action: string;
  /**携带的请求头 */
  headers?: Record<string, any>;
  /**上传字段名，默认 file */
  name?: string;
  /**携带的数据 */
  data?: Record<string, any>;
  /** */
  withCredentials?: boolean;
  /**支持上传那些类型的文件 */
  accept?: string;
  /**是否多选 */
  multiple?: boolean;
  /**拖拽上传 */
  drag?: boolean;
  /**上传前的回调 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**进度更新时的回调 */
  onProgress?: (percentage: number, file: File) => void;
  /**上传成功时的回调 */
  onSuccess?: (data: any, file: File) => void;
  /**上传失败时的回调 */
  onError?: (err: any, file: File) => void;
  /**上传状态改变时的回调 */
  onChange?: (file: File) => void;
  /**文件移除时的回调 */
  onRemove?: (file: UploadFile) => void;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<Array<UploadFile>>([]);

  // 更新文件列表
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  // 点击input上传
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  // 上传 change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  // 上传事件
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      // 上传前的回调
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  // 正式发起 post 请求
  const post = (file: File) => {
    const formData = new FormData();

    const uploadFile: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    };
    setFileList((prevList) => {
      return [uploadFile, ...prevList];
    });

    formData.append(name || 'file', file);
    // 将外部传的参数，加入 formData 中
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials,
        // 处理 进度更新时的回调
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total!) || 0;
          if (percentage < 100) {
            updateFileList(uploadFile, {
              percent: percentage,
              status: 'uploading'
            });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        }
      })
      .then((resp) => {
        // 处理成功的回调
        updateFileList(uploadFile, { status: 'success', response: resp.data });
        onSuccess?.(resp.data, file);
        onChange?.(file);
      })
      .catch((err) => {
        // 处理失败的回调
        updateFileList(uploadFile, { status: 'error', error: err });
        onError?.(err, file);
        onChange?.(file);
      });
  };

  // 文件移除事件
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

  return (
    <div className="upload-component">
      <div className="upload-input" onClick={handleClick}>
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          className="upload-file-input"
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
