import './login.css'
import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios';

const Login = ({ setLogedUser }) => {


  const [userLogin, setUserLogin] = useState(
    {
      email: "",
      password: ""
    }
  );

  const navigate = useNavigate();


  const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
  }

  console.log(userLogin)


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/login', userLogin);
      localStorage.setItem('token', response.data.token);
      console.log(response.data.results);
      setLogedUser(response.data.results);
      alert("Login Successfully")
      navigate('/')
      // Handle successful login (e.g., redirect to dashboard)

    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle login failure (e.g., show error message)
    }
  };


  return (
    <>
      <Navbar />
      <div className='container my-5 main'>

        <div><h3>Login User</h3></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={userLogin.email} onChange={handleChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={userLogin.password} onChange={handleChange} />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div className='my-5'>
          <Link to='/registration'>
            <h3>New User Register Here</h3>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login


