import axios from 'axios';

axios.defaults.headers.common['X-APPID'] = import.meta.env.VITE_APP_ID;
axios.defaults.headers.common['X-Is-frontendUI'] = true;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const url = `${import.meta.env.VITE_BACKEND_URL}/site`;

export default {
  user: {
    loadUser: (authHeader) =>
      axios.get(`${url}/user-me`, authHeader).then((res) => res.data),
    login: (credentials) =>
      axios.post(`${url}/user/login/`, credentials).then((res) => res.data),
    logout: (authHeader) =>
      axios.post(`${url}/user/logout`, authHeader).then((res) => res.data),
    // forgotPassword: credentials =>
    //   axios
    //     .post(`${url}user/forgotPassword/`, credentials)
    //     .then(res => res.data),
    createUser: (form, authHeader) =>
      axios.post(`${url}/user`, form, authHeader).then((res) => res.data),
    // updateUser: (authHeader, update) =>
    //   axios.put(`${url}/me`, update, authHeader).then(res => res.data),
    getUsers: (queryString = '', authHeader) =>
      axios
        .get(`${url}/users${queryString}`, authHeader)
        .then((res) => res.data),
    getUser: (authHeader, userID) =>
      axios.get(`${url}/user/${userID}`, authHeader).then((res) => res.data),
    updateAnotherUser: (authHeader, userID, update) =>
      axios
        .put(`${url}/user/${userID}`, update, authHeader)
        .then((res) => res.data),
    deleteAnotherUser: (userID, authHeader) =>
      axios.delete(`${url}/user/${userID}`, authHeader).then((res) => res.data),
    // searchUsers: (authHeader, queryString) =>
    //   axios.get(`${url}${queryString}`, authHeader).then(res => res.data),
    changePassword: (authHeader, userID, form) =>
      axios.put(`${url}/user/change-password/${userID}`, form, authHeader),
  },
};
