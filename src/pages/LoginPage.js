import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;