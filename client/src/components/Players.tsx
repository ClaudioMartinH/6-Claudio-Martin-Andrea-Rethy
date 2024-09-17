import { useEffect, useState } from "react";

const URL = "/api/players/";
const token = localStorage.getItem("token");

type Player = {
  id: number,
  name: string,
  register_date: string
}

const Players = () => {
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
      .then((response) => response.json())
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
