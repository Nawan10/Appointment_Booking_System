import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [values, setValues] = useState({
    phone: '',
  });

  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        if (res.data.Status === 'Success') {
          localStorage.setItem("userPhone", res.data.user.phone);
          localStorage.setItem("userName", res.data.user.name);
          navigate('/dashboard');
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => {
        console.log(err);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <form onSubmit={login}>
          <h3 className="text-center my-4">Login With Mobile Number</h3>
          <div className="input-group mb-4">
            <span className="input-group-text bg-white">+94</span>
            <div className="form-floating">
              <input
                type="phone"
                id="phone"
                className="form-control"
                name="phone"
                placeholder="7xxxxxxxx"
                onChange={e => setValues({ ...values, phone: e.target.value })}
                required
              />
              <label htmlFor="phone">Mobile Number</label>
            </div>
          </div>
          <button type="submit" className='btn btn-warning w-100 rounded-0'>
            Log In
          </button>
          <div className="text-center">
            <hr className="my-4" />
            <p>Don't have an account? <Link to="/register">Create Account</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
