import Types from './types';

const saveReminder = (reminder) => ({
  type: Types.SAVE_REMINDERS,
  payload: { reminder },
});

const editReminders = (reminder) => ({
  type: Types.EDIT_REMINDERS,
  payload: { reminder },
});

const deleteReminders = (id) => ({
  type: Types.DELETE_REMINDERS,
  payload: { id },
});

const deleteAllReminders = (date) => ({
  type: Types.DELETE_ALL_REMINDERS,
  payload: { date },
});

export default { saveReminder, editReminders, deleteReminders, deleteAllReminders };
