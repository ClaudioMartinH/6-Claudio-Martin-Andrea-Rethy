import { useEffect, useState } from "react";

const URL = "/api/playerGames/";
const playerId = Number(localStorage.getItem("playerId"));

type Game = {
  id: number,
  playerId: number,
  dice1Result: number,
  dice2Result: number,
  overallResult: string
}

const ListGames = () => {
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
      'Content-Type': 'application/json',
    },
    // credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setGames(data)
      //  setToken(data.token)
      //  if (data.id !== 0) {
        
      // } else {
      //   alert("")
      // }
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