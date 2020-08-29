import React, { useState, useEffect } from 'react';
import moment from 'moment';

import './styles.css';

const Calendar = ({ onDayClick, onAddClick }) => {
  const [date, setDate] = useState(moment());
  const [currentMonth, setCurrentMonth] = useState(null);

  const weekDays = moment.weekdays().map((day) => (
    <th key={day} className="week-days">
      {day}
    </th>
  ));

  const getMonthStart = () => date.startOf('month').format('d');

  const getDaysInMonth = () => {
    let space = [];
    for (let i = 0; i < getMonthStart(); i++)
      space.push(<td key={`blank_${i}`} className="day blank" />);

    let validDays = [];
    for (let day = 1; day <= date.daysInMonth(); day++) {
      const currentDate = moment(new Date(date.year(), date.month(), day));

      validDays.push(
        <td key={day} className="day" onClick={() => onDayClick(currentDate)}>
          <span>{day}</span>
          <button
            title="Add a reminder"
            className="calendar-btn"
            onClick={() => onAddClick(currentDate)}
          >
            +
          </button>
        </td>
      );
    }

    const total = [...space, ...validDays];
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
  }, [date]);

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
