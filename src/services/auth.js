import api from '../api/axios';

export const registrar = (datos) => api.post('/register', datos).then((r) => r.data);
export const iniciarSesion = (email, password) =>
  api.post('/login', { email, password }).then((r) => r.data);
export const obtenerPerfil = () => api.get('/user').then((r) => r.data);
export const actualizarPerfil = (datos) => api.put('/users/update', datos).then((r) => r.data);