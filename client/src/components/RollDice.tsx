import { useState } from "react";
import Dice from "./Dice";

const URL = "/api/playerGames/";
const playerId = Number(localStorage.getItem("playerId"));

const RollDice = () => {
    const [state, setState] = useState({
        dice1: 1 as 1 | 2 | 3 | 4 | 5 | 6,
        dice2: 1 as 1 | 2 | 3 | 4 | 5 | 6,
        rolling: false,
        result: "",
        totalScore: 0,
        rollCount: 0
    });

    const { dice1, dice2, rolling, result, totalScore, rollCount } = state

    const roll = () => {
        const newDice1 = Math.floor(Math.random() * 6) + 1 as 1 | 2 | 3 | 4 | 5 | 6;
        const newDice2 = Math.floor(Math.random() * 6) + 1 as 1 | 2 | 3 | 4 | 5 | 6;
        const score = newDice1 + newDice2;
        const result = score === 7 ? "Win" : "Loose"
        const newScore = score === 7 ? totalScore + 1 : totalScore
        const newCount = rollCount + 1
        setState({
            dice1: newDice1,
            dice2: newDice2,
            rolling: true,
            result: result,
            totalScore: newScore,
            rollCount: newCount
        });

        setTimeout(() => {
            setState((prevState) => ({...prevState, rolling: false}))
        }, 500);

        postGame(dice1, dice2, result);
    }

    function postGame(dice1R: number, dice2R: number, oResult: string) {
        fetch(`${URL}${playerId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // credentials: 'include',
          body: JSON.stringify(
            { 
                "playerId" : playerId,
                "dice1Result": dice1R, 
                "dice2Result": dice2R, 
                "overallResult": oResult
            }
          ),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            //  setToken(data.token)
            //  if (data.id !== 0) {
              
            // } else {
            //   alert("")
            // }
          } 
        )
          .catch((error) => console.error('Error:', error));
      }

    // Manage API: DELETE /playerGames/:id
    const deleteGames = () => {
        setState({
            dice1: 1,
            dice2: 1,
            rolling: false,
            result: "",
            totalScore: 0,
            rollCount: 0
        });
    }

    return (
        <>
            <div>
                <div className="flex justify-center space-x-6 my-4">
                    <Dice face={dice1} rolling={rolling} />
                    <Dice face={dice2} rolling={rolling} />
                </div>
                <button onClick={roll} disabled={rolling} className="py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-semibold hover:opacity-85">
                    {rolling ? "Rolling..." : "Roll Dice"}
                </button>
                <p className="text-white text-2xl">{result}</p>
                <p className="text-white text-2xl">Total Score: {totalScore} / {rollCount}</p>
                {rollCount > 0 && (
                    <button onClick={deleteGames} className="py-3 px-6 m-2 rounded-md bg-slate-800 text-white text-lg font-semibold hover:opacity-85">
                        Delete History
                    </button>
                )}
            </div>
        </>
    );
}

export default RollDice;