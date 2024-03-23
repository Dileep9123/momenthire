import React from 'react';

function Contact(){
    return (
    <div>
    <div className='contact'>
      <div className='contact-us'>
         <div className='contact-info'>
         <p style={{color:"rgb(234, 26, 234)"}}>Hello. What can we help you with?</p>
            <h5 style={{marginTop:"1rem"}}>Thank you for showing your interest in collaborating and interacting with us.
         Our hardworking and dedicated team is ready to help you in every possible way.</h5>
          <a class="contact-button" href="mailto:info@momenthire.com">CONTACT US</a>

          <h6 className='contact-details'><i class="fa-solid fa-phone-volume"></i> &nbsp;&nbsp;  XXXX XXXXX</h6>
          <h6 className='contact-details'><i class="fa-solid fa-envelope"></i> &nbsp;&nbsp;  XXXX XXXXX</h6>
          <h6 className='contact-details'><i class="fa-solid fa-location-dot"></i> &nbsp;&nbsp;  XXXX XXXXX</h6>
          
         </div>
          <div className='contact-image-container'>
            <img className='contact-image' src='contact-image.webp'  alt='conact-image'/>
          </div>
        </div>
    </div>
    <div className='contact-middle'>
           <div className='contact-middle-side'>
                <div className='underline-left' style={{ width: '17rem'}}>
                <h3 className='about-subheading' style={{ paddingLeft: '0.2rem' }}>WE PROVIDE</h3>
                <h1 className='about-heading'>WORLDWIDE SERVICES</h1>
                </div>   
           </div>
           <div className='map-image'>
                  <img src='./map.png' alt='map' />
           </div>
    </div>
    </div>
    );

}
export default Contact;