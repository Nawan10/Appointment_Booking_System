import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Adminlogin() {
  const [values, setValues] = useState({
    phone: '',
    password: '', // Added password field
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const login = (event) => {
    event.preventDefault();

    // Directly check the password locally (without checking with the backend)
    if (values.password === 'Admin@123') {
      // If password is correct, navigate to the admin dashboard
      localStorage.setItem("userName", "Admin");  // You can set a default name or use the phone
      navigate('/admindashboard');
    } else {
      // If password is incorrect, show error
      alert('Only authorized people can log in to the system.');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <form onSubmit={login}>
          <h3 className="text-center my-4">Admin Login</h3>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className='btn btn-warning w-100 rounded-0'>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adminlogin;
