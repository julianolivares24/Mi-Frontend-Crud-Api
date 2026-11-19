import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(form.email, form.password);
      navigate('/productos', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.errors?.email?.[0]
          || err.response?.data?.errors?.password?.[0]
          || err.response?.data?.message
          || err.message
          || 'No se pudo iniciar sesión'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Iniciar sesión</h1>
      {error && <p role="alert">{error}</p>}
      <p>
        <label>
          Correo electrónico
          <br />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            autoComplete="username"
            required
          />
        </label>
      </p>
      <p>
        <label>
          Contraseña
          <br />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            autoComplete="current-password"
            required
          />
        </label>
      </p>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Ingresando...' : 'Ingresar'}
      </button>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </form>
  );
}
