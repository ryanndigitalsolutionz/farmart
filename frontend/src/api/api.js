const LOCAL_API_URL = 'http://localhost:5000'
const RAILWAY_API_URL = 'https://farmart-production-inc.up.railway.app'
const VERCEL_URL = 'https://farmart-inc.vercel.app'

const API_BASE_URL =
    window.location.hostname === 'farmart-inc.vercel.app'
        ? RAILWAY_API_URL
        : LOCAL_API_URL

export {
    API_BASE_URL,
    LOCAL_API_URL,
    RAILWAY_API_URL,
    VERCEL_URL,
}

export default API_BASE_URL