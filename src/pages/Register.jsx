import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password !== form.password_confirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setSubmitting(true);
    try {
      await register(form);
      navigate('/productos', { replace: true });
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(
        errors?.name?.[0]
          || errors?.email?.[0]
          || errors?.password?.[0]
          || err.response?.data?.message
          || err.message
          || 'No se pudo completar el registro'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Crear cuenta</h1>
      {error && <p role="alert">{error}</p>}
      <p>
        <label>
          Nombre
          <br />
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            autoComplete="name"
            required
          />
        </label>
      </p>
      <p>
        <label>
          Correo electrónico
          <br />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
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
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
      </p>
      <p>
        <label>
          Confirmar contraseña
          <br />
          <input
            name="password_confirmation"
            type="password"
            value={form.password_confirmation}
            onChange={onChange}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
      </p>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Registrando...' : 'Registrarme'}
      </button>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </form>
  );
}
