import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer, // ודא שהשם של ה-reducer הוא "contacts"
  },
});
