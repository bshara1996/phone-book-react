
import NavBar from "../../components/navbar/NavBar";
import classes from "../page.module.css";

/**
 * About page component
 * @param {Function} onLogout - function to call when logout is clicked
 * @returns {JSX.Element} - about page component
 */
export default function About({ onLogout }) {
  return (
    <div className={classes.page}>
      {/* Navigation bar component */}
      <NavBar onLogout={onLogout} />
      <h2>About</h2>
      <main>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          sapiente voluptate temporibus error commodi, porro blanditiis facilis
          autem! Officia ducimus modi beatae ipsum nulla tempore laborum quis
          debitis quisquam fuga?
        </p>
      </main>
    </div>
  );
}
