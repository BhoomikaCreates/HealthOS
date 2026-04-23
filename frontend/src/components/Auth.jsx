import React, { useState } from 'react';
import { Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react';

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const url = `https://healthos-6tad.onrender.com${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        onLoginSuccess();
      } else {
        setError(data.error || 'Something went wrong, machha!');
      }
    } catch (err) {
      setError('Backend is asleep or connection refused. Wake it up!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute -right-16 bottom-0 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl"></div>

      <div className="bg-slate-900/95 border border-teal-500/10 p-8 rounded-[2.5rem] w-full max-w-md relative z-10 shadow-[0_40px_120px_-70px_rgba(14,165,233,0.35)]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/70 rounded-full mb-4">
            <Sparkles className="text-teal-400" size={18} />
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Premium UI</span>
          </div>
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2 mb-2">
            HealthOS
          </h1>
          <p className="text-slate-400">
            {isLogin ? 'Welcome back, guru!' : 'Start your wellness journey today.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-2xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-slate-500" size={20} />
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-3xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-slate-500" size={20} />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-3xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-slate-500" size={20} />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-3xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 text-slate-950 font-bold py-3 rounded-3xl flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="mt-6 text-center text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-cyan-300 hover:text-cyan-200 font-semibold"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;