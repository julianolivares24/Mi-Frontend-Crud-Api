import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listar, eliminar } from '../services/creditos';

export default function CreditosList() {
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
    if (!window.confirm('¿Eliminar este crédito?')) return;
    await eliminar(id);
    setItems((prev) => prev.filter((credito) => credito.id !== id));
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Créditos</h1>
      <Link to="/creditos/nuevo">Nuevo crédito</Link>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th><th>Cliente</th><th>Producto</th><th>Valor</th>
            <th>Cuota inicial</th><th>Saldo</th><th>Cuotas</th>
            <th>Valor cuota</th><th>Inicio</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((credito) => (
            <tr key={credito.id}>
              <td>{credito.id}</td>
              <td>{credito.cliente ? `${credito.cliente.nombre} ${credito.cliente.apellido}` : credito.cliente_id}</td>
              <td>{credito.producto?.name ?? credito.product_id}</td>
              <td>{credito.valor_producto}</td>
              <td>{credito.cuota_inicial}</td>
              <td>{credito.saldo}</td>
              <td>{credito.numero_cuotas}</td>
              <td>{credito.valor_cuota}</td>
              <td>{credito.fecha_inicio}</td>
              <td>{credito.estado}</td>
              <td>
                <Link to={`/creditos/${credito.id}/editar`}>Editar</Link>{' '}
                <button onClick={() => borrar(credito.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
