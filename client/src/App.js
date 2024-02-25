import HomePage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
