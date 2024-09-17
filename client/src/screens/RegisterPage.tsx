import dice from '../assets/dice.jpg'
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState, /*useEffect*/ } from "react";

const URL = "/api/players"

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  // const [token, setToken] = useState(0);

  // useEffect(() => {
  //   console.log('Token updated:', token);
  // }, [token]);

  function createUser() {
    fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
      body: JSON.stringify({ name: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        //  setToken(data.token)
        if (data.id !== 0) {
          localStorage.setItem("playerId", data.id.toString());
          localStorage.setItem("username", data.name);
          navigate("/home");
        } else {
          alert("Invalid user! Try again")
        }
      }
      )
      .catch((error) => console.error('Error:', error));
  }

  const handleRegister = (e: React.FormEvent) => {
    // Manage API: POST /players
    e.preventDefault();
    if (username.trim()) {
      createUser();
    } else {
      alert("Username cannot be empty");
    }
  };

  return (
    <section className='flex justify-center items-center min-h-full bg-black' style={{ backgroundImage: `url(${dice})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='m-4 p-10 rounded-xl border border-white backdrop-blur-lg shadow-md shadow-slate-500'>
        <form onSubmit={handleRegister}>
          <h1 className='text-white text-5xl font-semibold my-4'>Create Account</h1>
          <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-white bg-transparent text-white' type='text' placeholder='Username' value={username} id='username' onChange={(e) => setUsername(e.target.value)} />
            <FaUser className='text-white absolute right-8 top-1/2 -translate-y-2/4' />
          </div>
          {/* <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-white bg-transparent text-white' type='password' placeholder='Password' required />
            <FaLock className='text-white absolute right-8 top-1/2 -translate-y-2/4'/>
          </div> */}
          <button type='submit' className='py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-85'>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
