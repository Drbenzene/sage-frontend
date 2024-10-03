import "./App.css";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Favorites from "./Pages/Favorites";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>

      <Toaster position="top-right" richColors={true} />
    </div>
  );
}

export default App;
