import { createSelector } from '@reduxjs/toolkit';

import { LOGIN_SCOPE, initialState } from './reducer';

const state = state => state[LOGIN_SCOPE] || initialState;

export const loginPageStateSelector = () => createSelector(state, state => state);
export const formSelector = () => createSelector(state, state=> state.form)
