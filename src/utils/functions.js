export const validate = (obj, validation, onError, errors = {}) => {
  const newErrors = { ...errors };
  Object.keys(validation).forEach((key) => {
    if (validation[key]) {
      if (!validation[key].isValid(obj[key])) {
        newErrors[key] = validation[key].message;
      } else {
        delete newErrors[key];
      }
    }
  });
  onError(newErrors);
  const hasError = Object.keys(newErrors).length;
  return hasError;
};

export function generateAuthHeader(token, isUploadingFile = false) {
  const config = {
    headers: {
      'Content-Type': isUploadingFile
        ? 'multipart/form-data'
        : 'application/json',
    },
  };

  if (token) {
    // eslint-disable-next-line dot-notation
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}

export const getTolerableSizedString = (str, tolerableLength) => {
  if (!str || typeof str !== 'string') return '';
  if (!tolerableLength || tolerableLength < 0) return str;
  return str.slice(0, tolerableLength) + (str.length > tolerableLength ? '...' : '');
};

