import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import ReactModal from 'react-modal';

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

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openListModal, setOpenListModal] = useState(false);

  const handleDayClick = (currentDate) => {
    setDate(currentDate);
    const list = reminders.filter((reminder) => moment(reminder.date).isSame(currentDate, 'day'));
    if (list.length) {
      setCurrentReminders(list);
      setOpenListModal(true);
    }
  };

  const handleAddClick = (date) => {
    setReminder({ date, day: date.format('D'), time: date.format('HH:mm') });
    setOpenAddModal(true);
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
    setOpenAddModal(false);
  };

  const handleEditClick = (item) => {
    setOpenListModal(false);
    setReminder({ ...item, time: item.time.toDate() });
    setOpenAddModal(true);
  };

  const handleDeleteClick = (id) => dispatch(Actions.deleteReminders(id));

  const handleDeleteAllClick = (date) => dispatch(Actions.deleteAllReminders(date));

  useEffect(() => {
    if (date && openListModal) {
      const list = reminders.filter((reminder) => moment(reminder.date).isSame(date, 'day'));
      if (!list.length) setOpenListModal(false);
      setCurrentReminders(list);
    }
  }, [reminders]);

  return (
    <div className="App">
      <Calendar reminders={reminders} onAddClick={handleAddClick} onDayClick={handleDayClick} />
      <ReactModal
        key="listModal"
        isOpen={openListModal}
        onRequestClose={() => setOpenListModal(false)}
        className="modal"
      >
        <div className="modal">
          <div className="modal-header">
            <h2>Reminders</h2>
            <span onClick={() => setOpenListModal(false)}>&times;</span>
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
      </ReactModal>
      <ReactModal
        key="addModal"
        isOpen={openAddModal}
        onRequestClose={() => setOpenAddModal(false)}
        className="modal"
      >
        <div>
          <div className="modal-header">
            <h2>New reminder</h2>
            <span onClick={() => setOpenAddModal(false)}>&times;</span>
          </div>
          <div className="modal-body">
            <Form reminder={reminder} onSubmit={handleSubmit} />
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default App;
