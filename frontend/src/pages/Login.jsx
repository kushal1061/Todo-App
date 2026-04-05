import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-paper">
      <div className="w-full max-w-md paper-panel p-8 md:p-12">
        <div className="mb-10 text-center">
          <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-syne font-bold text-3xl rounded-sm mx-auto mb-4 origin-center -rotate-3">
            T
          </div>
          <h1 className="text-3xl mb-2">Welcome Back</h1>
          <p className="font-dm text-sm text-ink-light border-b border-ink/20 inline-block pb-1">Please sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-accent-terracotta/10 border-l-4 border-accent-terracotta text-accent-terracotta font-dm text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="font-syne font-bold text-xs uppercase tracking-wider mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="paper-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-syne font-bold text-xs uppercase tracking-wider mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="paper-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="paper-btn paper-btn-primary mt-4"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-ink/10 text-center font-dm text-sm">
          <span className="text-ink-light">Don't have an account? </span>
          <Link to="/register" className="font-bold underline decoration-accent-orange decoration-2 underline-offset-4 hover:text-accent-orange transition-colors">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
