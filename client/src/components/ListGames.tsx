/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "/api/playerGames/";

type Game = {
  id: number,
  playerId: number,
  dice1Result: number,
  dice2Result: number,
  overallResult: string
}

const ListGames = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedPlayerId = sessionStorage.getItem('playerId');

    if (storedToken && storedPlayerId) {
      setToken(storedToken);
      setPlayerId(Number(storedPlayerId));
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (token && playerId !== null) {
      getMyGames();
    }
  }, [token, playerId]);

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

function deleteGamesId() {
  setGames([]);
  fetch(`${URL}${playerId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
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
          )
           : (
            <li className="text-white">{"Games not found"}</li>
          )
        }
      </ul>
      <button onClick={deleteGamesId} className="py-3 px-6 m-2 rounded-md bg-slate-800 text-white text-lg font-semibold hover:opacity-85">
          Delete History
      </button>
    </>
  )
}

export default ListGames