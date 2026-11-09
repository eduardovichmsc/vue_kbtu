import apiClient from "./client";

export const studentService = {
  async getStudentProfile(id = 1) {
    const response = await apiClient.get("/student/profile");
    return response.data;
  },

  async updateStudentProfile(id, payload) {
    const response = await apiClient.put("/student/profile", payload);
    return response.data;
  },

  async getStudents() {
    const response = await apiClient.get("/students");
    return response.data;
  },

  async getAssignments(userId = 1) {
    const response = await apiClient.get("/assignments");
    return response.data;
  },

  async getAnnouncements(limit = 4) {
    const response = await apiClient.get("/announcements");
    return response.data;
  },

  async getCourses() {
    const response = await apiClient.get("/courses");
    return response.data;
  },
};
