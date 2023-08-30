import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {user: null} as any,
    reducers: {
      userLoggedIn: (state: any, action: any) => {
        state.user = action.payload;
      },
      userLoggedOut: (state: any) => {
        state.user = null;
      },

    },
  });

//Actions 
export const userLoggedIn = userSlice.actions.userLoggedIn;
export const userLoggedOut = userSlice.actions.userLoggedOut;

//Selector
export const userSelector = (state: any): any => state.user.user;

export default userSlice.reducer; 