const NovelCard = ({ novel }) => {
  return (
    <div key={novel.id} className="bg-white p-4">
      <div>{novel?.title || "Title"}</div>
    </div>
  );
};

export default NovelCard;
