import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { iniciarSesion, obtenerPerfil, registrar } from '../services/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token')));

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) return undefined;

    let active = true;
    obtenerPerfil()
      .then((profile) => {
        if (active) setUser(profile);
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const guardarSesion = async ({ token, user: authenticatedUser }) => {
    if (!token) throw new Error('La API no devolvió un token de acceso.');

    localStorage.setItem('token', token);
    try {
      setUser(authenticatedUser || await obtenerPerfil());
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      throw error;
    }
  };

  const login = async (email, password) => {
    await guardarSesion(await iniciarSesion(email, password));
  };

  const register = async (datos) => {
    const respuesta = await registrar(datos);
    if (respuesta.token) {
      await guardarSesion(respuesta);
      return;
    }

    await login(datos.email, datos.password);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


//lo que hace este componente es proporcionar 
// un contexto de autenticación a la aplicación,
//  permitiendo que los componentes hijos accedan a la información del usuario autenticado, al estado de carga y a las funciones de inicio de sesión, registro y cierre de sesión. Además, maneja la persistencia del token de autenticación en el almacenamiento local y la recuperación del perfil del usuario al cargar la aplicación.