import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

  const [name,setName] = useState([])
  const [email,setEmail] = useState([])
  const [phone,setPhone] = useState([])
  const [gender,setGender] = useState([])
  const [password,setPassword] = useState([])

  const navigate = useNavigate()

  function register(event){
    event.preventDefault()
    axios.post('http://localhost:8081/register',{name,email,phone,gender,password})
    .then(res=>{
      navigate('/login')
    }).catch(err=>console.log(err))
  }



  return (
    <div className="d-flex justify-content-center align-items-center bg-white" style={{ minHeight: "100vh", paddingTop: "80px" }}>
      <div className="d-flex justify-content-center align-items-center vh-90">
        <form action='' onSubmit={register}>
          <h3 className="text-center my-4">Create an Account</h3>

          <div className="form-floating mb-4">
            <input type="text" id="name-input" className="form-control" name="name" pattern="[A-Za-z ]+" placeholder="First Name & Last Name" onChange={e =>setName(e.target.value)} required/>
            <label htmlFor="name-input">First Name & Last Name</label>
          </div>

          <div className="form-floating mb-4">
            <input type="email" id="email-input" className="form-control" name="email" placeholder="Email address" onChange={e =>setEmail(e.target.value)} required/>
            <label htmlFor="email-input">Email address</label>
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text bg-white">+94</span>
            <div className="form-floating">
              <input type="tel" id="phone" className="form-control" name="phone" placeholder="7xxxxxxxx" onChange={e =>setPhone(e.target.value)} required/>
              <label htmlFor="phone">Mobile Number</label>
            </div>
            <button type="button" className="input-group-text btn btn-dark" >
              {/* {otpSent ? "OTP Sent" : "Verify"} */}
            </button>
          </div>
          {/* {errors.phone && <span className="text-danger small">{errors.phone}</span>} */}

          <div className="border rounded px-3 p-2 mb-4">
            <label className="form-label">Gender</label>
            <div className="form-group">
              <input type="radio" name="gender" value="male" id="g-male" onChange={e =>setGender(e.target.value)}  required/>
              <label htmlFor="g-male" className="me-2">Male</label>
              <input type="radio" name="gender" value="female" id="g-female" onChange={e =>setGender(e.target.value)} required/>
              <label htmlFor="g-female">Female</label>
            </div>
          </div>

          <div className="form-floating mb-4">
            <input type="password" id="password-input" name="password" className="form-control" placeholder="Password" onChange={e =>setPassword(e.target.value)} required/>
            <label htmlFor="password-input">Password</label>
          </div>

          <input type="hidden" name="otp" id="register-otp" />

          <div className="d-grid">
            <button type="submit" className="btn btn-warning w-100 rounded-0">
              Create Account
            </button>
            <p className="small text-muted">* By signing up, you agree to our terms and conditions.</p>
            <div className="text-center">
              <hr className="my-4" />
              <p>Already have an account? <a href="./Login">Login</a></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
