
// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Contact from './Contact';
import Jobs from './Jobs';
import Internships from './Internships';
import Resume from './Resume';
import About from './About';
import HomeScreen from './HomeScreen';
import InternshipApply from './InternshipApply';
function App() {
  return (
    <div>
    <Router>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<HomeScreen />} />
        <Route path="contactus" element={<Contact />} />
        <Route path="jobs" element={<Jobs />} /> 
        <Route path="internships" element={<Internships />} /> 
        <Route path='internshipApply' element={<InternshipApply />} />
        <Route path="about" element={<About />} />
        <Route path="resume" element={<Resume />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>

    </div>
  );
}

export default App;


