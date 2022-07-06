import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserRequest, authenticateUserRequest } from '../../api/requests';

export const createUser = createAsyncThunk(
  'auth/CREATE_USER',
  createUserRequest,
);

export const loginUser = createAsyncThunk(
  'auth/LOGIN_USER',
  authenticateUserRequest,
);
