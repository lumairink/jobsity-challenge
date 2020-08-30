import React, { useState, useEffect } from 'react';
import moment from 'moment';

import './styles.css';

const Calendar = ({ reminders, onDayClick, onAddClick }) => {
  const [date, setDate] = useState(moment(new Date()));
  const [currentMonth, setCurrentMonth] = useState(null);

  const weekDays = moment.weekdays().map((day) => (
    <th key={day} className="week-days">
      {day}
    </th>
  ));

  const getMonthStart = () => +moment(date).startOf('month').format('d');

  const getCurrentDay = () => +date.format('D');

  const getDaysInMonth = () => {
    let empty = [];
    for (let i = 0; i < getMonthStart(); i++)
      empty.push(<td key={`blank_${i}`} className="day blank" />);

    let validDays = [];
    for (let day = 1; day <= date.daysInMonth(); day++) {
      const currentDate = moment(new Date(date.year(), date.month(), day));
      const today = getCurrentDay() === day ? 'today' : '';
      const texts = [];

      reminders.forEach(({ date: itemDate, text, color }, index) => {
        if (itemDate.format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD')) {
          texts.push(
            <div key={`text_${index}`}>
              <span className="reminder-preview-color" style={{ backgroundColor: color }}></span>{' '}
              {text}
            </div>
          );
        }
      });
      validDays.push(
        <td
          key={`day_${day}`}
          className={`day ${today}`}
          title={texts.length > 0 ? 'Click for details' : ''}
          style={{ cursor: texts.length > 0 ? 'pointer' : 'initial' }}
          onClick={() => onDayClick(currentDate)}
        >
          {texts.length > 0 && <div className="reminder-preview">{texts}</div>}
          <span>{day}</span>
          <button
            title="Add a reminder"
            className="calendar-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddClick(currentDate);
            }}
          >
            +
          </button>
        </td>
      );
    }

    const total = [...empty, ...validDays];
    let days = [],
      weeks = [];

    total.forEach((day, index) => {
      if (index % 7 !== 0) {
        days.push(day);
      } else {
        weeks.push(days);
        days = [day];
      }

      if (index === total.length - 1) weeks.push(days);
    });

    return weeks.map((week, index) => <tr key={index}>{week}</tr>);
  };

  useEffect(() => {
    setCurrentMonth(getDaysInMonth());
  }, [date, reminders]);

  return (
    <div>
      <h2>{date.format('MMMM')}</h2>
      <table className="calendar">
        <thead>
          <tr>{weekDays}</tr>
        </thead>
        <tbody>{currentMonth}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
