import dice from '../assets/dice.jpg'
import { FaUser,FaLock } from "react-icons/fa";

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log("Username:", username);
//     console.log("Password:", password);
//   };

  return (
    <section className='flex justify-center items-center min-h-full bg-slate-800' style={{ backgroundImage: `url(${dice})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

      
      <div className='m-4 p-10 rounded-xl bg-white/30'>
        <form action=''>
          <h1 className='text-white text-5xl font-semibold my-4'>Login</h1>
          <div className='relative'>
            <input className='rounded-md p-3 my-3' type='text' placeholder='Username' required />
            <FaUser className='text-black absolute right-4 top-1/2 -translate-y-2/4'/>
          </div>
          <div className='relative'>
            <input className='rounded-md p-3 my-3' type='password' placeholder='Password' required />
            <FaLock className='text-black absolute right-4 top-1/2 -translate-y-2/4'/>
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center justify-evenly'>
              <input type='checkbox' placeholder='Password' required id='remember' className='accent-white mr-1 w-5 h-5'/>
              <label htmlFor="remember" className='text-white'>Remember me</label>
            </div>
            <a href='#' className='text-white underline underline-offset-2 hover:text-slate-300'>Forgot password?</a>
          </div>
          <button type='submit' className='py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-85'>Login</button>
          <div>
            <p className='text-white'>Don't have an account? <a href="#" className='underline underline-offset-2 hover:text-slate-300'>Register</a></p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
