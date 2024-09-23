/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "/api/players/";

export type Player = {
  id: number,
  name: string,
  register_date: string
}

const Players = () => {
  const navigate = useNavigate();
  const [ players, setPlayers ] = useState<Player[]>([])
  const [token, setToken] = useState<string | null>(null);

  const onWindowLoad = () => {
    getPlayers();
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (token !== null) {
      onWindowLoad();
    }
  }, [token]);

  function getPlayers() {
    fetch(`${URL}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
        setPlayers(data)
      } 
    )
      .catch((error) => console.error('Error:', error));
  }

  return (
    <>
    <div className="text-white text-2xl font-bold">List of All Players</div>
    <ul>
      {
        players.map((player, index) => {
          return (
            <li key={index} className="text-white">{player.name}</li>
          )
        })
      }
    </ul>
    </>
    
  
  )
}

export default Players;
