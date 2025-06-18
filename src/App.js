import Home from "./Home";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Dash from "./Dash";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/Dash" element={<Dash />}/>

    </Routes>
    </>
  );
}

export default App;
