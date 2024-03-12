import React from 'react';
import { Icon, IconProps } from './';

const loadedSet = new Set<string>();

/**
 * 创建 iconfont 的图标
 * @param scriptUrl
 * @returns
 */
export function createFromIconfont(scriptUrl: string) {
  if (
    typeof scriptUrl === 'string' &&
    scriptUrl.length &&
    !loadedSet.has(scriptUrl)
  ) {
    // 在 document.body 上添加 <script> 标签引入它
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    document.body.appendChild(script);

    // 加载过的就不用再次加载了，所以用 Set 来记录下
    loadedSet.add(scriptUrl);
  }

  const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props;

    return (
      <Icon {...rest} ref={ref}>
        {type ? <use xlinkHref={`#${type}`} /> : null}
      </Icon>
    );
  });

  return Iconfont;
}
