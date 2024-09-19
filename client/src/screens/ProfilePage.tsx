import dice from '../assets/dice.jpg';
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const URL = "/api/players/"
const playerId = Number(sessionStorage.getItem("playerId"));
const currentUserName = sessionStorage.getItem("username");
const token = sessionStorage.getItem("token");

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  function updateUser() {
    fetch(`${URL}${playerId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name: username }),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          if (response.status === 403 && errorData.error === "Invalid token") {
            navigate("/");
          } else {
            throw new Error(errorData.error || 'An error occured');
          }
        });
      }
      return response.json();
    })
      .then((data) => {
        console.log(data)
         if (data.name !== "") {
          sessionStorage.setItem("username", data.name);
          navigate("/home");
          alert("Username successfully updated!")
        } else {
          alert("Invalid user! Try again")
        }
      } 
    )
      .catch((error) => console.error('Error:', error));
  }
  
  const handleUpdate = (e: React.FormEvent) => {
    
    e.preventDefault();
    if (username.trim()) {
      updateUser();
    } else {
      alert("Username cannot be empty");
    }
  };

  return (
    <section className='flex justify-center items-center min-h-full bg-black' style={{ backgroundImage: `url(${dice})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='m-4 p-10 rounded-xl border border-white backdrop-blur-lg shadow-md shadow-slate-500'>
        <form onSubmit={handleUpdate}>
          <h1 className='text-white text-5xl font-semibold my-4'>Update Username</h1>
          <h2 className='text-white text-2xl font-medium my-4'>{currentUserName}</h2>
          <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-white bg-transparent text-white' type='text' placeholder='New Username'  value={username} id='username' onChange={(e) => setUsername(e.target.value)} />
            <FaUser className='text-white absolute right-16 top-1/2 -translate-y-2/4'/>
          </div>
          {/* <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-white bg-transparent text-white' type='password' placeholder='Password' required />
            <FaLock className='text-white absolute right-16 top-1/2 -translate-y-2/4'/>
          </div> */}
          <button type='submit' className='py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-85'>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default ProfilePage