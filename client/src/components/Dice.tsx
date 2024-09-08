import React from 'react';
import { GiInvertedDice1, GiInvertedDice2, GiInvertedDice3, GiInvertedDice4, GiInvertedDice5, GiInvertedDice6 } from 'react-icons/gi';

interface DiceProps {
    face: 1 | 2 | 3 | 4 | 5 | 6;
    rolling: boolean
}

const Dice: React.FC<DiceProps> = ({ face, rolling }) => {
    const diceComponents: Record<number, JSX.Element> = {
        1: <GiInvertedDice1 className={`text-white text-9xl ${rolling && "animate-wobble"}`} />,
        2: <GiInvertedDice2 className={`text-white text-9xl ${rolling && "animate-wobble"}`} />,
        3: <GiInvertedDice3 className={`text-white text-9xl ${rolling && "animate-wobble"}`} />,
        4: <GiInvertedDice4 className={`text-white text-9xl ${rolling && "animate-wobble"}`} />,
        5: <GiInvertedDice5 className={`text-white text-9xl ${rolling && "animate-wobble"}`} />,
        6: <GiInvertedDice6 className={`text-white text-9xl ${rolling && "animate-wobble"}`} />
    };

    return (
        <div>
            {diceComponents[face]}
        </div>
    );
};

export default Dice;