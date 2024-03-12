import React, { forwardRef } from 'react';
import { Icon, IconProps } from '.';

interface CreateIconOptions {
  content: React.ReactNode;
  iconProps?: IconProps;
  viewBox?: string;
}

/**
 * 创建 Icon 组件
 * 接收 svg 的内容，也可以设置一些 IconProps、fill 颜色等
 * @param options
 * @returns
 */
export function createIcon(options: CreateIconOptions) {
  const { content, iconProps = {}, viewBox = '0 0 1024 1024' } = options;

  return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return (
      <Icon ref={ref} viewBox={viewBox} {...iconProps} {...props}>
        {content}
      </Icon>
    );
  });
}
