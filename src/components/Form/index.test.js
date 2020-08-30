import React from 'react';
import '@testing-library/jest-dom';
import { render, wait, waitForElement, queryByAttribute, fireEvent } from '@testing-library/react';
import moment from 'moment';
import Form from '.';

const date = moment();
const reminder = { date, day: date.format('D'), time: date.format('HH:mm') };

describe('Add new reminder form', () => {
  it('submits values', async () => {
    const mock = jest.fn();
    const getById = queryByAttribute.bind(null, 'id');
    const dom = render(<Form reminder={reminder} onSubmit={mock} />);

    const text = getById(dom.container, 'text');
    const day = getById(dom.container, 'day');
    const time = getById(dom.container, 'time');
    const city = getById(dom.container, 'city');
    const color = getById(dom.container, 'color');

    const button = await waitForElement(() => dom.getByText('Save'));

    fireEvent.change(text, {
      target: {
        value: 'Test Test Test Test Test Test Test',
      },
    });
    fireEvent.change(day, {
      target: {
        value: 30,
      },
    });
    fireEvent.change(time, {
      target: {
        value: moment().toDate(),
      },
    });
    fireEvent.change(city, {
      target: {
        value: 'City',
      },
    });
    fireEvent.change(color, {
      target: {
        value: '#000',
      },
    });

    fireEvent.click(button);

    await wait(() => {
      expect(mock).toBeCalled();
    });
  });
});
