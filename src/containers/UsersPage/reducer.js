/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

export const USERS_SCOPE = 'users';
export const initialState = {
  users: [],
  isUserModalOpen: false,
  isFetchingUsers: false,
  isSubmittingForm: false,
  form: {},
};

const usersSlice = createSlice({
  name: USERS_SCOPE,
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.isFetchingUsers = true;
    },

    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.isFetchingUsers = false;
    },

    getUsersFailed: (state, action) => {
      state.users = [];
      state.isFetchingUsers = false;
    },

    editUser: (state, action) => {
      state.isSubmittingForm = true;
    },

    createUser: (state, action) => {
      state.isSubmittingForm = true;
    },

    createUserSuccess: (state, action) => {
      state.isSubmittingForm = false;
      state.isUserModalOpen = false;
      state.form = {};
    },

    createUserFailed: (state, action) => {
      state.isSubmittingForm = false;
      state.isUserModalOpen = false;
    },

    editUserSuccess: (state, action) => {
      state.isSubmittingForm = false;
      state.isUserModalOpen = false;
      state.form = {};
    },

    editUserFailed: (state, action) => {
      state.isSubmittingForm = false;
      state.isUserModalOpen = false;
    },

    deleteUser: (state, action) => {},

    deleteUserSuccess: (state, action) => {},

    deleteUserFailed: (state, action) => {},

    setIsUserModalOpen: (state, action) => {
      state.isUserModalOpen = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    onChangeForm: (state, action) => {
      const { field, value } = action.payload;
      state.form = {
        ...state.form,
        [field]: value,
      };
    },
  },
});

export const {
  createUser,
  createUserSuccess,
  createUserFailed,
  getUsers,
  getUsersSuccess,
  getUsersFailed,
  editUser,
  editUserSuccess,
  editUserFailed,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailed,
  setIsUserModalOpen,
  setForm,
  onChangeForm,
} = usersSlice.actions;

export default usersSlice;
