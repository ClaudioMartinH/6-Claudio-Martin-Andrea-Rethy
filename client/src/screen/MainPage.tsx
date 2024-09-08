import dice from '../assets/dice.jpg'
import RollDice from '../components/RollDice';


const MainPage: React.FC = () => {

  return (
    <section className='flex justify-center items-center min-h-full p-20 bg-slate-800' style={{ backgroundImage: `url(${dice})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='p-20 min-w-full rounded-xl border border-slate-500 backdrop-blur-lg shadow-md shadow-slate-600'>
            <RollDice />
        </div>
    </section>
  );
};

export default MainPage;
