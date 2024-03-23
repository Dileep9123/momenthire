import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Login component for user authentication.
 * @component
 */
function Login() {
    // State variables to manage user input and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    /**
     * Handles the user login form submission.
     * @param {Event} e - The form submission event.
     */
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Sending a POST request to the server for user login using Axios
            const response = await axios.post('http://127.0.0.1:4000/login', {
                email,
                password,
            });

            // If login is successful, retrieve user data from the response
            const userData = response.data;
            toast.success("Login Successfull. Redirecting to Home Page...", {
                onClose: () => {
                  navigate("/",{state:{userData,isLogged:true}})
                  window.scrollTo(0, 0);
                }
              });
            
            // Handle successful login, e.g., redirect to the dashboard

        } catch (error) {
            // If login fails, handle errors and display an error message
            if (error.response) {
                // The request was made, but the server responded with a status code outside the range of 2xx
                console.error('Login failed. Status:', error.response.status);
                setErrorMessage('Invalid credentials');
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received');
                setErrorMessage('No response received');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error during login request setup:', error.message);
                setErrorMessage('Internal Server Error');
            }
        }
    };

    return (
        <div>
            <div className='login'>
            <div className='login-side-screen'>
               <h4 className='mt-4 mb-5 ms-5'>MomentHire</h4>
               <img src='jobs_login.webp' alt='jons login' height={250} width={250} />
            </div>
            <div className='login-form'>
                <main className="form-signin w-100 m-auto">
                    <form onSubmit={handleLogin}>

                        <h1 className="h3 mb-4 fw-normal">Please sign in</h1>

                        {/* Input field for email */}
                        <div className="form-floating">
                            <input
                                name='email'
                                type="email"
                                className="form-control"
                                id="email_login"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email_login">Email address</label>
                        </div>
                        
                        {/* Input field for password */}
                        <div className="form-floating">
                            <input
                                name='password'
                                type="password"
                                className="form-control"
                                id="login_pass"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="login_pass">Password</label>
                        </div>

                        {/* Login button */}
                        <button className="btn mt-3 btn-primary w-100 py-2" type="submit">Sign in</button>

                        {/* Display error message if login fails */}
                        {errorMessage ? <p className="text-danger pt-1">{errorMessage}</p>  : <div></div>}

                        {/* Link to the registration page */}
                        <p className="mt-4 mb-3 text-body-secondary">Don't have an account? - <NavLink to="/register">sign up</NavLink></p>

                        {/* Copyright notice */}
                        <p className="mt-5 mb-3 text-body-secondary">© moment hire</p>
                    </form>
                </main>
            </div>
        </div>
        <ToastContainer position='top-center' autoClose={2000} />
    </div>
    );
}

export default Login;
