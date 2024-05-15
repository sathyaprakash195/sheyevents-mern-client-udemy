import axios from "axios";

export const createBooking = async (data: any) => {
  const response = await axios.post("/api/bookings/create-booking", data);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await axios.get("/api/bookings/get-user-bookings");
  return response.data;
};

export const getAllBookings = async () => {
  const response = await axios.get("/api/bookings/get-all-bookings");
  return response.data;
}

export const cancelBooking = async (data: any) => {
  const response = await axios.post("/api/bookings/cancel-booking", data);
  return response.data;
};
