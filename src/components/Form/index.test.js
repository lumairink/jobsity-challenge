import React from 'react';
import '@testing-library/jest-dom';
import { render, wait, waitForElement, queryByAttribute, fireEvent } from '@testing-library/react';
import moment from 'moment';
import Form from '.';
import { act } from 'react-dom/test-utils';

const date = moment();
const reminder = { date, day: date.format('D'), time: date.format('HH:mm') };
const fields = {
  text: 'Text',
  day: 'Day',
  time: 'Time',
  city: 'City',
  color: 'Pick a color',
};

describe('Add new reminder form', () => {
  const mock = jest.fn();
  const { getByLabelText, getByText, findByTestId } = render(
    <Form reminder={reminder} onSubmit={mock} />
  );

  const text = getByLabelText(fields.text);
  const time = getByLabelText(fields.time);
  const city = getByLabelText(fields.city);

  const button = getByText('Save');

  it('submits values with text greater than 30 characters', async () => {
    act(() => {
      fireEvent.change(text, {
        target: {
          value: 'Test Test Test Test Test Test Test',
        },
      });
    });

    const validationErrors = await findByTestId('errors-max');

    expect(validationErrors.innerHTML).toBe('Max 30 characters.');
  });
});
