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
  getResumeEducations(id) {
    return apiClient.get(`/resumes/${id}/educations`);
  },
  addResumeEducations(id, data) {
    return apiClient.post(`/resumes/${id}/educations`, data);
  },
  getResumeExperiences(id) {
    return apiClient.get(`/resumes/${id}/experiences`);
  },
  getResumeSkills(id) {
    return apiClient.get(`/resumes/${id}/skills`);
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