import { createAction } from '@reduxjs/toolkit';

export const authenticateUser = createAction('auth/AUTHENTICATE_USER');
export const deauthenticateUser = createAction('auth/DEAUTHENTICATE_USER');
