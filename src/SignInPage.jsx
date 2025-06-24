import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';
import './LoginSignupCard.css';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = (event) => {
    event.preventDefault();

    setError('');

    if (!username || !password) {
      setError('Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate('/dashboard'); // Redirige al dashboard si el login es exitoso
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  const handleCreateAccountClick = () => {
    navigate('/create-account'); // Navega a la página de creación de cuenta
  };

  return (
    <div className="login-card-container">
      <Card className="login-signup-card">
        <div className="form-panel">
          <h2 className="mb-4">Iniciar Sesión</h2>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          <Form onSubmit={handleSignIn} className="w-100">
            <Form.Group className="input-icon-group">
              <span className="input-group-text"><FaUser /></span>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="input-icon-group">
              <span className="input-group-text"><FaLock /></span>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 action-btn mb-3"> 
              INGRESAR
            </Button>

            <Button
              variant="outline-primary"
              onClick={handleCreateAccountClick}
              className="w-100 secondary-action-btn" 
            >
              CREAR CUENTA
            </Button>
          </Form>
        </div>
        <div className="welcome-panel">
          <h3>¡Bienvenido de nuevo!</h3>
          <p>
            Inicia sesión para acceder a tu cuenta y explorar todas las funcionalidades que tenemos para ti.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default SignInPage;