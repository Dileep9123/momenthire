import React from 'react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// AnimatedDiv Component
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
      <p className='jobs-title'>Who we are?</p>
    </div>
  );
};

// AnimatedLeft Component
const AnimatedLeft = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    setIsVisible(inView);
  }, [inView]);

  return (
    <div className={`animated-left ${isVisible ? 'in-view' : ''}`} ref={ref}>
      {children}
    </div>
  );
};

// AnimatedRight Component
const AnimatedRight = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    setIsVisible(inView);
  }, [inView]);

  return (
    <div className={`animated-right ${isVisible ? 'in-view' : ''}`} ref={ref}>
      {children}
    </div>
  );
};

// About Component
function About() {
  return (
    <div className='about-section'>
      <AnimatedDiv />
      
      <AnimatedLeft>
        {/* Left content for first section */}
        <div className='aboutus-container-left' style={{ paddingTop: '2rem' }}>
          <div className='desc-left' style={{ paddingTop: '2rem' }}>
            <div className='underline-left' style={{ width: '12rem', marginBottom: '4rem' }}>
              <h3 className='about-subheading' style={{ paddingLeft: '0.4rem' }}>OUR</h3>
              <h1 className='about-heading'>AGENCY</h1>
            </div>
            <p className='about-description' style={{ paddingRight: '5rem' }}>
              At MomentHire, we specialize in crafting career journeys that elevate professionals to new heights.
              Through strategic connections, precise job matching, and proven expertise in career advancement,
              we guide you to seize dream opportunities.
            </p>
          </div>

          <div>
            <img src="slide1.png" alt='slide1.png' />
          </div>

          <div className='blank'></div>
        </div>
      </AnimatedLeft>

      <AnimatedRight>
        {/* Right content for first section */}
        <div className='aboutus-container-right'>
          <div className='blank' style={{ width: '40%' }}></div>

          <div>
            <img src="slide2.png" alt='slide2.png' height='100%' />
          </div>

          <div className='desc-right'>
            <div className='underline-right' style={{ width: '30rem', marginBottom: '1rem', textAlign: 'left' }}>
              <h3 className='about-subheading' style={{ paddingLeft: '0.4rem' }}>OUR</h3>
              <h1 className='about-heading'>Company Values</h1>
            </div>
            <p className='about-description'>
              "At MomentHire, our values are the foundation of who we are and how we operate. We are committed to:<br />
              - Collaboration: Fostering strong partnerships and teamwork to achieve shared success.<br />
              - Innovation: Embracing creativity and forward-thinking solutions in every aspect of our work.<br />
              - Integrity: Upholding the highest ethical standards in all our interactions and decisions.<br />
              - Excellence: Striving for excellence in everything we do, from staffing solutions to software development.<br />
              - Empowerment: Empowering individuals to reach their full potential, both professionally and personally.<br />
              - Community: Building a supportive and inclusive community, where diversity is celebrated and everyone's voice is heard.<br />
            </p>
          </div>
        </div>
      </AnimatedRight>

      <AnimatedLeft>
        {/* Left content for second section */}
        <div className='grid-display'>
          <div className='desc-left' style={{ paddingTop: '2rem' }}>
            <div className='underline-left' style={{ width: '12rem', marginBottom: '1rem' }}>
              <h3 className='about-subheading' style={{ paddingLeft: '0.4rem' }}>OUR</h3>
              <h1 className='about-heading'>Project</h1>
            </div>
            <p className='about-description'>
              At MomentHire, we're dedicated to revolutionizing recruitment with our AI-based recruiting software.
              Our project focuses on efficiently matching profiles with tailored precision, ensuring that individuals
              find opportunities that align with their needs. By harnessing the power of artificial intelligence,
              we're shaping the future of recruitment to be seamless, strategic, and success-driven.
            </p>
          </div>

          <div style={{ paddingTop: '6rem', textAlign: 'right' }}>
            <img src='slide31.png' alt='slide31' />
          </div>

          <div style={{ backgroundColor: 'purple', gridColumn: 'span 2' }}></div>

          <div style={{ paddingTop: '4rem' }}>
            <img src="slide32.png" alt='slide32' />
          </div>

          <div className='desc-right' style={{ paddingLeft: '0', paddingTop: '1rem' }}>
            <div className='underline-right' style={{ width: '30rem', marginBottom: '1rem', textAlign: 'left' }}>
              <h3 className='about-subheading' style={{ paddingLeft: '0.4rem' }}>About</h3>
              <h1 className='about-heading'>15+ JOB RECOMMENDATIONS</h1>
            </div>
            <p className='about-description'>
              At MomentHire, we are committed to your success. Experience the advantage
              of receiving 15+ personalized job recommendations every week. Our tailored
              approach ensures you're consistently presented with opportunities that align
              with your skills and aspirations. Elevate your career with MomentHire – where
              meaningful connections lead to weekly opportunities.
            </p>
          </div>
        </div>
      </AnimatedLeft>

      <AnimatedRight>
        {/* Right content for second section */}
        <div className='grid-display-2'>
            <div className='underline-left' style={{ width: '12rem', marginBottom: '1rem', gridColumn: 'span 2' }}>
                <h1 className='about-heading'>OUR<br />
                OPERATIONS</h1>
            </div>

            <div style={{ paddingLeft: '5rem' }}>
                <dl>
                <dt>Staffing Solutions:</dt>
                <dd>
                    <ul>
                    <li>Rigorous recruitment process</li>
                    <li>Advanced matching algorithms</li>
                    <li>Seamless candidate placement</li>
                    </ul>
                </dd>
                </dl>
            </div>

            <div style={{ paddingLeft: '5rem' }}>
                <dl>
                <dt>Technology Integration:</dt>
                <dd>
                    <ul>
                    <li>AI-powered solutions</li>
                    <li>Robust data security measures</li>
                    <li>Scalable software designs</li>
                    </ul>
                </dd>
                </dl>
            </div>

            <div style={{ paddingLeft: '5rem', backgroundColor: 'purple', color: 'white' }}>
                <dl>
                <dt>Software Development:</dt>
                <dd>
                    <ul>
                    <li>Innovation-driven approach</li>
                    <li>Agile methodologies</li>
                    <li>Stringent quality assurance</li>
                    </ul>
                </dd>
                </dl>
            </div>

            <div style={{ paddingLeft: '5rem', backgroundColor: 'purple', color: 'white' }}>
                <dl>
                <dt>Continuous Improvement:</dt>
                <dd>
                    <ul>
                    <li>Ongoing team training</li>
                    <li>Market trend analysis</li>
                    <li>Process optimization initiatives</li>
                    </ul>
                </dd>
                </dl>
            </div>

            <div style={{ paddingLeft: '5rem', backgroundColor: 'purple', color: 'white' }}>
                <dl>
                <dt>Client Relations:</dt>
                <dd>
                    <ul>
                    <li>Needs assessment</li>
                    <li>Transparent communication</li>
                    <li>Feedback integration</li>
                    </ul>
                </dd>
                </dl>
            </div>

            <div style={{ paddingLeft: '5rem', backgroundColor: 'purple', color: 'white' }}>
                <dl>
                <dt>Community Engagement:</dt>
                <dd>
                    <ul>
                    <li>Emphasis on diversity and inclusion</li>
                    <li>Corporate social responsibility</li>
                    <li>Industry networking for collaborative opportunities</li>
                    </ul>
                </dd>
                </dl>
            </div>
        </div>
      </AnimatedRight>

      <AnimatedLeft>
        {/* Left content for third section */}
        <div className='aboutus-container-left' style={{ paddingTop: '2rem' }}>
            <div className='blank'></div>

            <div className='desc-left' style={{ paddingTop: '2rem' }}>
                <div className='underline-left' style={{ width: '19rem', marginBottom: '4rem', marginLeft: '2rem' }}>
                <h3 className='about-subheading' style={{ paddingLeft: '0.4rem' }}>WHY</h3>
                <h1 className='about-heading'>WE ARE BEST?</h1>
                </div>

                <p className='about-description' style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h3 className='about-subheading'>Commitment to Excellence:</h3>
                At MomentHire, our unwavering commitment to excellence sets us apart as the best in the industry.
                We pride ourselves on delivering top-notch staffing solutions and cutting-edge software development services.
                Our team is comprised of industry experts dedicated to providing unparalleled quality in every aspect
                of our work. From meticulously matching candidates with strategic precision to crafting innovative
                software solutions, we consistently strive for and achieve excellence.
                </p>
            </div>

            <div>
                <img src="slide5.png" alt='slide5.png' style={{ borderRadius: '30px' }} />
            </div>
        </div>
      </AnimatedLeft>

      <AnimatedRight>
        {/* Right content for third section */}
        <div className='grid-display-3' style={{ paddingTop: '2rem' }}>
            <div className='blank' style={{ rowsSpan: '2', width: '75%' }}></div>

            <div className='desc-left' style={{ paddingTop: '2rem' }}>
                <div className='underline-left' style={{ width: '19rem', marginBottom: '4rem', marginLeft: '2rem' }}>
                <h3 className='about-subheading' style={{ paddingLeft: '0.4rem' }}>WHY</h3>
                <h1 className='about-heading'>WE ARE BEST?</h1>
                </div>

                <p className='about-description' style={{ paddingLeft: '0', paddingRight: '2rem' }}>
                <h3 className='about-subheading'>Innovative AI-Powered Approach:</h3>
                MomentHire leads with innovation, employing an AI-powered recruitment approach that redefines industry standards.
                Our cutting-edge software leverages artificial intelligence to provide unparalleled efficiency and precision.
                This technology-driven strategy revolutionizes the hiring process, delivering not just matches but optimal fits
                for both clients and candidates.
                </p>
            </div>

            <div className='desc-left' style={{ paddingTop: '2rem' }}>
                <p className='about-description' style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h3 className='about-subheading'>Client-Centric Focus and Building Lasting Relationships</h3>
                Our distinction as the best extends beyond our services; it lies in our client-centric philosophy.
                We prioritize building lasting relationships with our clients and candidates. By understanding their individual
                needs and aspirations, we tailor our solutions to foster success. This client-focused approach goes beyond
                transactions; it's about becoming a trusted partner in their journey. At MomentHire, we are not just a service
                provider; we are your dedicated ally in achieving your goals. This commitment to genuine connections and client
                satisfaction is what truly makes us the best in the business.
                </p>
            </div>
        </div>
      </AnimatedRight>

      <AnimatedLeft>
        {/* Left content for fourth section */}
        <div className='grid-display-4'>
            <div className='desc-left' style={{ paddingTop: '2rem' }}>
                <div className='underline-left' style={{ width: '30rem', marginBottom: '2rem' }}>
                <h3 className='about-subheading' style={{ paddingLeft: '0.4rem' }}>WE PROVIDE</h3>
                <h1 className='about-heading'>BEST SERVICES</h1>
                </div>
                <p className='about-description' style={{ paddingLeft: '2rem' }}>
                MomentHire takes pride in offering services that stand head and shoulders above the rest.
                Our commitment to excellence is not just a claim; it's a daily practice. From meticulous
                candidate matching to groundbreaking software development, our services redefine industry
                standards, ensuring unparalleled quality and value for our clients.
                </p>
            </div>

            <div style={{ gridRow: 'span 2', paddingTop: '8rem', paddingLeft: '2rem' }}>
                <img src='slide8.png' alt='slide8' height='450rem' width='300px' style={{ borderRadius: '40px' }} />
            </div>

            <div style={{ display: 'flex', color: 'white', backgroundColor: 'purple', paddingLeft: '2rem' }}>
                <div className='desc-left' style={{ paddingTop: '2rem' }}>
                <p className='about-description' style={{ paddingRight: '1rem' }}>
                    At the core of our success is a relentless customer-centric approach. We don't just provide services;
                    we craft tailored solutions that meet the unique needs and aspirations of our clients. By understanding
                    their goals, we deliver not just what's expected, but services that exceed expectations, fostering long-term
                    partnerships built on trust and satisfaction.
                </p>
                </div>

                <div className='desc-left' style={{ paddingTop: '2rem' }}>
                <p className='about-description' style={{ paddingRight: '2rem' }}>
                    What sets us apart is the seamless blend of efficiency and a personal touch in our services.
                    Whether it's staffing solutions or software development, our team combines cutting-edge technology
                    with a human-centric approach. This ensures that every client receives not just the best service but
                    an experience that reflects our dedication to their success.
                </p>
                </div>
            </div>
        </div>
      </AnimatedLeft>

      <AnimatedRight>
        {/* Right content for fourth section */}
        <div className='aboutus-container-left' style={{ paddingTop: '2rem' }}>
            <div className='desc-left' style={{ paddingTop: '2rem' }}>
                <div className='underline-left' style={{ width: '15rem', marginBottom: '4rem' }}>
                <h3 className='about-subheading' style={{ paddingLeft: '0.4rem' }}>OUR RECENT</h3>
                <h1 className='about-heading'>STATEMENT</h1>
                </div>
                <p className='about-description' style={{ paddingRight: '5rem' }}>
                At MomentHire, our recent statement reflects our ongoing commitment to excellence and innovation.
                We are dedicated to providing unparalleled services, leveraging cutting-edge technology in staffing
                solutions and software development.
                <br/><br/><br/>
                This statement reaffirms our position as industry leaders, focused on delivering value, precision,
                and client satisfaction.
                </p>
            </div>

            <div>
                <img src="slide9.png" alt='slide9.png' height='500rem' />
            </div>
        </div>
      </AnimatedRight>
      <div style={{height:'3rem'}}>

      </div>
    </div>
  );
}

export default About;
