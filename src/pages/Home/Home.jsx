import { Link } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navbar/NavBar";
import classes from "../page.module.css";

/**
 * Home page component
 * @param {Function} onLogout - function to call when logout is clicked
 * @returns {JSX.Element} - home page component
 */
export default function Home({ onLogout }) {
  return (
    <div className={classes.page}>
      {/* Navigation bar component */}
      <NavBar onLogout={onLogout} />
      <h2>Home</h2>
      <main>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis,
          impedit.
        </p>
        <p>
          Go to
          <Link to="/about">About</Link>
        </p>
      </main>
    </div>
  );
}
