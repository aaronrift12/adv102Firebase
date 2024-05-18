import React, { useState, useEffect } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import firebase from './firebaseConfig';

const Signup = () => {
  useEffect(() => {
    // Add a class to the body element to target signup page
    document.body.classList.add('signup-page');

    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('signup-page');
    };
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, pass);
      if (user) {
        setLoading(false);
        setMessage("Account Created Successfully");
        navigate('/login');
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };

  return (
    <>
      <div className='main_container_signup'>
        <div className='header'>
          <h2>Signup</h2>
        </div>
        <form onSubmit={submit}>
          <div className='box'>
            <input 
              type='text' 
              value={name} 
              placeholder='Name' 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
          <p>Already Have an Account? <Link to="/login">Login Now</Link></p>
          <button type='submit' disabled={loading} className="signup-button">
            {loading ? <div className="loading-spinner"></div> : 'SignUp'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default Signup;
  