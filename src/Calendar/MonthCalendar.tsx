import { Dayjs } from 'dayjs'
import { CalendarProps } from '.'

interface MonthCalendarProps extends CalendarProps {}

/**
 * 获取当月全部日期数据
 * @param date 日期
 * @returns 
 */
function getAllDays(date: Dayjs) {
  const daysInMonth = date.daysInMonth() // 这个月的天数
  const startDate = date.startOf('month') // 这个月的第一天
  const day = startDate.day() - 1
  
  // 日历都是固定 6 * 7 个日期
  const daysInfo: Array<{date: Dayjs, currentMonth: boolean}> = new Array(6 * 7)

  // subtract 方法就可以计算当前日期 -1、-2、-3 的日期
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false
    }
  }

  // 完整的日期
  for(let i = day ; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day');

    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month()
    }
  }
  
  return daysInfo;
}

/**
 * 渲染日期
 * @param days 日期列表 
 * @returns
 */
function renderDays(days: Array<{ date: Dayjs, currentMonth: boolean}>) {
  const rows = [];
  for(let i = 0; i < 6; i++ ) {
      const row = [];
      for(let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = <div className={
          "calendar-month-body-cell " + (item.currentMonth ? 'calendar-month-body-cell-current' : '')
        }>{item.date.date()}</div>
      }
      rows.push(row);
  }
  return rows.map(row => <div className="calendar-month-body-row">{row}</div>)
}

/**
 * 月份组件
 * @param props MonthCalendarProps
 * @returns 
 */
function MonthCalendar(props: MonthCalendarProps) {
  const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  const allDays = getAllDays(props.value)

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {week}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">
        {
          renderDays(allDays)
        }
      </div>
    </div>
  )
}

export default MonthCalendar
