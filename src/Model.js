import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Model({closeModel, dest}) {

    useEffect(()=>{
        document.body.style.overflowY = "hidden";

        return ()=>{
            document.body.style.overflowY = "scroll";
        }
    })
    return (
    <>
    <div className="model-wrapper" onClick={closeModel}> </div>
    <div className="model-container">
        <i class="fa-solid fa-face-smile fa-3x mb-4" style={{color:'violet'}}></i>
        <p>Please login in to apply for {dest}</p>
        <div className="model-buttons">
        <Link to="/login">
            <button type="button" className="login-button">
                Login{' '}
                <img
                    src="login_icon.svg"
                    alt="Login Icon"
                    width="13"
                    height="14"
                    loading="lazy"
                />
            </button>
        </Link>
        <button type="button" className="login-button" onClick={closeModel}>
                close{' '}
                <i class="fa-solid fa-xmark" style={{color:'darkblue'}}></i>
            </button>
        </div>
    </div>

    </>
    );
    
}


export default Model;