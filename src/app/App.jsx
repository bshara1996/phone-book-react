import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Contacts from "../pages/Contacts/Contacts";
import NotFound from "../pages/NotFound/NotFound";

import classes from "./app.module.css";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function App() {
  const [isLoggedIn, setIsLogin] = useState(false);

  return (
    <section className={classes.app}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={setIsLogin} />} />
          {/* bad solution because active link in case not loggedin is Home amd not Login */}
          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <Home onLogout={setIsLogin} />
              ) : (
                <Login onLogin={setIsLogin} />
              )
            }
          />

          {/* good solution */}
          <Route
            path="/contacts"
            element={
              isLoggedIn ? <Contacts onLogout={setIsLogin} /> : <Navigate to="/" />
            }
          />

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
