import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Contacts from "../pages/Contacts/Contacts";
import Groups from "../pages/Groups/Groups";
import NotFound from "../pages/NotFound/NotFound";
import Layout from "./Layout";

import classes from "./app.module.css";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { users } from "./data/users";

// Import contacts service for initialization
import * as contactsService from "../utils/contactsService";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize contacts service when app loads
  useEffect(() => {
    // Pre-load contacts data
    contactsService.initializeContacts();
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  return (
    <section className={classes.app}>
      <Header />
      <Router>
        <Routes>
          {/* Login route */}
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          {/* Protected routes using Layout component */}
          <Route element={<Layout isLoggedIn={isLoggedIn} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/contacts" element={<Contacts user={user} />} />
            <Route path="/groups" element={<Groups user={user} />} />
          </Route>

          {/* if nothing was found, show NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </section>
  );
}

/*
try: 
1. type in URL: localhost:3000/about. what do you get?
2. add: <Route path="/about/*" element={<About />} />
   type in URL: localhost:3000/about/aaa/bbb. what do you get? 
3. add (instead of 2): <Route path="/about/:id" element={<About />} />    
   type in URL: localhost:3000/about/aaa. what do you get?
4. what is the difference betwee 2 and 3?

explanation:
<Route path="/about/page" />    // matches ONLY /about/page (v6 paths are exact by default)
<Route path="/about/*" />       // matches /about/anything/here - wildcard matches anything
<Route path="/about/:id" />     // matches /about/123 or /about/abc - captures value in params.id
<Route path="/about?" />        // matches both /about and / - ? means optional
<Route path="/about/:id/:tab" /> // matches /about/123/info - multiple parameters

you can combine these patterns, but remember that more specific routes should come before more general ones in your route definitions.

*/
