import Navbar from "../components/global/Navbar";
import MyNovels from "../components/dashboard/MyNovels";
import WriterNavbar from "../components/dashboard/WriterNavbar";
import { store } from "../store";
import MyScore from "../components/dashboard/MyScore";
import MySkills from "../components/dashboard/MySkills";

const Dashboard = () => {
  const user = store();
  return (
    <div className="mx-12 ">
      <WriterNavbar />
      <div className="mt-24">
        <MyScore score={user?.user?.score} />
        <MySkills skills={user?.user?.skills}/>
        <MyNovels />
      </div>
    </div>
  );
};

export default Dashboard;
