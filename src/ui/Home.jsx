import CreateUser from '../features/users/CreateUser'

function Home() {
  return (
    <div className='my-4 px-4 text-center sm:my-8' >
      <h1 className="mb-8 text-center text-5xl	font-semibold "  >
        The best pizza.
        <br />
        <span className="text-3xl text-yellow-500 md:text-4xl">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
