import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className={`down-window ${isVisible ? 'animated' : ''}`}>
      <p className='jobs-title'>Apply for an Internship here</p>
    </div>
  );
};


function Internships(props) {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (location.state !== null) {
      if (location.state.isLogged === true) {
        setIsLogged(true);
        setUserData(location.state.userData);
        setFormData((prevData) => ({
          ...prevData,
          email: location.state.userData.email,
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
    email: '',
    phonenumber: '',
    graduationYear: '',
    collegeName: '',
    qualification: '',
    branchOfStudy: '',
    resume: '',
    availability: '',
    skills: [""],
  });


  const [validationStatus, setValidationStatus] = useState({
    email: true,
    phonenumber: false,
    graduationYear: false,
    collegeName: false,
    qualification: false,
    branchOfStudy: false,
    resume: false,
    availability : false,
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
    const skillsString = formData.skills.join(';');

    const fData = new FormData();

    // Append form data
    for (const key in formData) {
      // If the key is 'skills', append the stringified version
      // Otherwise, append the regular value
      fData.append(key, key === 'skills' ? skillsString : formData[key]);
    }

    // Append resume file
    fData.append('resume', resume);

    try {
      const response = await axios.post('http://127.0.0.1:4000/internships', fData);
      console.log(response);

      // Show success toast and redirect after toast is closed
      toast.success(response.data + ". Redirecting to Home Page...", {
        onClose: () => {
          navigate("/");
          window.scrollTo(0, 0);
        }
      });
    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error(error.response.data);
    }
  };

  // Handle changes in the skills input fields
  const handleSkillChange = (index, value) => {
    setFormData((prevData) => {
      const newSkills = [...prevData.skills];
      newSkills[index] = value;
      return { ...prevData, skills: newSkills };
    });
  };

  // Add a new empty skill input field
  const handleAddSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ''],
    }));
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
        const yearPattern = /^\d{4}$/;
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: yearPattern.test(value),
        }));
        break;

      case 'availability' :
        const validNumberRegExp = /^\d+$/;
        setValidationStatus((prevData) => ({
          ...prevData,
          [name]: validNumberRegExp.test(value),
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

  // Log the resume state on change
  useEffect(() => {
    console.log(resume);
  }, [resume]);

  return (
    <div>
    <AnimatedDiv />
    <div className='jobs'>
      <div className='container pt-1 pb-5 h-100'>
        <div className='row justify-content-center align-items-center h-100'>
          <div className='col-12 col-lg-9 col-xl-7'>
            <div className='card-body bg-jobs'>
              <div className='jobs-header'>
                <h1 className='jobs-title'>Internships</h1>
              </div>
              <div className='card-body px-5 pt-2 pb-5 bg-register'>
                <form onSubmit={handleSubmit}>
                  {/* Email and Phone Number */}
                  <div className='row pt-4'>
                    <div className='col-md-6 mb-1'>
                      <div className='form-floating'>
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
                    <div className='col-md-6 mb-1'>
                      <div className='form-floating'>
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
                        {!validationStatus.phonenumber ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"Enter valid phonenumber"}</p> : <div style={{height:'1.5rem'}}></div>}
                      </div>
                      
                    </div>
                  </div>

                  {/* Graduation Details */}
                  <div className='row'>
                    <div className='col-md-6 mb-1'>
                      <div className='form-floating'>
                        <input
                          type='text'
                          className='form-control'
                          id='graduationYear'
                          name='graduationYear'
                          placeholder='Graduation Year'
                          onChange={handleChange}
                          requiured
                        />
                        <label htmlFor='graduationYear'>Graduation Year*</label>
                        {!validationStatus.graduationYear ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"Enter valid year"}</p> : <div style={{height:'1.5rem'}}></div>}
                      </div>
                    </div>
                      <div className='col-md-6 mb-1'>
                        <div className='form-floating'>
                          <input
                            type='text'
                            className='form-control'
                            id='availability'
                            name='availability'
                            placeholder='Availabilty'
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor='collegeName'>Availability in Months</label>
                          {!validationStatus.availability ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"Enter number of months"}</p> : <div style={{height:'1.5rem'}}></div>}
                        </div>
                      </div>
                    </div>

                    {/* Qualification and Branch of Study */}
                    <div className='row'>
                      <div className='col-md-6 mb-1'>
                        <div className='form-floating'>
                          <input
                            type='text'
                            className='form-control'
                            id='qualification'
                            name='qualification'
                            placeholder='Qualification'
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor='qualification'>Qualification*</label>
                          {!validationStatus.qualification ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"cannot be empty"}</p> : <div style={{height:'1.5rem'}}></div>}
                        </div>
                      </div>
                      <div className='col-md-6 mb-1'>
                        <div className='form-floating'>
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
                    </div>

                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='form-floating'  style={{marginTop:"1rem"}}>
                          <input
                            type='text'
                            className='form-control'
                            id='collegeName'
                            name='collegeName'
                            placeholder='College Name'
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor='qualification'>College Name</label>
                          {!validationStatus.collegeName ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"cannot be empty"}</p> : <div style={{height:'1.5rem'}}></div>}
                        </div>
                      </div>
                      
                    </div>

                    {/* Resume */}
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='form-floating' style={{marginTop:"1rem"}}>
                          <input
                            type='file'
                            className='form-control'
                            id='resume'
                            name='resume'
                            accept='.pdf'
                            style={{ height: '4rem' }} 
                            onChange={handleFile}
                            required
                          />
                          <label htmlFor='resume'>
                            Resume
                           </label>
                           {!validationStatus.resume ? <p className="text-danger" style={{margin:'0 0 0 1rem'}}>{"Please select a pdf file"}</p> : <div style={{height:'1.5rem'}}></div>}
                        </div>
                        
                      </div>
                    </div>



                    
                    {/* Skills */}
                    <div className='row'>
                    <div className='col-md-12 mb-4'>
                        <div>
                        {formData.skills.map((skill, index) => (
                            <div key={index} className='form-floating mb-3' style={{marginTop:"1rem"}}>
                            <input
                                type='text'
                                className='form-control'
                                id={`skill${index}`}
                                name={`skill${index}`}
                                placeholder='Skill'
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                            />
                            <label htmlFor={`skill${index}`}>Skill {index + 1}</label>
                            </div>
                        ))}
                        </div>
                        <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={handleAddSkill}
                        >
                        Add Skill
                        </button>
                        </div>
                       </div>

                    <div className='mt-2 pt-1 text-center'>
                      <input
                        className='btn btn-primary btn-lg'
                        type='submit'
                        value='Apply'
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={2000}/>
    </div>
  );
}

export default Internships;
