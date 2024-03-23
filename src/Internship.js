import React from "react";

const Internship = (props) => {
  const {
    intern_id,
    title,
    type,
    company,
    location,
    start_date,
    duration,
    stipend,
    openings,
    deadline
  } = props.internship;

  // Function to format date to display in DD-MM-YYYY format
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

 

  return (
    <div className="internship-item">
      <div className="internship-card">
        <div className="intern-grid">
          <div>
            <h1 className="intern-title">{title}</h1>
            <h3 className="intern-company">{company}</h3>
            <div className="intern-info1">
              <div>
                <i className="fa-solid fa-house-laptop"></i>{" "}
                <span>{type}</span>{" "}
              </div>
              <div>
                <i className="fa-solid fa-clock-rotate-left"></i>{" "}
                <span>{formatDate(start_date)}</span>{" "}
              </div>
              <div>
                <i className="fa-solid fa-location-dot"></i>{" "}
                <span>{location}</span>{" "}
              </div>
              <div>
                <i className="fa-solid fa-calendar"></i>{" "} &nbsp;
                <span>{duration + " months"}</span>
              </div>
            </div>
          </div>

          <img
            src="https://internship.aicte-india.org/uploads/logo/CORPORATE64e85ca650ef81692949670.png"
            height="100px"
            width="100px"
            alt="Company Logo"
          />
        </div>
        <div className="intern-info2">
          <div className="info2-item">
            <div className="pt-0.7">
              <i className="fa-solid fa-circle-play"></i>
            </div>
            <div>
              <b>Start Date</b>
              <p>{formatDate(start_date)}</p>
            </div>
          </div>
          <div className="info2-item">
            <div className="pt-0.7">
              <i className="fa-solid fa-coins"></i>
            </div>
            <div>
              <b>Stipend</b>
              <p>{stipend}</p>
            </div>
          </div>
          <div className="info2-item">
            <div className="pt-0.7">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <div>
              <b>Number Of Openings</b>
              <p>{openings}</p>
            </div>
          </div>
          <div className="info2-item">
            <div className="pt-0.7">
              <i className="fa-solid fa-hourglass-half"></i>
            </div>
            <div>
              <b>Apply By</b>
              <p>{formatDate(deadline)}</p>
            </div>
          </div>
        </div>
        <div style={{ height: "2rem" }}></div>
        <div className="intern-apply">
          <button value={intern_id} className="intern-button" onClick={props.onclick}>Apply Here</button>
        </div>
      </div>
    </div>
  );
};

export default Internship;
