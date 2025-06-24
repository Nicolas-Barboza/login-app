// src/DashboardPage.jsx
import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    // Centramos el contenido vertical y horizontalmente
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="p-4 shadow-lg text-center border-0 rounded-3" style={{ width: '30rem' }}> {/* Aumentamos sombra y ancho */}
        <Card.Body>
          <h2 className="mb-4 text-success">¡Bienvenido al Dashboard!</h2> {/* Título verde */}
          <p className="lead">Has iniciado sesión exitosamente.</p> {/* Texto más prominente */}
          <Button variant="danger" onClick={handleLogout} className="mt-3"> {/* Más margen arriba */}
            Cerrar Sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardPage;