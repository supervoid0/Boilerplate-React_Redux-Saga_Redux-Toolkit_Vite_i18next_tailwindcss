import { createSelector } from '@reduxjs/toolkit';

import { APP_SCOPE, initialState } from './reducer';

const state = state => state[APP_SCOPE] || initialState;

export const AppStateSelector = () => createSelector(state, state => state);
export const makeSelectToken = () => createSelector(state, state => state.token);
export const makeSelectCurrentUser = () => createSelector(state, state => state.currentUser);
