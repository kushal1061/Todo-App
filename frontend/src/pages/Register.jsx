import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-paper">
      <div className="w-full max-w-md paper-panel p-8 md:p-12 relative overflow-hidden">
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-ink/10 bg-paper-dark transform translate-x-8 -translate-y-8 rotate-45"></div>

        <div className="mb-10 text-center relative z-10">
          <h1 className="text-3xl mb-2">Create Account</h1>
          <p className="font-dm text-sm text-ink-light border-b border-ink/20 inline-block pb-1">Join to manage your tasks</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-accent-terracotta/10 border-l-4 border-accent-terracotta text-accent-terracotta font-dm text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
          <div className="flex flex-col">
            <label className="font-syne font-bold text-xs uppercase tracking-wider mb-1" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="paper-input"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="paper-btn bg-ink text-paper mt-6 hover:bg-ink-light"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-ink/10 text-center font-dm text-sm relative z-10">
          <span className="text-ink-light">Already have an account? </span>
          <Link to="/login" className="font-bold underline decoration-accent-green decoration-2 underline-offset-4 hover:text-accent-green transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
