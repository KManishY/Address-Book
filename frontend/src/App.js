import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Address from "./Pages/Address";
import Sidebar from "./component/Sidebar";
import UserDetailForm from "./component/UserDetailForm";

function App() {
  const navigate = useNavigate()
  return (
    <div className="App">
    {/* <UserDet

    ailForm/> */}
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logbook" element={<Address />} />
      </Routes>

      
    </div>
  );
}

export default App;
