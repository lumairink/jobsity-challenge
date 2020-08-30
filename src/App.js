import React, { useEffect, useState } from 'react';
import useModal from 'react-hooks-use-modal';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import Calendar from './components/Calendar';
import Form from './components/Form';
import Actions from './data/reminders/actions';
import RemindersList from './components/RemindersList';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminders);

  const [date, setDate] = useState();
  const [reminder, setReminder] = useState();
  const [currentReminders, setCurrentReminders] = useState([]);

  const [ListModal, openListModal, closeListModal, isOpen] = useModal('root', {
    preventScroll: true,
  });

  const [AddModal, openAddModal, closeAddModal] = useModal('root', {
    preventScroll: true,
  });

  const handleDayClick = (currentDate) => {
    setDate(currentDate);
    const list = reminders.filter((reminder) => moment(reminder.date).isSame(currentDate, 'day'));
    if (list.length) {
      setCurrentReminders(list);
      openListModal();
    }
  };

  const handleAddClick = (date) => {
    setReminder({ date, day: date.format('D'), time: date.format('HH:mm') });
    openAddModal();
  };

  const handleSubmit = (values) => {
    const newDate = moment(
      new Date(
        values.date.year(),
        values.date.month(),
        values.day ? values.day : values.date.dayOfYear(),
        values.time.format('HH'),
        values.time.format('mm')
      )
    );
    values = { ...values, date: newDate };
    if (values.id) {
      dispatch(Actions.editReminders(values));
    } else {
      dispatch(Actions.saveReminder({ ...values, id: uuid() }));
    }
    closeAddModal();
  };

  const handleEditClick = (item) => {
    closeListModal();
    setReminder({ ...item, time: item.time.toDate() });
    openAddModal();
  };

  const handleDeleteClick = (id) => dispatch(Actions.deleteReminders(id));

  const handleDeleteAllClick = (date) => dispatch(Actions.deleteAllReminders(date));

  useEffect(() => {
    if (date && isOpen) {
      const list = reminders.filter((reminder) => moment(reminder.date).isSame(date, 'day'));
      if (!list.length) closeListModal();
      setCurrentReminders(list);
    }
  }, [reminders]);

  return (
    <div className="App">
      <Calendar reminders={reminders} onAddClick={handleAddClick} onDayClick={handleDayClick} />
      <ListModal key="listModal">
        <div className="modal">
          <div className="modal-header">
            <h2>Reminders</h2>
            <span onClick={closeListModal}>&times;</span>
          </div>
          <div>
            <RemindersList
              reminders={currentReminders}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              onDeleteAllClick={handleDeleteAllClick}
            />
          </div>
        </div>
      </ListModal>
      <AddModal key="addModal">
        <div className="modal">
          <div className="modal-header">
            <h2>New reminder</h2>
            <span onClick={closeAddModal}>&times;</span>
          </div>
          <div className="modal-body">
            <Form reminder={reminder} onSubmit={handleSubmit} />
          </div>
        </div>
      </AddModal>
    </div>
  );
}

export default App;
