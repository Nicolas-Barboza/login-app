import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Estado para saber si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para intentar iniciar sesión
  const login = async (username, password) => { // ¡CAMBIADO A ASYNC!
    try {
      const response = await fetch('http://localhost:9090/api/login.php', { // <-- URL de tu API PHP para LOGIN
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Espera la respuesta JSON de PHP

      if (response.ok && data.success) { // Si el PHP devuelve { success: true }
        setIsAuthenticated(true);
        return true; // Login exitoso
      } else {
        console.error('Login fallido desde el backend:', data.message || 'Error desconocido del servidor.');
        setIsAuthenticated(false);
        return false; // Login fallido
      }
    } catch (error) {
      console.error('Error de red o al conectar con la API PHP:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  // Función para simular el logout (puedes expandirla para llamar a una API)
  const logout = () => {
    setIsAuthenticated(false);
    // Aquí podrías llamar a un endpoint PHP para invalidar la sesión en el servidor
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};