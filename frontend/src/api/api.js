const LOCAL_API_URL = "http://localhost:5000";
const RAILWAY_API_URL = "https://farmart-production-d987.up.railway.app";
const VERCEL_URL = "https://farmart-blue.vercel.app";

const API_BASE_URL =
  window.location.hostname === "localhost" 
    ? LOCAL_API_URL 
    : RAILWAY_API_URL;

export { API_BASE_URL, LOCAL_API_URL, RAILWAY_API_URL, VERCEL_URL };

export default API_BASE_URL;
