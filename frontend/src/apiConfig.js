// This file handles the switch between Localhost and Live automatically
const isProduction = import.meta.env.MODE === 'production';

export const BASE_URL = isProduction
   ? "https://dairy-app-backend-uwfk.onrender.com"
    : "http://localhost:5001";