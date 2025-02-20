import React from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import WelcomePage from "./components/WelcomPage.jsx";
import GiveKudos from "./components/GiveKudos";
import Analytics from "./components/Analytics";
import Login from './components/Login'
const App = () => {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('user');
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
    
        <Route path="*" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<Login />} />
          <Route path="/landing-page" element={ <ProtectedRoute><WelcomePage /></ProtectedRoute>} />
          <Route path="/analytics" element={ <ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route
            path="/give-kudos"
            element={
              <ProtectedRoute>
                <GiveKudos />
              </ProtectedRoute>
            }
          />
        </Routes>
    </Router>
  );
};

export default App;
