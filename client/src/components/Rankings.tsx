import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "./Players";

const URLranking = "/api/ranking";
const URLloser = "/api/loser";
const URLwinner = "/api/winner";
const URLplayer = "api/players/"

const token = localStorage.getItem("token");

type Ranking = {
    id: number,
    playerId: number,
    totalGames: number,
    totalWins: number,
    totalLost: number,
    winPercentage: number
}

  async function getLooserId(): Promise<number> {
    try {
      const response = await fetch(`${URLloser}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (data.playerId !== undefined) {
        return data.playerId;
      } else {
        throw new Error("playerId not found in response");
      }
    } catch (error) {
      console.error('Error fetching Looser ID:', error);
      throw new Error("Failed to fetch Looser ID");
    }
  }
  

async function getLooser(): Promise<string> {
    try {
      const looserId = await getLooserId();
      const response = await fetch(`${URLplayer}${looserId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (data.name !== undefined) {
        return data.name;
      } else {
        throw new Error("Name not found in response");
      }
    } catch (error) {
      console.error('Error fetching Looser:', error);
      throw new Error("Failed to get looser");
    }
  }
  
  async function getWinnerId(): Promise<number> {
    try {
      const response = await fetch(`${URLwinner}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (data.playerId !== undefined) {
        return data.playerId;
      } else {
        throw new Error("playerId not found in response");
      }
    } catch (error) {
      console.error('Error fetching Winner ID:', error);
      throw new Error("Failed to fetch Winner ID");
    }
  }
  

  async function getWinner(): Promise<string> {
    try {
      const winnerId = await getWinnerId();
      const response = await fetch(`${URLplayer}${winnerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (data.name !== undefined) {
        return data.name;
      } else {
        throw new Error("Name not found in response");
      }
    } catch (error) {
      console.error('Error fetching Winner:', error);
      throw new Error("Failed to get winner");
    }
  }


const Rankings = () => {
    const navigate = useNavigate();
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const [looser, setLooser] = useState<string | null>(null);
    const [winner, setWinner] = useState<string | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);

    const fetchData = async () => {
      try {
        await getRankings();
        await getPlayers();
        const looserResult = await getLooser();
        const winnerResult = await getWinner();
        setLooser(looserResult);
        setWinner(winnerResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const loadPage = async () => {
      await fetchData()
    }

    useEffect(() => {
        loadPage();
      }, []);
      

      async function getRankings() {
        fetch(`${URLranking}`, {
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
              setRankings(data)
            } 
          )
            .catch((error) => console.error('Error:', error));
      }

      async function getPlayers() {
            fetch(`${URLplayer}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            })
              .then((response) => response.json())
              .then((data) => {
                rankings.forEach(ranking => {
                  data.filter((element:Player) => {
                    return element.id === ranking.playerId
                  })
                });
                setPlayers(data);
              })
              .catch((error) => alert(`Error:, ${error}`));
      }

  return (
    <section className='text-white flex-col'>
        <h1 className='text-3xl font-bold'>Rankings</h1>
        <div className='flex justify-between items-start space-x-8'>
            <div>
                <h2 className='text-2xl'>Winner</h2>
                <p className="text-white">{winner ? winner : 'Loading...'}</p>
            </div>
            <div>
                <h2 className='text-2xl'>All Rankings</h2>
                <ul>
                    {
                        players.map((player, index) => (
                            <li key={index} className="text-white">
                              {index + 1}
                              {". "}
                              {player.name}
                              </li>
                          ))
                    }
                </ul>
            </div>
            <div>
                <h2 className='text-2xl'>Loser</h2>
                <p className="text-white">{looser ? looser : 'Loading...'}</p>
            </div>
        </div>
    </section>
  )
}

export default Rankings;