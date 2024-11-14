import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/user");
  },
  getUserForId(userId) {
    return apiClient.get(`/user/${userId}`);
  },
  update(userId, data) {
    return apiClient.put(`/user/${userId}`, data);
  },
  delete(id) {
    return apiClient.delete(`/user/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/user`);
  },
};