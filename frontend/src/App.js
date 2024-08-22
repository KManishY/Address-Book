import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Address from "./Pages/Address";

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Login />} />
      </Routes> */}
      <Address/>
    </div>
  );
}

export default App;
