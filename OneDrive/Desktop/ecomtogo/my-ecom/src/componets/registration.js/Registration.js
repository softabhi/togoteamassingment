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

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   repassword: ""
  // })
  // const [isValid, setIsValid] = useState(true);


  // const [errors, setErrors] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   repassword: ''
  // });


  // const handleChange = (e) => {

  //   const { name, value } = e.target;

  //   setUser({ ...user, [name]: value })

  //   validateInput(name, value);

  // }

  // const validateInput = (name, value) => {
  //   switch (name) {
  //     case 'name':
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         name: value.length < 3 ? 'name must be at least 3 characters' : '',
  //       }));
  //       break;
  //     case 'email':
  //       // You can use a library like validator or regex for email validation
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         email: value.length > 0 && !validateEmail(value) ? 'Invalid email address' : '',
  //       }));
  //       break;
  //     case 'password':
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         password: value.length < 6 ? 'Password must be at least 6 characters' : '',
  //       }));
  //       break;
  //     case 'repassword':
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         repassword: value !== user.password ? 'Passwords do not match' : '',
  //       }));
  //       break
  //     default:
  //     break
  //   }
  // };



  // const validateEmail = () => {
  //   // Regular expression for basic email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   setIsValid(emailRegex.test(user.email));
  // };


  // // const passwordMatch = ()=>{
  // //   setPassMatch(false)
  // // }



  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log("hello")
  //   console.log(user)

  //   const { name, email, password, repassword } = user;

  //   // if (name && email && (password === repassword)) {

  //   if (Object.values(errors).every((error) => error === '')) {
  //     // Perform form submission logic here
  //     // console.log('Form submitted:', user);


  //     console.log("userrr")
  //     try {
  //       const response = await axios.post('http://localhost:8081/register', user);
  //       console.log(response.data);
  //       alert(response.data.message)
  //       // setUser("");

  //     } catch (error) {
  //       console.error('Error registering user:', error.message);
  //     }

  //   }
  //   // }
  //   else {
  //     alert("all field required")
  //   }


  // };



  const [profileImg, setProfileImg] = useState("");
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
    userImg: ''
  });

  console.log(profileImg)

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name
    if (!user.name.trim()) {
      console.log(!user.name.trim())
      newErrors.name = 'name is required';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.trim() || !emailRegex.test(user.email.trim())) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }

    // Validate password
    if (user.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Validate repassword
    if (user.password !== user.repassword) {
      newErrors.repassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    if (validateForm()) {
      // Form submission logic (e.g., sending data to server)
      console.log('Form is valid. Submitting data:', user);
      
      const formData = new FormData();

      const { name, email, password, repassword} = user;

      
      formData.append('name', user.name)
      formData.append('email', user.email)
      formData.append('password', user.password)
      formData.append('repassword', user.repassword)
      formData.append('userImg', profileImg)

      console.log(formData)

      try {
        const response = await axios.post('http://localhost:8081/api/v1/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        alert(response.data.message)
        setUser({
          name: '',
          email: '',
          password: '',
          repassword: '',
          userImg: ''
        });

      } catch (error) {
        console.error('Error registering user:', error.message);
      }



    } else {
      console.log('Form is invalid. Please fix errors.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                <MDBInput label='Your Email' id='form2' type='email' name='email' value={user.email} onChange={handleChange} />

              </div>
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              {/* {!isValid && <p style={{ color: 'red' }}>Invalid email address</p>} */}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Password' id='form3' type='password' name='password' value={user.password} onChange={handleChange} />
              </div>
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}


              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg' />
                <MDBInput label='Repeat your password' id='form4' type='repassword' name='repassword' value={user.repassword} onChange={handleChange} />
              </div>
              {errors.repassword && <p style={{ color: 'red' }}>{errors.repassword}</p>}


              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg' />
                <MDBInput label='Upload Image' id='form4' type='file' name='userImg' onChange={(e) => setProfileImg(e.target.files[0])} />
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