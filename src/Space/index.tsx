import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { ConfigContext } from './ConfigProvider';

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

// 继承了 HTMLAttributes<HTMLDivElement> 类型，那就可以传入各种 div 的属性
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string; // 语义化 className
  style?: React.CSSProperties; // 语义化 style
  size?: SizeType | [SizeType, SizeType]; // 间距大小
  direction?: 'horizontal' | 'vertical'; // 间距方向
  align?: 'start' | 'end' | 'center' | 'baseline'; // 对齐方式
  split?: React.ReactNode; // split
  wrap?: boolean; // 是否自动换行，仅在 horizontal 时有效
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24
};

function getNumberSize(size: SizeType) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = (props) => {
  const { space } = React.useContext(ConfigContext);

  const {
    className,
    style,
    children,
    size = space?.size || 'small',
    direction = 'horizontal',
    align,
    split,
    wrap = false,
    ...otherProps
  } = props;

  // 处理布局
  const mergedAlign =
    direction === 'horizontal' && align === undefined ? 'center' : align;

  const cn = classNames(
    'space',
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign
    },
    className
  );

  // 对 props.children 进行扁平化处理
  const childNodes = React.Children.toArray(props.children);

  // 便利子节点
  const nodes = childNodes.map((child: any, i) => {
    const key = (child && child.key) || `space-item-${i}`;

    return (
      <>
        <div className="spave-item" key={key}>
          {child}
        </div>
        {i < childNodes.length && split && (
          <span className={`${className}-split`} style={style}>
            {split}
          </span>
        )}
      </>
    );
  });

  // 处理 otherStyles、size
  const otherStyles: React.CSSProperties = {};

  const [horizontalSize, verticalSize] = React.useMemo(
    () =>
      ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(
        (item) => getNumberSize(item)
      ),
    [size]
  );

  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  if (wrap) {
    otherStyles.flexWrap = 'wrap';
  }

  return (
    <div
      className={cn}
      style={{
        ...otherStyles,
        ...style
      }}
      {...otherProps}
    >
      {nodes}
    </div>
  );
};

export default Space;
