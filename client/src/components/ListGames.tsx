import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "/api/playerGames/";
const playerId = Number(sessionStorage.getItem("playerId"));
const token = sessionStorage.getItem("token");

type Game = {
  id: number,
  playerId: number,
  dice1Result: number,
  dice2Result: number,
  overallResult: string
}

const ListGames = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const onWindowLoad = () => {
      getMyGames();
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

function getMyGames() {
  fetch(`${URL}${playerId}`, {
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
      setGames(data);
    } 
  )
    .catch((error) => console.error('Error:', error));
}

  return (
    <>
      <div className='text-white text-2xl font-bold'>List of My Games</div>
      <ul className="flex flex-col items-start">
        {
          Array.isArray(games) && games.length > 0 ? (
            games.map((game, index) => (
              <li key={index} className="text-white">
                {index}
                {". "}
                {game.dice1Result}
                {" & "}
                {game.dice2Result}
                {" - "}
                {game.overallResult}
                </li>
            ))
          ) : (
            <li className="text-white">{"Games not found"}</li>
          )
        }
      </ul>
    </>
  )
}

export default ListGames