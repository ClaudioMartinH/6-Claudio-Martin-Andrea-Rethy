import Sidebar, { SidebarItem } from '../components/SideBar';
import dice from '../assets/dice.jpg'
import RollDice from '../components/RollDice';
import Players from '../components/Players';
import Rankings from '../components/Rankings';
import ListGames from '../components/ListGames';
import { FaDice, FaUsers } from "react-icons/fa";
import { FaRankingStar, FaList } from "react-icons/fa6";
import { useState } from 'react';


const MainPage: React.FC = () => {
  const [view, setView] = useState(0);

  return (
    <section className='flex justify-between items-center min-h-full bg-slate-800' style={{ backgroundImage: `url(${dice})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Sidebar>
          <SidebarItem icon={<FaDice size={20}/>} text={"Game"} active={view === 0} onClick={() => setView(0)}/>
          <SidebarItem icon={<FaUsers size={20}/>} text={"Players"} active={view === 1} onClick={() => setView(1)}/>
          <SidebarItem icon={<FaRankingStar size={20}/>} text={"Ranking"} active={view === 2} onClick={() => setView(2)}/>
          <SidebarItem icon={<FaList size={20}/>} text={"My Games"} active={view === 3} onClick={() => setView(3)}/>
        </Sidebar>
        <div className='py-20 px-48 rounded-xl border border-slate-500 backdrop-blur-lg shadow-md shadow-slate-600'>
            {view === 0 && <RollDice />}
            {view === 1 && <Players />}
            {view === 2 && <Rankings />}
            {view === 3 && <ListGames />}
        </div>
        <div></div>
    </section>
  );
};

export default MainPage;
