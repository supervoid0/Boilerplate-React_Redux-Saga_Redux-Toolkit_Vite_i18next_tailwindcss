import { validUserTypeLabel } from '../../utils/common-constants';

export const tagColorByUserTypes = {
  U100: 'green',
  U200: 'blue',
  U300: 'purple',
  U400: 'volcano',
};

export const userFormValidation = {
  userType: {
    isValid: (v) => v && validUserTypeLabel[v],
    message: 'Valid user type is required',
  },
  firstName: {
    isValid: (v) => v && v.trim(),
    message: 'Required',
  },
  lastName: {
    isValid: (v) => v && v.trim,
    message: 'Required',
  },
  email: {
    isValid: (v) =>
      v &&
      String(v)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
    message: 'Valid email is required',
  },
};

export const sortOptions = [
  { value: 'none', label: 'None' },
  { value: 'name', label: 'Name' },
  { value: 'userID', label: 'ID' },
];
