import api from '../api/axios';

export const listar     = ()         => api.get('/products').then(r => r.data);
export const obtener    = (id)       => api.get(`/products/${id}`).then(r => r.data);
export const crear      = (datos)    => api.post('/products', datos).then(r => r.data);
export const actualizar = (id, datos) => api.put(`/products/${id}`, datos).then(r => r.data);
export const eliminar   = (id)       => api.delete(`/products/${id}`);

// el exporta el archivo de axios.js para poder hacer las peticiones
//  HTTP a la API, y define funciones para listar, obtener, crear, 
// actualizar y eliminar productos. Cada función utiliza la instancia de 
// axios configurada con la 
// URL base de la API y maneja la respuesta para devolver solo los datos relevantes.