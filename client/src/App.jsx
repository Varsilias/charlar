import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import SetAvatar from "./pages/SetAvatar";

function App() {
  return (
    <Routes>
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route
        exact
        path="/set-avatar"
        element={
          <ProtectedRoute>
            <SetAvatar />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
