import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Courosel from './Courosel';
import Features from './Features';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Model from './Model';
function HomeScreen(props){

    const location = useLocation();
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);
    const [userData, setUserData] = useState({});
    const [showModel, setShowModel] = useState(false);
    const [dest,setDest] = useState("");

    const closeModel  = ()=> setShowModel(false);

    console.log(location.state);
   
    useEffect(() => {
        if (location.state !== null) {
            if(location.state.isLogged===true) {
            setIsLogged(true);
            setUserData(location.state.userData);
            sessionStorage.setItem('userData', JSON.stringify(location.state.userData));
            }
        }
        else {
            const storedUserData = sessionStorage.getItem('userData');
            if (storedUserData) {
                const parsedUserData = JSON.parse(storedUserData);
                setIsLogged(true);
                setUserData(parsedUserData);
            }
        }
    }, [location.state]);

    const handleClick = (e)=>{
         const dest = e.target.name;
         console.log(dest);
         if(isLogged) {
            if(dest)
         navigate("/"+dest,{ state:{ isLogged: isLogged, userData: userData }});
         }
         else
         {
            setShowModel(true);
            setDest(dest== "jobs"? "a job" : "an internship");
         }
    }

    return (
        <div>
        <div className="home">
        <div className="home-screen">
        <div className="subtitle">
            <p style={{color:"rgb(234, 26, 234)"}}> Seize The Moment,</p>
            <p> Secure Success </p>
        
            <h6 style={{marginTop:"120px",fontWeight:"1px"}}>Bridging the gap between the talent and recruiters</h6>
           <div className="social-media">
              <a href="https://www.instagram.com/" className='social-icons' ><i className="fa-brands fa-instagram "></i> &nbsp;Instagram</a>
              <a href="https://twitter.com/" className='social-icons'><i class="fa-brands fa-twitter"></i> &nbsp;Twitter</a> 
              <a href="https://www.linkedin.com/" className='social-icons'><i class="fa-brands fa-linkedin"></i> &nbsp;Linked In</a> 
            </div>
        </div>
        <div className="meta-data">
          <Link to='/about'> <img className="meta-images" src="about_us.png" alt="about_us" /> </Link>
           <Link to='/contactus'><img className="meta-images" src="contact_us.png" alt="contact_us" /> </Link>
           <Link to='/resume'><img className="meta-images" src="resume.png" alt="resume" /></Link>
        </div>
        <div className="jobs-internships">
      
        <button name='jobs' onClick={handleClick} style={{border:'none',padding:'0'}} ><img name='jobs' className="jobs-image" src="jobs.png" alt="jobs" /> </button>
        <button name='internships' onClick={handleClick} style={{border:'none',padding:'0'}} ><img name='internships' className="jobs-image" src="internships.png" alt="internships" /></button>
        </div>
        </div>
        </div>
        <Features />
        <Courosel />
        {showModel && <Model closeModel={closeModel}  dest={dest} />}
        </div>
    );
}

export default HomeScreen;