import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ProductosList from './pages/ProductosList';
import ProductoForm from './pages/ProductoForm';
import ClientesList from './pages/ClientesList';
import ClienteForm from './pages/ClienteForm';
import CreditosList from './pages/CreditosList';
import CreditoForm from './pages/CreditoForm';

export default function App() {
  return (
    <>
      <nav style={{ display: 'flex', gap: 16, padding: 16 }}>
        <Link to="/productos">Productos</Link>
        <Link to="/productos/nuevo">Nuevo</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/clientes/nuevo">Nuevo cliente</Link>
        <Link to="/creditos">Créditos</Link>
        <Link to="/creditos/nuevo">Nuevo crédito</Link>
      </nav>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/productos" replace />} />
          <Route path="/productos" element={<ProductosList />} />
          <Route path="/productos/nuevo" element={<ProductoForm />} />
          <Route path="/productos/:id/editar" element={<ProductoForm />} />
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/clientes/nuevo" element={<ClienteForm />} />
          <Route path="/clientes/:id/editar" element={<ClienteForm />} />
          <Route path="/creditos" element={<CreditosList />} />
          <Route path="/creditos/nuevo" element={<CreditoForm />} />
          <Route path="/creditos/:id/editar" element={<CreditoForm />} />
          <Route path="*" element={<p>Página no encontrada</p>} />
        </Routes>
      </main>
    </>
  );
}