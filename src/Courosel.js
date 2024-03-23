import React from 'react';

function Courosel(){
    return (
        <div>
     <section id="testimonials">
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
          <div class="carousel-inner" style={{ height: '400px' }}>
            <div class="carousel-item active" style={{ border: '0' }}>
              <h2 class="testimonial-text">Your dream job is the intersection of passion and purpose – keep searching.</h2>
              <img class="testimonial-image" src="signup-image.webp" alt="sign-up" />
              <h3>Your Gateway to Exciting Opportunities!</h3>
              <a class="contact-button" href="/register">Sign up</a>
            </div>
            <div class="carousel-item" style={{ border: '0' }}>
              <h2 class="testimonial-text">Opportunities don't happen; you create them with determination and resilience.</h2>
              <img class="testimonial-image" src="connections.png" alt="connections" />
              <h3>Stay Connected</h3>
              Follow Us on Social Media
              Get Job Alerts
            </div>
          </div>
        </div>
      </section>
      <section id="press">
    <img class="logo" src="google.png" alt="google" style={{width:'17%'}} />
    <img class="logo" src="amazon.png" alt="amazon" style={{marginTop:'1rem'}} />
    <img class="logo" src="infosys.png" alt="infosys" />
    <img class="logo" src="tcs.png" alt="tcs" />
     </section>
    </div>

    )
}

export default  Courosel;