import { useState, useEffect } from "react";

const URLranking = "/api/ranking";
const URLloser = "/api/loser";
const URLwinner = "/api/winner";
const URLplayerId = "api/players/"

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
      console.log(data);
  
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
      const response = await fetch(`${URLplayerId}${looserId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      const data = await response.json();
      console.log(data);
  
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
      console.log(data);
  
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
      const response = await fetch(`${URLplayerId}${winnerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      const data = await response.json();
      console.log(data);
  
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
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const [looser, setLooser] = useState<string | null>(null);
    const [winner, setWinner] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            await getRankings();
            const looserResult = await getLooser();
            const winnerResult = await getWinner();
            setLooser(looserResult);
            setWinner(winnerResult);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
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
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setRankings(data)
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
                        rankings.map((ranking, index) => (
                            <li key={index} className="text-white">
                              {index}
                              {". "}
                              {ranking.playerId}
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