import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtener, crear, actualizar } from '../services/creditos';
import { listar as listarClientes } from '../services/clientes';
import { listar as listarProductos } from '../services/productos';

const initialForm = {
  cliente_id: '',
  product_id: '',
  valor_producto: '',
  cuota_inicial: '',
  saldo: '',
  numero_cuotas: '',
  valor_cuota: '',
  fecha_inicio: '',
  estado: 'activo',
};

export default function CreditoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([listarClientes(), listarProductos()])
      .then(([clientesData, productosData]) => {
        setClientes(clientesData);
        setProductos(productosData);
      })
      .catch(() => setError('No se pudieron cargar clientes y productos'));
  }, []);

  useEffect(() => {
    if (id) {
      obtener(id).then((credito) =>
        setForm({
          cliente_id: credito.cliente_id,
          product_id: credito.product_id,
          valor_producto: credito.valor_producto,
          cuota_inicial: credito.cuota_inicial,
          saldo: credito.saldo,
          numero_cuotas: credito.numero_cuotas,
          valor_cuota: credito.valor_cuota,
          fecha_inicio: credito.fecha_inicio,
          estado: credito.estado,
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
      const datos = {
        ...form,
        cliente_id: Number(form.cliente_id),
        product_id: Number(form.product_id),
        numero_cuotas: Number(form.numero_cuotas),
      };
      if (id) await actualizar(id, datos);
      else await crear(datos);
      navigate('/creditos');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{id ? 'Editar crédito' : 'Nuevo crédito'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        <select name="cliente_id" value={form.cliente_id} onChange={onChange} required>
          <option value="">Seleccione un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre} {cliente.apellido}
            </option>
          ))}
        </select>
      </p>
      <p>
        <select name="product_id" value={form.product_id} onChange={onChange} required>
          <option value="">Seleccione un producto</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>{producto.name}</option>
          ))}
        </select>
      </p>
      <p><input name="valor_producto" type="number" step="0.01" min="0" value={form.valor_producto} onChange={onChange} placeholder="Valor del producto" required /></p>
      <p><input name="cuota_inicial" type="number" step="0.01" min="0" value={form.cuota_inicial} onChange={onChange} placeholder="Cuota inicial" required /></p>
      <p><input name="saldo" type="number" step="0.01" min="0" value={form.saldo} onChange={onChange} placeholder="Saldo" required /></p>
      <p><input name="numero_cuotas" type="number" min="1" max="12" value={form.numero_cuotas} onChange={onChange} placeholder="Número de cuotas" required /></p>
      <p><input name="valor_cuota" type="number" step="0.01" min="0" value={form.valor_cuota} onChange={onChange} placeholder="Valor de cuota" required /></p>
      <p><input name="fecha_inicio" type="date" value={form.fecha_inicio} onChange={onChange} required /></p>
      <p>
        <select name="estado" value={form.estado} onChange={onChange} required>
          <option value="activo">Activo</option>
          <option value="pagado">Pagado</option>
          <option value="mora">Mora</option>
        </select>
      </p>
      <button type="submit">{id ? 'Guardar cambios' : 'Crear'}</button>{' '}
      <button type="button" onClick={() => navigate('/creditos')}>Cancelar</button>
    </form>
  );
}
