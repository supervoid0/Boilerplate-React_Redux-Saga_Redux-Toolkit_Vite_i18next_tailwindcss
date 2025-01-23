import { USERS_SCOPE, initialState } from './reducer';
import { createSelector } from '@reduxjs/toolkit';

const state = (state) => state[USERS_SCOPE] || initialState;
export const usersStateSelector = () => createSelector(state, (state) => state);
