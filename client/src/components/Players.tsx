import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "/api/players/";
const token = localStorage.getItem("token");

type Player = {
  id: number,
  name: string,
  register_date: string
}

const Players = () => {
  const navigate = useNavigate();
  const [ players, setPlayers ] = useState<Player[]>([])

  useEffect(() => {
    const onWindowLoad = () => {
      getPlayers();
    };

    if (document.readyState === "complete") {
      onWindowLoad();
    } else {
      window.addEventListener("load", onWindowLoad);
    }

    return () => {
      window.removeEventListener("load", onWindowLoad);
    };
  }, []);

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
        console.log(data);
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
