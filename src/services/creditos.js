import api from '../api/axios';

export const listar = () => api.get('/creditos').then((response) => response.data);
export const obtener = (id) => api.get(`/creditos/${id}`).then((response) => response.data);
export const crear = (datos) => api.post('/creditos', datos).then((response) => response.data);
export const actualizar = (id, datos) =>
  api.put(`/creditos/${id}`, datos).then((response) => response.data);
export const eliminar = (id) => api.delete(`/creditos/${id}`);
