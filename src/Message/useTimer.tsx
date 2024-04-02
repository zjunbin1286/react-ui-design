import { useEffect, useRef } from 'react';

export interface UseTimerProps {
  id: number;
  duration?: number;
  remove: (id: number) => void;
}

export function useTimer(props: UseTimerProps) {
  // 传入 message 的 id、duration，还有 remove 方法
  const { remove, id, duration = 2000 } = props;

  const timer = useRef<number | null>(null);

  const startTimer = () => {
    timer.current = window.setTimeout(() => {
      remove(id);
      removeTimer();
    }, duration);
  };

  const removeTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  // 用 useEffect 执行 startTimer，到 duration 的时候删掉 message、停止定时器。
  useEffect(() => {
    startTimer();
    return () => removeTimer();
  }, []);

  // 如果 mouseEnter 的时候删掉定时器，mouseLeave 重新开启
  const onMouseEnter = () => {
    removeTimer();
  };

  const onMouseLeave = () => {
    startTimer();
  };

  return {
    onMouseEnter,
    onMouseLeave
  };
}
