import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getCars = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`${API_URL}/cars?${params}`);
  return res.data;
};

export const createBooking = async (data) => {
  const res = await axios.post(`${API_URL}/bookings`, data);
  return res.data;
};