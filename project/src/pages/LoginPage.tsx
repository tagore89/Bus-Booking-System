import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Bus } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, authState, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to home
  const from = (location.state as any)?.from?.pathname || '/';
  
  useEffect(() => {
    // If user is already authenticated, redirect
    if (authState.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [authState.isAuthenticated, navigate, from]);
  
  useEffect(() => {
    // Display auth error if any
    if (authState.error) {
      setError(authState.error);
    }
  }, [authState.error]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
      // Redirect handled by the first useEffect
    } catch (err) {
      // Error handled by the second useEffect
    }
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center">
            <Bus size={32} className="text-primary-500" />
            <span className="ml-2 text-2xl font-bold text-gray-800">TravelEase</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to access your account</p>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          
          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-primary-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary-500 hover:text-primary-600">
              Forgot password?
            </a>
          </div>
          
          <Button 
            type="submit" 
            variant="primary"
            isLoading={loading} 
            fullWidth
          >
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-500 hover:text-primary-600 font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;