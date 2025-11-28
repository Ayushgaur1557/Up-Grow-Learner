// src/config/apiConfig.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// These are the full prefixes for each service:
export const USER_API = `${API_BASE_URL}/user`;
export const COURSE_API = `${API_BASE_URL}/course`;
export const COURSE_PURCHASE_API = `${API_BASE_URL}/purchase`;
export const COURSE_PROGRESS_API = `${API_BASE_URL}/progress`;
