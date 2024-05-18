// src/Login.js

import React, { useState, useEffect } from 'react';
import './login.css'; // Assuming you have a login.css file for styling
import { Link, useNavigate } from 'react-router-dom';
import firebase from './firebaseConfig';

const Login = () => {
  useEffect(() => {
    // Add a class to the body element to target login page
    document.body.classList.add('login-page');

    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, pass);
      const user = userCredential.user;
      if (user) {
        setLoading(false);
        // Redirect or navigate to next page
        navigate('/homepage');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className='main_container_signup'>
      <div className='header'>
        <h2>Log In</h2>
      </div>
      <form onSubmit={submit}>
        <div className='box'>
          <input
            type='email'
            value={email}
            placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='box'>
          <input
            type='password'
            value={pass}
            placeholder='Password'
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <p>Don't Have an Account? <Link to='/'>Create Account</Link></p>
        <button type='submit' disabled={loading} className="login-button">
          {loading ? <div className="loading-spinner"></div> : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
