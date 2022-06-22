import { initialState } from './constants';
import { authenticateUser, deauthenticateUser } from './actions';
import { createReducer } from '@reduxjs/toolkit';

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authenticateUser, (state) => {
      state.isUserAuthenticated = true;
    })
    .addCase(deauthenticateUser, (state) => {
      state.isUserAuthenticated = false;
    });
});

export default authReducer;
