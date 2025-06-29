"use client";
import React, { useRef } from "react";
import "../../app/login.css";

export default function LoginPage() {
  const containerRef = useRef(null);

  const handleRegisterClick = () => {
    containerRef.current?.classList.add("active");
  };

  const handleLoginClick = () => {
    containerRef.current?.classList.remove("active");
  };

  return (
    <div className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div ref={containerRef} className="container" id="container">
          <div className="form-container sign-up">
            <form>
              <h1>Create Account</h1>
              
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form>
              <h1>Sign In</h1>
              
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forget Your Password?</a>
              <button>Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button onClick={handleLoginClick} className="" id="login">
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button onClick={handleRegisterClick} className="" id="register">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
