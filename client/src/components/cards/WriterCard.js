const WriterCard = ({ writer }) => {
  return (
    <div className="p-3">
      <div className="bg-white p-4">
        <div>{writer?.name || "Name"}</div>
        <div>{writer?.email || "Email"}</div>
      </div>
    </div>
  );
};

export default WriterCard;