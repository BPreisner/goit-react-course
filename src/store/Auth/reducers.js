import { initialState } from './constants';
import { createUser, loginUser } from './actions';
import { createReducer } from '@reduxjs/toolkit';

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createUser.pending, (state) => {
      state.user.status = 'fetching';
    })
    .addCase(createUser.rejected, (state) => {
      state.user.status = 'error';
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.user = {
        status: 'success',
        email: action.payload.user.email,
        name: action.payload.user.name,
      };

      state.isUserAuthenticated = true;
    })

    .addCase(loginUser.pending, (state) => {
      state.user.status = 'fetching';
    })
    .addCase(loginUser.rejected, (state) => {
      state.user.status = 'error';
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = {
        status: 'success',
        email: action.payload.user.email,
        name: action.payload.user.name,
      };

      state.isUserAuthenticated = true;
    });
});

export default authReducer;
