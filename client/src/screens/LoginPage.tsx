import dice from '../assets/dice.jpg'
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// if username and id and token is saved in local storage navigate to "/home"
// if not, check username with API and save above variables in local storage
// GET /players/name/:name

const URL = "/api/authentication";
const playerId = Number(localStorage.getItem("playerId"));
const playerName = localStorage.getItem("username");
const token = localStorage.getItem("token");

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (playerId && playerName && token) {
      navigate("/home");
    }
  });

  function checkUser() {
    fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
      body: JSON.stringify({ playerName: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        //  setToken(data.token)
        if (data.token) {
          // localStorage.setItem("playerId", data.id.toString());
          localStorage.setItem("username", data.playerName);
          localStorage.setItem("token", data.token);
          navigate("/home");
        } else {
          alert("Invalid user! Try again")
        }
      }
      )
      .catch((error) => alert(`Error:, ${error}`)
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerId && playerName && token) {
      navigate("/home");
    } else if (username.trim()) {
      checkUser();
    } else {
      alert("Username cannot be empty");
    }
  };

  return (
    <section className='flex justify-center items-center min-h-full bg-black' style={{ backgroundImage: `url(${dice})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='m-4 p-10 rounded-xl border border-white backdrop-blur-lg shadow-md shadow-slate-500'>
        <form onSubmit={handleLogin}>
          <h1 className='text-white text-5xl font-semibold my-4'>Login</h1>
          <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-white bg-transparent text-white' type='text' placeholder='Username' value={username} id='username'onChange={(e) => setUsername(e.target.value)} />
            <FaUser className='text-white absolute right-14 top-1/2 -translate-y-2/4'/>
          </div>
          {/* <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-white bg-transparent text-white' type='password' placeholder='Password' required />
            <FaLock className='text-white absolute right-4 top-1/2 -translate-y-2/4'/>
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center justify-evenly'>
              <input type='checkbox' placeholder='Password' required id='remember' className='accent-white mr-1 w-5 h-5'/>
              <label htmlFor="remember" className='text-white'>Remember me</label>
            </div>
            <a href='#' className='text-white underline underline-offset-2 hover:text-slate-300'>Forgot password?</a>
          </div> */}
          <button type='submit' className='py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-85'>Login</button>
          
          <p className='text-white'>Don't have an account? <Link to={"/register"} className='underline underline-offset-2 hover:text-slate-300 font-semibold'>Register</Link> / <Link to={"/home"} className='underline underline-offset-2 hover:text-slate-300 font-semibold'>Continue as guest</Link></p>
          
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
