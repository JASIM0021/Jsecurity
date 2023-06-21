import {createSlice} from "@reduxjs/toolkit";

const GlobalSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    decremented: state => {
      state.value -= 1;
    },
  },
});

// eslint-disable-next-line no-undef
export const {saveUser, decremented} = GlobalSlice.actions;
export default GlobalSlice.reducer;
