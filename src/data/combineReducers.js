import { combineReducers } from 'redux';

import remindersReducer from './reminders/reducer';

export default combineReducers({ reminders: remindersReducer });
