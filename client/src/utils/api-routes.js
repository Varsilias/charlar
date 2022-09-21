import axios from "./http/api";

const api = {
  signup: async (data) => {
    try {
      const res = await axios.post("/auth/signup", data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  },

  login: async (data) => {
    try {
      const res = await axios.post("/auth/signin", data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  },

  setAvatar: async (userId, data) => {
    try {
      const res = await axios.post(`/auth/${userId}/avatar`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  },

  fetchUsers: async (userId) => {
    try {
      const res = await axios.get(`/auth/users/${userId}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  },

  createMessage: async (data) => {
    try {
      const res = await axios.post(`/messages`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  },

  fetchMessage: async (data) => {
    try {
      const res = await axios.post(`/messages/projected`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  },
};

export default api;
