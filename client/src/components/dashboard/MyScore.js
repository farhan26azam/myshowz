const MyScore = ({ score }) => {
  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold my-2">My Score</h1>
      <div className="p-4 bg-[var(--brown)] w-fit text-white rounded-xl text-center flex flex-col gap-2">
        <p className="text-4xl">{score}/5</p>
      </div>
    </div>
  );
};

export default MyScore;
