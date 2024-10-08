import dice from '../assets/dice.jpg'
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const URL = "/api/authentication";
const URLguest = "/api/guest";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  function checkUser(name: string) {
    fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerName: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.token) {
          sessionStorage.setItem("playerId", data.id.toString());
          sessionStorage.setItem("username", data.playerName);
          sessionStorage.setItem("token", data.token);
          navigate("/home");
        } else {
          alert("Invalid user! Try again")
        }
      }
      )
      .catch((error) => alert(`Error:, ${error}`)
    );
  }

  function handleGuestUser() {
    fetch(`${URLguest}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.token) {
          sessionStorage.setItem("playerId", data.id.toString());
          sessionStorage.setItem("username", data.playerName);
          sessionStorage.setItem("token", data.token);
          navigate("/home");
        } else {
          alert("We experienced an error. Please try again later.")
        }
      }
      )
      .catch((error) => alert(`Error:, ${error}`)
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      checkUser(username);
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
          
          <p className='text-white'>Don't have an account? <Link to={"/register"} className='underline underline-offset-2 hover:text-slate-300 font-semibold'>Register</Link> / <span onClick={handleGuestUser} className='underline underline-offset-2 hover:text-slate-300 font-semibold'>Continue as guest</span></p>
          
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
