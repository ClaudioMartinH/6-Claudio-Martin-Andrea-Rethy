// Manage API calls to get winner, looser and all rankings

const Rankings = () => {
  return (
    <section className='text-white flex-col'>
        <h1 className='text-3xl font-bold'>Rankings</h1>
        <div className='flex justify-between items-start space-x-8'>
            <div>
                <h2 className='text-2xl'>Winner</h2>
            </div>
            <div>
                <h2 className='text-2xl'>All Rankings</h2>
            </div>
            <div>
                <h2 className='text-2xl'>Loser</h2>
            </div>
        </div>
    </section>
  )
}

export default Rankings