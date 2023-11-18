import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ChatScreen from "./components/ChatScreen";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/chatscreen" element={<ChatScreen />} />
    </Routes>
  );
}

export default App;
