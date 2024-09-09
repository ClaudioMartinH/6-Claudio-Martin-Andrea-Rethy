import dice from '../assets/dice.jpg'
import { FaUser,FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import React, { useState } from "react";


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    
    e.preventDefault();
    // Handle login logic here
    // console.log("Username:", username);
    // console.log("Password:", password);
    navigate("/play");
  };

  return (
    <section className='flex justify-center items-center min-h-full bg-black' style={{ backgroundImage: `url(${dice})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='m-4 p-10 rounded-xl border border-white backdrop-blur-lg shadow-md shadow-slate-500'>
        <form action=''>
          <h1 className='text-white text-5xl font-semibold my-4'>Login</h1>
          <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-white bg-transparent text-white' type='text' placeholder='Username' required />
            <FaUser className='text-white absolute right-4 top-1/2 -translate-y-2/4'/>
          </div>
          <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-white bg-transparent text-white' type='password' placeholder='Password' required />
            <FaLock className='text-white absolute right-4 top-1/2 -translate-y-2/4'/>
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center justify-evenly'>
              <input type='checkbox' placeholder='Password' required id='remember' className='accent-white mr-1 w-5 h-5'/>
              <label htmlFor="remember" className='text-white'>Remember me</label>
            </div>
            <a href='#' className='text-white underline underline-offset-2 hover:text-slate-300'>Forgot password?</a>
          </div>
          <button type='submit' className='py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-85' onClick={handleLogin}>Login</button>
          <Link to={"/register"}>
            <p className='text-white'>Don't have an account? <span className='underline underline-offset-2 hover:text-slate-300 font-semibold'>Register</span></p>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
