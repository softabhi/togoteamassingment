import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';

function Registration() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repassword: ""
  })
  const [isValid, setIsValid] = useState(true);
  const [passMatch, setPassMatch] = useState(true)

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    repassword: ''
  });


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })

    validateInput(e.target.name, e.target.value);

  }

  const validateInput = (name, value) => {
    switch (name) {
      case 'name':
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: value.length < 3 ? 'name must be at least 3 characters' : '',
        }));
        break;
      case 'email':
        // You can use a library like validator or regex for email validation
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: value.length > 0 && !validateEmail(value) ? 'Invalid email address' : '',
        }));
        break;
      case 'password':
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: value.length < 6 ? 'Password must be at least 6 characters' : '',
        }));
        break;
      case 'repassword':
        setErrors((prevErrors) => ({
          ...prevErrors,
          repassword: value !== user.password ? 'Passwords do not match' : '',
        }));
        break
      default:
        break;
    }
  };



  const validateEmail = () => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(user.email));
  };


  // const passwordMatch = ()=>{
  //   setPassMatch(false)
  // }



  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, repassword } = user;

    if (name && email && (password === repassword)) {





      if (Object.values(errors).every((error) => error === '')) {
        // Perform form submission logic here
        // console.log('Form submitted:', user);



        try {
          const response = await axios.post('http://localhost:8081/register', user);
          console.log(response.data);
          alert(response.data.message)
          // setUser("");

        } catch (error) {
          console.error('Error registering user:', error.message);
        }

      }
    } else {
      alert("all field required")
    }


  };


  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Your Name' id='form1' type='text' className='w-100' name='name' value={user.name} onChange={handleChange} />
              </div>
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}


              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Your Email' id='form2' type='email' name='email' value={user.email} onChange={handleChange} onBlur={validateEmail} />

              </div>
              {!isValid && <p style={{ color: 'red' }}>Invalid email address</p>}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Password' id='form3' type='password' name='password' value={user.password} onChange={handleChange} />
              </div>
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}


              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg' />
                <MDBInput label='Repeat your password' id='form4' type='password' name='repassword' value={user.repassword} onChange={handleChange} />
              </div>
              {errors.repassword && <p style={{ color: 'red' }}>{errors.repassword}</p>}


              <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Registration;