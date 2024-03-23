import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import Internship from './Internship';

const AnimatedDiv =  () => {
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
    <div className={`down-window ${isVisible ? 'animated' : ''}`} style={{height:'2.8rem'}}>
      <p className='jobs-title' style={{fontSize:'1.2rem', marginTop:'0.8rem'}}>Apply for an Internship here</p>
    </div>
  );
};

function Internships(props) {
  const [internships, setInternships] = useState([]);
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

 

 
 
  useEffect(() => {
    if (location.state !== null) {
      if (location.state.isLogged === true) {
        setIsLogged(true);
        setUserData(location.state.userData);
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
      }
    }
  }, [location.state]);


  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get("http://localhost:4000/internships/active_all");
        setInternships(response.data);
      } catch (error) {
        console.error("Error fetching internships:", error);
        // Handle error (e.g., show toast notification)
        toast.error("Error fetching internships. Please try again later.");
      }
    };

    fetchInternships();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  const handleClick = (e) => {
    console.log(e.target.value);
    navigate("/internshipApply",{ state:{ isLogged: isLogged, userData: userData, intern_id: e.target.value }});
    window.scrollTo(0, 0);
  };


  return (
    <>
      <AnimatedDiv />
      <div className="internships-container">
        {internships.map(internship => (
          <Internship key={internship.intern_id} internship={internship}  onclick={handleClick} />
        ))}
      </div>
    </>
  );
}

export default Internships;
