import React from 'react';
import { SketchPicker } from 'react-color';
import { useFormik } from 'formik';
import moment from 'moment';
import TimePicker from 'react-datepicker';

import Button from '../Button';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';

const Form = ({ reminder = {}, onSubmit }) => {
  const validate = (values) => {
    let errors = {};
    if (!values.text || !values.time || !values.city) {
      errors.emptyFields = true;
    }
    if (values.text.length > 30) {
      errors.max = true;
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      ...(reminder.id ? reminder : { ...reminder, color: '#22194D', time: '', text: '' }),
    },
    onSubmit: (values) => onSubmit({ ...values, time: moment(values.time) }),
    validate,
  });

  return (
    <>
      <form>
        <div className="input-group">
          <label htmlFor="text">Text</label>
          <input
            id="text"
            type="text"
            name="text"
            value={formik.values.text}
            onChange={(e) => formik.setFieldValue('text', e.target.value)}
          />
          {formik.errors.max && <span style={{ color: 'red' }}>Max 30 characters</span>}
        </div>
        <div className={reminder.id ? 'day-time' : ''}>
          {reminder.id && (
            <div className="input-group">
              <label htmlFor="day">Day</label>
              <input
                id="day"
                name="day"
                type="number"
                min={1}
                max={moment(reminder.date).daysInMonth()}
                value={formik.values.day}
                onChange={(e) => formik.setFieldValue('day', e.target.value)}
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="time">Time</label>
            <TimePicker
              id="time"
              name="time"
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              showTimeSelect
              showTimeSelectOnly
              selected={formik.values.time}
              onChange={(time) => formik.setFieldValue('time', time)}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            value={formik.values.city}
            onChange={(e) => formik.setFieldValue('city', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="color">Pick a color</label>
          <SketchPicker
            id="color"
            name="color"
            className="color-picker"
            disableAlpha
            color={formik.values.color}
            onChange={({ hex }) => formik.setFieldValue('color', hex)}
          />
        </div>
        {formik.errors.emptyFields && (
          <span style={{ color: 'red' }}>All fields are required.</span>
        )}
      </form>
      <div className="modal-footer">
        <Button text="Save" onClick={formik.submitForm} />
      </div>
    </>
  );
};

export default Form;
