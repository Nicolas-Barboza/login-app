import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './LoginSignupCard.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Usamos login para simular el registro

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!username || !email || !password || !agreeTerms) {
      setError('Por favor, completa todos los campos y acepta los términos.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, ingresa un email válido.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Aquí, en un escenario real, harías una llamada a tu API para registrar el usuario.
    // Por simplicidad, simulamos un login exitoso después de un "registro" válido.
    const registrationSuccess = login(username, password); // Simula que el registro te loguea automáticamente
    if (registrationSuccess) {
      navigate('/dashboard'); // Redirige al dashboard
    } else {
      setError('Hubo un problema al crear la cuenta. Intenta de nuevo.');
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