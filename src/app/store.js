import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/event/eventSlice';
import sessionReducer from '../features/session/sessionSlice';

export const store = configureStore({
  reducer: {
    event: eventReducer,
    session: sessionReducer
  },
});
