import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

//lo que hace este componente es crear un contexto de 
// autenticación para la aplicación,
//  permitiendo que los componentes hijos accedan a la información del usuario autenticado y al estado de carga. El hook useAuth se utiliza para acceder a este contexto desde cualquier componente que lo necesite.