import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/resumes");
  },
  getAllForUser(userId) {
    return apiClient.get("/resumes/userResumes/" + userId);
  },
  get(id) {
    return apiClient.get(`/resumes/${id}`);
  },
  create(data) {
    return apiClient.post("/resumes", data);
  },
  update(id, data) {
    return apiClient.put(`/resumes/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/resumes/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/resumes`);
  },
  findByTitle(title) {
    return apiClient.get(`/resumes?title=${title}`);
  },
};