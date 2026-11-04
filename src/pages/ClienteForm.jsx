import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtener, crear, actualizar } from '../services/clientes';

export default function ClienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    telefono: '',
    email: '',
    direccion: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      obtener(id).then((cliente) =>
        setForm({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          documento: cliente.documento,
          telefono: cliente.telefono,
          email: cliente.email ?? '',
          direccion: cliente.direccion ?? '',
        }),
      );
    }
  }, [id]);

  const onChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (id) await actualizar(id, form);
      else await crear(form);
      navigate('/clientes');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{id ? 'Editar cliente' : 'Nuevo cliente'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p><input name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre" required /></p>
      <p><input name="apellido" value={form.apellido} onChange={onChange} placeholder="Apellido" required /></p>
      <p><input name="documento" value={form.documento} onChange={onChange} placeholder="Documento" required /></p>
      <p><input name="telefono" value={form.telefono} onChange={onChange} placeholder="Teléfono" required /></p>
      <p><input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" /></p>
      <p><input name="direccion" value={form.direccion} onChange={onChange} placeholder="Dirección" /></p>
      <button type="submit">{id ? 'Guardar cambios' : 'Crear'}</button>{' '}
      <button type="button" onClick={() => navigate('/clientes')}>Cancelar</button>
    </form>
  );
}
