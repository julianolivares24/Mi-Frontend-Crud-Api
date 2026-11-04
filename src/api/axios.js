import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: 'application/json' },
});

// axios es el encargado de hacer las peticiones HTTP a la API, y 
// se configura con la URL base que se encuentra en el archivo .env. 
// Esto permite que todas las solicitudes realizadas a través de esta instancia 
// de axios utilicen la URL base especificada, facilitando la gestión de las
//  rutas de la API y 
// asegurando que las solicitudes sean consistentes en toda la aplicación.