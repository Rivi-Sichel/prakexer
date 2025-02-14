import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  arr: [],
  thisContact: null
}
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    selectContact: (state, action) => {
      state.thisContact = action.payload;
    },
    updateContact: (state, action) => {
      const index = state.arr.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.arr[index] = { ...state.arr[index], ...action.payload };
      }
    },
    addContact: (state, action) => {
      state.arr.push(action.payload)
    },
    insertData: (state, action) => {
      state.arr = action.payload;
    },
    changeStar: (state, action) => {
      const index = state.arr.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        const newIsMain = action.payload.isMain === 1 ? 1 : 0;
        state.arr[index].isMain = newIsMain;
      }
    }
  },
});

export const { selectContact, updateContact, addContact, insertData, changeStar } = contactsSlice.actions;
export default contactsSlice.reducer;
