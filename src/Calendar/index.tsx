import React, { CSSProperties, ReactNode, useState } from 'react';
import dayjs, { Dayjs, locale } from 'dayjs';
import cs from 'classnames';
import MonthCalendar from './MonthCalendar';
import Header from './Header';
import './index.scss';
import LocaleContext from './LocaleContext';

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关 zh-CN 中文 en-US 英文，默认浏览器语言
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  const { value, style, className, locale, onChange } = props;

  const [curValue, setCurValue] = useState<Dayjs>(value);

  const [curMonth, setCurMonth] = useState<Dayjs>(value);

  // 合并类名
  const classNames = cs('calendar', className);

  function changeDate(date: Dayjs) {
    setCurValue(date);
    setCurMonth(date);
    // 调用 onChange 的参数，并且修改当前日期
    onChange?.(date);
  }

  // 点击日期
  function selectHandler(date: Dayjs) {
    changeDate(date);
  }

  // 上一月
  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, 'month'));
  }

  // 下一月
  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, 'month'));
  }

  // 点击今天
  function todayHandler() {
    const date = dayjs(Date.now());

    changeDate(date);
  }

  return (
    <LocaleContext.Provider
      value={{
        locale: locale || navigator.language
      }}
    >
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        />
        <MonthCalendar
          {...props}
          value={curValue}
          selectHandler={selectHandler}
          curMonth={curMonth}
        />
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
