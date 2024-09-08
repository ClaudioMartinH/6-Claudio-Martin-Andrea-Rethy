import React from 'react';
import { GiInvertedDice1, GiInvertedDice2, GiInvertedDice3, GiInvertedDice4, GiInvertedDice5, GiInvertedDice6 } from 'react-icons/gi';

interface DiceProps {
    face: 1 | 2 | 3 | 4 | 5 | 6;
}

const Dice: React.FC<DiceProps> = ({ face }) => {
    const diceComponents: Record<number, JSX.Element> = {
        1: <GiInvertedDice1 className='text-white text-9xl' />,
        2: <GiInvertedDice2 className='text-white text-9xl' />,
        3: <GiInvertedDice3 className='text-white text-9xl' />,
        4: <GiInvertedDice4 className='text-white text-9xl' />,
        5: <GiInvertedDice5 className='text-white text-9xl' />,
        6: <GiInvertedDice6 className='text-white text-9xl' />
    };

    return (
        <div>
            {diceComponents[face]}
        </div>
    );
};

export default Dice;