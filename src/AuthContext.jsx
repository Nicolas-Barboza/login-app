import React, { createContext, useState, useContext } from 'react';

// 1. Crea el contexto
const AuthContext = createContext(null);

// 2. Crea un proveedor para el contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para simular el login
  const login = (username, password) => {
    // Aquí iría tu lógica de autenticación real (ej. llamada a una API)
    // Por ahora, simulamos credenciales válidas
    if (username === 'usuario' && password === 'contraseña') {
      setIsAuthenticated(true);
      return true; // Login exitoso
    }
    setIsAuthenticated(false);
    return false; // Login fallido
  };

  // Función para simular el logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};