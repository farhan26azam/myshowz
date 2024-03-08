import herobg from "../../assets/herobg.jpg";

const Hero = ({ user }) => {
  return (
    <section
      className={`section-1 text-gray-800 h-screen flex items-center justify-center bg-cover`}
      style={{
        backgroundImage: `url(${herobg})`,
      }}
    >
      <div className="text-center bg-white bg-opacity-80 px-20 rounded-lg py-24">
        <h1 className="text-8xl font-semibold">Welcome to Talecrafters</h1>
        <h3 className="text-3xl">the best place to read and write stories.</h3>
        {user && (
          <div className="flex justify-center gap-2 my-2">
            <button className="bg-white p-2 rounded-md border-[1px] border-black">
              I am a reader
            </button>
            <button className="bg-white p-2 rounded-md border-[1px] border-black">
              I am a writer
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
