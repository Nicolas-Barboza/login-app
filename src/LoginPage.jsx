import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Ya no se usa 'login' aquí, solo la navegación
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './LoginSignupCard.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Nuevo estado para mensaje de éxito
  const navigate = useNavigate();
  // const { login } = useAuth(); // No necesitamos el login aquí para el registro

  const handleSubmit = async (event) => { // ¡CAMBIADO A ASYNC!
    event.preventDefault();
    setError('');
    setSuccessMessage(''); // Limpiar mensajes previos

    if (!username || !email || !password || !agreeTerms) {
      setError('Por favor, completa todos los campos y acepta los términos.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, ingresa un email válido.');
      return;
    }
    if (password.length < 3) { // MySQL no tiene hash, asi que no hay un minimo real, pero es buena práctica
      setError('La contraseña debe tener al menos 3 caracteres.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/api/register.php', { // <-- URL de tu API PHP para REGISTRO
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message); // Muestra mensaje de éxito
        // Puedes redirigir a la página de login después de un registro exitoso
        setTimeout(() => {
            navigate('/');
        }, 2000); // Redirige después de 2 segundos para que el usuario vea el mensaje
      } else {
        setError(data.message || 'Hubo un problema al crear la cuenta. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error de red o al conectar con la API PHP para registro:', error);
      setError('No se pudo conectar con el servidor. Intenta de nuevo más tarde.');
    }
  };

  const handleSignInClick = () => {
    navigate('/'); // Navega a la página de login (que ahora es la raíz)
  };

  return (
    <div className="login-card-container">
      <Card className="login-signup-card">
        <div className="form-panel">
          <h2 className="mb-4">Crear nueva cuenta</h2>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>} {/* Muestra mensaje de éxito */}

          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group className="input-icon-group">
              <span className="input-group-text"><FaUser /></span>
              <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </Form.Group>

            <Form.Group className="input-icon-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="input-icon-group">
              <span className="input-group-text"><FaLock /></span>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3 form-check">
              <Form.Check
                type="checkbox"
                label={<span>I read and agree to <a href="#terms" className="text-decoration-none text-primary">Terms and Conditions</a></span>}
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 action-btn">
              CREATE ACCOUNT
            </Button>
          </Form>
        </div>
        <div className="welcome-panel">
          <h3>¡Únete a nuestra comunidad!</h3>
          <p>
            Regístrate para descubrir un mundo de posibilidades, conectar con otros usuarios y acceder a contenido exclusivo.
          </p>
          <Button variant="outline-light" onClick={handleSignInClick}>
            ¿Ya tienes cuenta? Inicia Sesión
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;