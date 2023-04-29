import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ripemd from "./Ripemd";
import Navbar from "./Navbar";
import Encrypt from "./Encrypt";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/hash" element={<Ripemd />} />
          <Route path="/encrypt" element={<Encrypt />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
