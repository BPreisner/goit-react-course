import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserRequest,
  authenticateUserRequest,
  logoutUserRequest,
  checkIfStillAuthenticatedRequest,
} from '../../api/requests';

export const createUser = createAsyncThunk(
  'auth/CREATE_USER',
  createUserRequest,
);

export const loginUser = createAsyncThunk(
  'auth/LOGIN_USER',
  authenticateUserRequest,
);

export const logoutUser = createAsyncThunk(
  'auth/LOGOUT_USER',
  logoutUserRequest,
);

export const checkIfStillAuthenticated = createAsyncThunk(
  'auth/CHECK_AUTH',
  checkIfStillAuthenticatedRequest,
);
