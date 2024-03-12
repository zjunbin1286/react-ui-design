import React, { PropsWithChildren, forwardRef } from 'react';
import cs from 'classnames';
import './index.scss';

// icon 基本属性
type BaseIconProps = {
  className?: string;
  style?: React.CSSProperties;
  size?: string | string[];
  spin?: boolean;
};

// Icon 就是对 svg 的封装，所以我们也接受所有 svg 的属性，透传给内部的 svg
export type IconProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>;

/**
 * 处理 size 参数
 * @param size  string | string[]
 * @returns []
 */
export const getSize = (size: IconProps['size']) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[];
  }

  const width = (size as string) || '1em';
  const height = (size as string) || '1em';

  return [width, height];
};

/**
 * 使用 forwardRef 来把 svg 的 ref 转发出去
 */
export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>(
  (props, ref) => {
    const { style, className, spin, size = '1em', children, ...rest } = props;

    // 处理 size
    const [width, height] = getSize(size);

    // 处理 className
    const cn = cs(
      'icon',
      {
        'icon-spin': spin
      },
      className
    );

    return (
      <svg
        fill="currentColor"
        ref={ref}
        className={cn}
        style={style}
        width={width}
        height={height}
        {...rest}
      >
        {children}
      </svg>
    );
  }
);
