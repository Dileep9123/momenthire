import React from 'react';
function Resume(){
    return (
        <div>
        <header  className='resume-heading'>
          <div className='resume-sideheading'>
          <div className="subtitle">
            <p style={{color:"rgb(234, 26, 234)"}}>Resume Builder</p>
            <h1 style={{ fontWeight:'500'}}> Welcome to the Resume </h1>
            <h1 style={{fontWeight:'500'}}> Building Guide </h1>
        
            

           
        </div>
        <h6 style={{marginTop:"120px",fontWeight:"50px"}}><i class="fa-regular fa-hand-point-right"></i> &nbsp;  This page provides guidelines on creating an effective resume</h6>
            <h6 style={{marginTop:"10px",fontWeight:"50px"}}><i class="fa-regular fa-hand-point-right"></i> &nbsp;  Follow the steps below to build a compelling resume for your job applications.</h6>
          </div>

          <div className='resume-container'>
            <img className='resume-image' src='./resume_image_1.webp'/>
          </div>

        </header>
        {/* Add more sections as needed */}
        <section className="resume-section">
      <h2>3 Steps to a perfect resume</h2>
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <img
            width="327"
            height="258"
            src="https://www.livecareer.com/lcapp/uploads/2023/08/step-1.png"
            alt="Resume builder step 1 pick a template"
            style={{ aspectRatio: "327/258" }}
          />
          <p class="perfect-rs-head">Pick a template and follow the prompts</p>
          <p className='perfect-rs-desc'> 
          Please visit online platforms offering resume editing tools and select a template that aligns well with your professional preferences.
          </p>
        </div>
        <div className="col-12 col-md-4">
          <img
            width="327"
            height="258"
            src="https://www.livecareer.com/lcapp/uploads/2023/08/step-2.png"
            alt="Resume builder step 2 choose customized text"
          />
          <p class="perfect-rs-head">
            Choose customized text that fits your story
          </p>
          <p className='perfect-rs-desc'>
          Select text that is tailored to your narrative and effectively communicates your story.
          </p>
        </div>
        <div className="col-12 col-md-4">
          <img
            width="327"
            height="258"
            src="https://www.livecareer.com/lcapp/uploads/2023/08/step-3.png"
            data-lazy-type="image"
            alt="Resume builder step 3 download"
          />
          <p class="perfect-rs-head">Download and send to employers</p>
          <p className='perfect-rs-desc'>
            Save and send as a PDF, Word DOC or any other file format the
            employer wants.
          </p>
        </div>
      </div>
    </section>
        
      </div>
    );
}

export default Resume;