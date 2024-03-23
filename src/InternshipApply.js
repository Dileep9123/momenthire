import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// AnimatedDiv component for displaying the apply message
const AnimatedDiv = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set isVisible to false after the animation duration
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`down-window ${isVisible ? 'animated' : ''}`} >
      <p className='jobs-title'>Internship</p>
    </div>
  );
};

// Jobs component for the job application form
function Jobs(props) {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [isStudent, setIsStudent] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [internshipData, setInternshipData] = useState("");

 

 
 
  useEffect(() => {
    if (location.state !== null) {
      if (location.state.isLogged === true) {
        setIsLogged(true);
        setUserData(location.state.userData);
        setInternshipData(location.state.intern_id);
        setFormData((prevData) => ({
          ...prevData,
          email: location.state.userData.email,
          intern_id: location.state.intern_id
        }));
        // Store user data in sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(location.state.userData));
      }
    } else {
      // If location.state is not available, try to get user data from sessionStorage
      const storedUserData = sessionStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setIsLogged(true);
        setUserData(parsedUserData);
        setFormData((prevData) => ({
          ...prevData,
          email: parsedUserData.email,

        }));
      }
    }
  }, [location.state]);


  const [formData, setFormData] = useState({
    email: userData.email,
    phonenumber: '',
    intern_id: internshipData,
    graduationYear: '',
    collegeName: '',
    qualification: '',
    branchOfStudy: '',
    resume: '',
    skills: '',
    company: '',
    designation : '',
    experience : '',
    availability:''
  });

  const [validationStatus, setValidationStatus] = useState({
    email: true,
    phonenumber: false,
    graduationYear: false,
    collegeName: false,
    qualification: false,
    branchOfStudy: false,
    availability: false,
    resume: false,
    skills: false,
  });

  const [resume, setResume] = useState({});
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any validation status is false
    const isAnyValidationFalse = Object.values(validationStatus).some((status) => !status);

    if (isAnyValidationFalse) {
      // Show error toast and return if any validation fails
      toast.error("Please check all the fields before submitting");
      return;
    }

    // Convert skills array to a string with semicolon separator

    const fData = new FormData();

    // Append form data
    for (const key in formData) {
      // If the key is 'skills', append the stringified version
      // Otherwise, append the regular value
      fData.append(key,formData[key]);
    }

    // Append resume file
    fData.append('resume', resume);
    

    try {
      const response = await axios.post('http://127.0.0.1:4000/internships', fData);
      console.log(response);

      // Show success toast and redirect after toast is closed
      toast.success(response.data + ". Redirecting to Home Page...", {
        onClose: () => {
          navigate("/internships");
          window.scrollTo(0, 0);
        }
      });
    } catch (error) {
      toast.error(error.response.data);
    }
  };


  // Handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      // Additional validation for phone number, email, and graduation year
      case 'phonenumber':
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

      case 'graduationYear':
        const yearPattern = /^(19|20)\d{2}$/ ;
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: yearPattern.test(value),
        }));
        break;

      case 'experience' : 
        const validNumberRegExp = /^\d+$/;
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: validNumberRegExp.test(value),
        }));
        break;
       case 'availability' :
        const validNumberRegEx = /^\d+$/;
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: validNumberRegEx.test(value),
        }));
        break;
        

      // Default case for other fields
      default:
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: value.length !== 0,
        }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input for resume
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setValidationStatus((prevData) => ({
        ...prevData,
        resume: true,
      }));
      setResume(selectedFile); // Update resume state
    } else {
      setValidationStatus((prevData) => ({
        ...prevData,
        resume: false,
      }));
    }
  };

  const handleClick = (e)=>{

    const person = e.target.value;

    if(person==="student"){
      setIsStudent(true);
      handleButtonClick("left-button")
    }
    else
    {
      setIsStudent(false);
      handleButtonClick("right-button")
    }
    
  }


  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // Log the resume state on change
  useEffect(() => {
    console.log(resume);
  }, [resume]);

  // ... (existing code)

  return (
      <div>
      <AnimatedDiv />
      <section className="jobs">
      <div className='job-info'>
      <i class="fa-solid fa-user fa-2x"></i>
      <h4>Are you a</h4>
      <div>
      <div
          class="btn-group btn-container"
          role="group"
          aria-label="Basic example"
        >
          <button
            className={`left-button ${
              activeButton === "left-button" ? "active" : ""
            }`}
            type="button"
            value="student"
            onClick={handleClick}
          >
            Student
          </button>
          <button
            className={`right-button ${
              activeButton === "right-button" ? "active" : ""
            }`}
            type="button"
            value="employee"
            onClick={handleClick}
          >
            Employee
          </button>
        </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              name='email'
              id='email'
              placeholder='name@example.com'
              value={userData.email}
              disabled
            />
            <label htmlFor='email'>Email*</label>
            {!validationStatus.email ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"Enter valid email"}</p> : <div style={{height:'1.5rem'}}></div>}
          </div>
          </div>
          <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='intern_id'
              name='intern_id'
              placeholder='intern_id'
              value={internshipData}
              disabled
            />
            <label htmlFor='phonenumber'>Internship Id*</label>
          </div>
          </div>
          <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='phonenumber'
              name='phonenumber'
              placeholder='Phone Number'
              onChange={handleChange}
              required
            />
            <label htmlFor='phonenumber'>Phone Number*</label>
            {!validationStatus.phonenumber  &&<p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"Enter valid phonenumber"}</p> }
          </div>
          </div>
          <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='graduationYear'
              name='graduationYear'
              placeholder='Graduation Year'
              onChange={handleChange}
              required
            />
            <label htmlFor='graduationYear'>Graduation Year*</label>
            {!validationStatus.graduationYear ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"Enter valid year"}</p> : <div style={{height:'1.5rem'}}></div>}
          </div>
          </div>

          <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='collegeName'
              name='collegeName'
              placeholder='College Name'
              onChange={handleChange}
              required
            />
            <label htmlFor='collegeName'>Institution*</label>
            {!validationStatus.collegeName ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"cannot be empty"}</p> : <div style={{height:'1.5rem'}}></div>}
          </div>
          </div>

          <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='qualification'
              name='qualification'
              placeholder='Qualification'
              onChange={handleChange}
              required
            />
            <label htmlFor='qualification'>Degree*</label>
            {!validationStatus.qualification ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"cannot be empty"}</p> : <div style={{height:'1.5rem'}}></div>}
          </div>
          </div>

          <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='branchOfStudy'
              name='branchOfStudy'
              placeholder='Branch of Study'
              onChange={handleChange}
              required
            />
            <label htmlFor='branchOfStudy'>Branch of Study*</label>
            {!validationStatus.branchOfStudy ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"cannot be empty"}</p> : <div style={{height:'1.5rem'}}></div>}
          </div>
          </div>

         {!isStudent && <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='company'
              name='company'
              placeholder='company'
              onChange={handleChange}
              required
            />
            <label htmlFor='company'>Company*</label>
            {<div style={{height:'1.5rem'}}></div>}
          </div>
          </div>
         }
          
         {!isStudent && <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='designation'
              name='designation'
              placeholder='desgination'
              onChange={handleChange}
              required
            />
            <label htmlFor='designation'>Designation*</label>
            {<div style={{height:'1.5rem'}}></div>}
          </div>
          </div>
         }
          
         {!isStudent && <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='experience'
              name='experience'
              placeholder='experience'
              onChange={handleChange}
              required
            />
            <label htmlFor='experience'>Experience(in years)*</label>
            {<div style={{height:'1.5rem'}}></div>}
          </div>
          </div>
         }

         <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='availability'
              name='availability'
              placeholder='availabilty'
              onChange={handleChange}
              required
            />
            <label htmlFor='branchOfStudy'>Availability*</label>
            {!validationStatus.availability ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"Enter number of months"}</p> : <div style={{height:'1.5rem'}}></div>}
          </div>
         </div>


          <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='skills'
              name='skills'
              placeholder='skills'
              onChange={handleChange}
              required
            />
            <label htmlFor='branchOfStudy'>Enter your skills separated by comma*</label>
            {!validationStatus.skills ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"cannot be empty"}</p> : <div style={{height:'1.5rem'}}></div>}
          </div>
         </div>

          <div class="col-12 col-lg-4 col-md-6 col-sm-12">
          <div className='form-floating mb-1'>
              <input
                type='file'
                className='form-control'
                id='resume'
                name='resume'
                accept='.pdf'
                style={{ height: '3rem' }} 
                onChange={handleFile}
                required
              />
              <label htmlFor='resume'>
                Resume*
                </label>
                {!validationStatus.resume ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"Please select a pdf file"}</p> : <div style={{height:'1.5rem'}}></div>}
            </div>
          </div>
           
           <div className='col-12 mt-5' style={{textAlign:"center",}}>
           <button type="submit" class="btn btn-dark" style={{borderRadius:'20px'}}>Submit</button>
           </div>

        </div>
      </form>
      </section>
      <ToastContainer position='top-center' autoClose={2000} />
    </div>
  );
}

export default Jobs;
