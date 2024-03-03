import HomePage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";import Stories from "./pages/Stories";
import Story from "./pages/Story";
;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/stories" element={<Stories/>} />
        <Route path="/story/:id" element={<Story/>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
