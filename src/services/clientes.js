import api from '../api/axios';

export const listar = () => api.get('/clientes').then((response) => response.data);
export const obtener = (id) => api.get(`/clientes/${id}`).then((response) => response.data);
export const crear = (datos) => api.post('/clientes', datos).then((response) => response.data);
export const actualizar = (id, datos) =>
  api.put(`/clientes/${id}`, datos).then((response) => response.data);
export const eliminar = (id) => api.delete(`/clientes/${id}`);
