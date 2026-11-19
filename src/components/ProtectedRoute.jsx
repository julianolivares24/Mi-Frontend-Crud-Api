import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

//lo que hace este componente es proteger las rutas de la aplicación,
//  verificando si el usuario está autenticado. Si el usuario está autenticado, se renderiza el componente hijo (Outlet), de lo contrario, se redirige al usuario a la página de inicio de sesión ("/login"). Además, mientras se está cargando la información del usuario, se muestra un mensaje de "Cargando...".