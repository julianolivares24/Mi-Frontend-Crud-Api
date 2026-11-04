import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listar, eliminar } from '../services/clientes';

export default function ClientesList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listar()
      .then(setItems)
      .catch(() => setError('No se pudo conectar con la API'))
      .finally(() => setLoading(false));
  }, []);

  const borrar = async (id) => {
    if (!window.confirm('¿Eliminar este cliente?')) return;
    await eliminar(id);
    setItems((prev) => prev.filter((cliente) => cliente.id !== id));
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Clientes</h1>
      <Link to="/clientes/nuevo">Nuevo cliente</Link>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Apellido</th><th>Documento</th>
            <th>Teléfono</th><th>Email</th><th>Dirección</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.documento}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.email ?? ''}</td>
              <td>{cliente.direccion ?? ''}</td>
              <td>
                <Link to={`/clientes/${cliente.id}/editar`}>Editar</Link>{' '}
                <button onClick={() => borrar(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
