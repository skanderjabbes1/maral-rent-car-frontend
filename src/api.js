import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCars = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_URL}/cars?${params}`, { headers });
  return res.data;
};

export const createBooking = async (data) => {
  const headers = getAuthHeaders();
  const res = await axios.post(`${API_URL}/bookings`, data, { headers });
  return res.data;
};

export const getBookings = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_URL}/bookings`, { headers });
  return res.data;
};

export const getBookingById = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_URL}/bookings/${id}`, { headers });
  return res.data;
};

export const deleteBooking = async (id) => {
  const headers = getAuthHeaders();
  const res = await axios.delete(`${API_URL}/bookings/${id}`, { headers });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/users/login`, { email, password });
  return res.data;
};

export const registerUser = async (name, email, password, phone) => {
  const res = await axios.post(`${API_URL}/users/register`, { name, email, password, phone });
  return res.data;
};

export const getUsers = async () => {
  const headers = getAuthHeaders();
  const res = await axios.get(`${API_URL}/users`, { headers });
  return res.data;
};
