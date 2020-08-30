import Types from './types';
import INITIAL_STATE from './store';

export default function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.GET_REMINDERS:
      return state;
    case Types.SAVE_REMINDERS:
      return [...state, payload.reminder].sort((a, b) => a.date.valueOf() - b.date.valueOf());
    case Types.EDIT_REMINDERS: {
      const i = state.findIndex((reminder) => reminder.id === payload.reminder.id);
      if (i > -1) state[i] = payload.reminder;

      return [...state].sort((a, b) => a.date.valueOf() - b.date.valueOf());
    }
    case Types.DELETE_REMINDERS:
      return state
        .filter((reminder) => reminder.id !== payload.id)
        .sort((a, b) => a.date.valueOf() - b.date.valueOf());
    case Types.DELETE_ALL_REMINDERS:
      return state
        .filter((reminder) => !reminder.date.isSame(payload.date, 'day'))
        .sort((a, b) => a.date.valueOf() - b.date.valueOf());
    default: {
      return state;
    }
  }
}
