import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Contacts from "../pages/Contacts/Contacts";
import Groups from "../pages/Groups/Groups";
import NotFound from "../pages/NotFound/NotFound";
import Layout from "./Layout";
import { PhoneBookProvider } from "../context/PhoneBookContext";
import classes from "./app.module.css";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <PhoneBookProvider>
        <section className={classes.app}>
          <Header />
          <Routes>
            {/* Login route */}
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            {/* Protected routes using Layout component */}
            <Route
              element={
                <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />
              }
            >
              <Route path="/home" element={<Home user={user} />} />
              <Route path="/contacts" element={<Contacts user={user} />} />
              <Route path="/groups" element={<Groups user={user} />} />
            </Route>

            {/* if nothing was found, show NotFound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </section>
      </PhoneBookProvider>
    </Router>
  );
}
