import axios from "axios";

export const getAdminReports = async (data: any) => {
  const response = await axios.post("/api/reports/get-admin-reports", data);
  return response.data;
};

export const getUserReports = async () => {
  const response = await axios.get("/api/reports/get-user-reports");
  return response.data;
};