import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductosList from './pages/ProductosList';
import ProductoForm from './pages/ProductoForm';
import ClientesList from './pages/ClientesList';
import ClienteForm from './pages/ClienteForm';
import CreditosList from './pages/CreditosList';
import CreditoForm from './pages/CreditoForm';

function AppContent() {
  const { user, loading, logout } = useAuth();

  return (
    <>
      {user && (
        <nav style={{ display: 'flex', gap: 16, padding: 16 }}>
          <Link to="/productos">Productos</Link>
          <Link to="/productos/nuevo">Nuevo producto</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/clientes/nuevo">Nuevo cliente</Link>
          <Link to="/creditos">Créditos</Link>
          <Link to="/creditos/nuevo">Nuevo crédito</Link>
          <button type="button" onClick={logout}>Cerrar sesión</button>
        </nav>
      )}
      <main style={{ padding: 16 }}>
        <Routes>
          <Route
            path="/login"
            element={
              loading ? <p>Cargando...</p> : user ? <Navigate to="/productos" replace /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              loading ? <p>Cargando...</p> : user ? <Navigate to="/productos" replace /> : <Register />
            }
          />
          <Route element={<ProtectedRoute />}>
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
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}