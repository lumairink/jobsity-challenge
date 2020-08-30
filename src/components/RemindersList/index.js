import React from 'react';

import './styles.css';

const RemindersList = ({ reminders, onEditClick, onDeleteClick, onDeleteAllClick }) => {
  return (
    <div className="rl-list-container">
      {reminders.map((reminder) => (
        <div className="rl-list-item" key={reminder.id}>
          <span className="rl-reminder-color" style={{ backgroundColor: reminder.color }} />
          <div className="rl-list-item-data">
            <span>{reminder.date.format('YYYY-MM-DD')}</span>
            <span>{reminder.time.format('HH:mm')}</span>
            <span>{reminder.city}</span>
            <span>{reminder.text}</span>
          </div>
          <div>
            <div className="rl-edit-reminder" onClick={() => onEditClick(reminder)}>
              Edit
            </div>
            <div className="rl-delete-reminder" onClick={() => onDeleteClick(reminder.id)}>
              Delete
            </div>
          </div>
        </div>
      ))}
      {reminders.length > 1 && (
        <div className="rl-delete-reminder" onClick={() => onDeleteAllClick(reminders[0].date)}>
          Delete All
        </div>
      )}
    </div>
  );
};

export default RemindersList;
