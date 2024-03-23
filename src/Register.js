import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  // Access the navigate function from useNavigate
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male', // Default gender value
    password: '',
    passwordCheck: '',
  });

  const [validationStatus, setValidationStatus] = useState({
    fName: false,
    lName: true,
    email: false,
    phone: false,
    dob: false,
    gender: false, // Default gender value
    password: false,
    passwordCheck: false,
  });

  // Handle input changes and update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      // Additional validation for phone number and email
      case 'phone':
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: value.length === 10 && /^\d+$/.test(value),
        }));
        break;

      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: emailPattern.test(value),
        }));
        break;

      case 'dob' :
        const dateOfBirth = new Date(value);
        const currentDate = new Date();
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: !isNaN(dateOfBirth.getTime()) && dateOfBirth <= currentDate // Check if the date instance is a valid date and not in the future
        }));
        break;
      
        case 'password':
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: value.length>=6,
          passwordCheck: formData.passwordCheck === value
        }));
        break;

        case 'passwordCheck':
          setValidationStatus((prevData) => ({
            ...prevData,
            [name]: value === formData.password,
          }));
          break;

      

      // Default case for other fields
      default:
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: value.length !== 0,
        }));
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    const isAnyValidationFalse = Object.values(validationStatus).some((status) => !status);

    if (isAnyValidationFalse) {
      // Show error toast and return if any validation fails
      toast.error("Please check all the fields before submitting");
      return;
    }

    try {
      // Send registration request to the server
      console.log(formData);
      const response = await axios.post('http://127.0.0.1:4000/register', formData);
       console.log(response);
      // Check if the response indicates successful registration
        // Redirect to the home page with user information as state
        const userData = {...formData,full_name:formData.fName+ " "+formData.lName};
        toast.success("Registration Successfull. Redirecting to Home Page...", {
          onClose: () => {
            navigate("/",{state:{userData,isLogged:true}})
            window.scrollTo(0, 0);
          }
        });
       
    } catch (error) {
      
      console.error('Error during registration:', error);
      toast.error(error.response.data);
    }
  };

  return (
    <div>
    <div className='login'>
      <div className='login-side-screen'>
        <h4 className='mt-4 mb-5 ms-5'>MomentHire</h4>
        <img src='jobs_login.webp' alt='jobs login' height={250} width={250} />
      </div>
      <div className='signup-form'>
        <main className="form-signin w-100 m-auto">
          <form>
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
            <div className="row  g-3">
              <div className="col">
                <div className="form-floating">
                  <input type="text" name='fName' className="form-control" id="fullname" placeholder="First Name" onChange={handleInputChange} required />
                  <label htmlFor="fullname">First Name*</label>
                  {!validationStatus.fName ? <p className="text-danger pt-1" style={{margin:'0 0 0 1rem',fontSize:'0.8rem'}}>{"cannot be empty"}</p> : <div style={{height:'1rem'}}></div>}
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input type="text" name='lName' className="form-control" id="lastname" placeholder="Last Name" onChange={handleInputChange} />
                  <label htmlFor="lastname">Last Name*</label>
                </div>
              </div>
            </div>
            <div className="form-floating mt-1">
              <input type="email" name='email' className="form-control" id="email" placeholder="name@example.com" onChange={handleInputChange}  required/>
              <label htmlFor="email">Email address*</label>
              {!validationStatus.email ? <p className="text-danger pt-1" style={{margin:'0 0 0 1rem',fontSize:'0.8rem'}}>{"Enter valid email"}</p> : <div style={{height:'1rem'}}></div>}
            </div>
            <div className="form-floating mt-1">
              <input type="tel" name='phone' className="form-control" id="phonenumber" placeholder="Phone Number" onChange={handleInputChange}  required/>
              <label htmlFor="phonenumber">Phone Number*</label>
              {!validationStatus.phone ? <p className="text-danger pt-1" style={{margin:'0 0 0 1rem',fontSize:'0.8rem'}}>{"Enter valid phone number"}</p> : <div style={{height:'1rem'}}></div>}
            </div>
            <div className="form-floating mt-1">
              <input type="date" name='dob' className="form-control" id="dob" placeholder="Date of Birth" onChange={handleInputChange} required/>
              <label htmlFor="dob">Date of Birth*</label>
              {!validationStatus.dob ? <p className="text-danger pt-1" style={{margin:'0 0 0 1rem',fontSize:'0.8rem'}}>{"Enter valid date of birth"}</p> : <div style={{height:'1rem'}}></div>}
            </div>
            <div className="form-floating mt-1">
              <select name='gender' className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={handleInputChange} required>
                <option selected>Open this select menu</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Other">Prefer Not To Say</option>
              </select>
              <label htmlFor="floatingSelect">Gender*</label>
              {!validationStatus.gender ? <p className="text-danger pt-1" style={{margin:'0 0 0 1rem',fontSize:'0.8rem'}}>{"cannot be empty"}</p> : <div style={{height:'1rem'}}></div>}
            </div>
            <div className="row mb-3 g-3">
              <div className="col">
                <div className="form-floating">
                  <input type="password" name='password' className="form-control" id="password" placeholder="Password" onChange={handleInputChange} required/>
                  <label htmlFor="password">Password*</label>
                  {!validationStatus.password ? <p className="text-danger pt-1" style={{margin:'0 0 0 1rem',fontSize:'0.8rem'}}>{"should be 6 characters long"}</p> : <div style={{height:'1rem'}}></div>}
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input type="password" name='passwordCheck' className="form-control" id="passwordcheck" placeholder="Re-Enter Password" onChange={handleInputChange} required/>
                  <label htmlFor="passwordcheck">Re-Enter Password*</label>
                  {!validationStatus.passwordCheck ? <p className="text-danger pt-1" style={{margin:'0 0 0 1rem',fontSize:'0.8rem'}}>{"Password check is Invalid"}</p> : <div style={{height:'1rem'}}></div>}
                </div>
              </div>
            </div>
            <button className="btn mt-4 btn-primary w-100 py-2" type="submit" onClick={handleSignUp}>
              Sign up
            </button>
            <p className="mt-5 mb-3 text-body-secondary">Already Registered? - <Link to='/login'><a>Sign in</a></Link></p>
            <p className="mt-5 mb-3 text-body-secondary">© moment hire</p>
          </form>
        </main>
      </div>
    </div>
    <ToastContainer position='top-center' autoClose={2000} />
  </div>
  );
}

export default Register;
