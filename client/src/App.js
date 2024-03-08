import HomePage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";import Stories from "./pages/Stories";
import Story from "./pages/Story";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WriteNovel from "./pages/WriteNovel";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/stories" element={<Stories/>} />
        <Route path="/story/:id" element={<Story/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/write/new" element={<WriteNovel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
