import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", 
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const targetUrl = error.config ? (error.config.url || '') : '';
    
    const isLoginRequest = targetUrl.includes('/login') || targetUrl.includes('auth/login');

    if (
      error.response && 
      (error.response.status === 401 || error.response.status === 403) &&
      !isLoginRequest 
    ) {
      console.error("Session expired or unauthorized");
      
      localStorage.removeItem("access_token");

      Swal.fire({
        icon: 'warning',
        title: 'Session หมดอายุ',
        text: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
        confirmButtonText: 'เข้าสู่ระบบ',
        width: '24rem',
        padding: '1.5rem 2rem',
        customClass: {
          popup: 'rounded-[2rem] shadow-xl',
          title: 'text-[#051960] text-2xl font-bold font-sans mb-1',
          htmlContainer: 'text-gray-500 text-sm font-light font-sans',
          confirmButton: 'bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-base px-8 py-2.5 rounded-3xl shadow-lg shadow-orange-200 transition-all outline-none border-none',
          icon: 'transform scale-60 !mt-2 !mb-2'
        },
        buttonsStyling: false,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }
    
    return Promise.reject(error);
  }
);

export default api;