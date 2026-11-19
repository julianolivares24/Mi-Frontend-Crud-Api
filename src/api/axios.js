import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url ?? '';
    const esAuth = /(?:^|\/)(?:auth\/)?(?:login|register)(?:[?#]|$)/.test(url);
    if (err.response?.status === 401 && !esAuth) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// axios es el encargado de hacer las peticiones HTTP a la API, y 
// se configura con la URL base que se encuentra en el archivo .env. 
// Esto permite que todas las solicitudes realizadas a través de esta instancia 
// de axios utilicen la URL base especificada, facilitando la gestión de las
//  rutas de la API y 
// asegurando que las solicitudes sean consistentes en toda la aplicación.