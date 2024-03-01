import { useContext } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import cs from 'classnames';
import { CalendarProps } from '.';
import LocaleContext from './LocaleContext';
import allLocales from './locale';

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void;
  curMonth: Dayjs;
}

/**
 * 获取当月全部日期数据
 * @param date 日期
 * @returns
 */
function getAllDays(date: Dayjs) {
  const daysInMonth = date.daysInMonth(); // 这个月的天数
  const startDate = date.startOf('month'); // 这个月的第一天
  const day = startDate.day() - 1;

  // 日历都是固定 6 * 7 个日期
  const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(
    6 * 7
  );

  // subtract 方法就可以计算当前日期 -1、-2、-3 的日期
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false
    };
  }

  // 完整的日期
  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day');

    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month()
    };
  }

  return daysInfo;
}

/**
 * 月份组件
 * @param props MonthCalendarProps
 * @returns
 */
function MonthCalendar(props: MonthCalendarProps) {
  const localeContext = useContext(LocaleContext);

  const { value, dateRender, dateInnerContent, selectHandler, curMonth } =
    props;

  const CalendarLocale = allLocales[localeContext.locale];

  const weekList = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  const allDays = getAllDays(curMonth);

  // 判断是否当天
  function checkCurrent(item: any) {
    return value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD');
  }

  // 渲染日期
  function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>) {
    const rows = [];

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = (
          <div
            className={
              'calendar-month-body-cell ' +
              (item.currentMonth ? 'calendar-month-body-cell-current ' : '') +
              (checkCurrent(item) ? 'calendar-month-body-cell-selected' : '')
            }
            key={i + j}
            onClick={() => selectHandler?.(item.date)}
          >
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className="calendar-month-body-cell-date">
                <div
                  className={cs(
                    'calendar-month-body-cell-date-value',
                    checkCurrent(item)
                      ? 'calendar-month-body-cell-date-selected'
                      : ''
                  )}
                >
                  {item.date.date()}
                </div>
                <div className="calendar-month-body-cell-date-content">
                  {dateInnerContent?.(item.date)}
                </div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }
    return rows.map((row, i) => (
      <div className="calendar-month-body-row" key={i}>
        {row}
      </div>
    ));
  }

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">
        {
          // renderDays(allDays, dateRender, dateInnerContent, value, selectHandler)
          renderDays(allDays)
        }
      </div>
    </div>
  );
}

export default MonthCalendar;
