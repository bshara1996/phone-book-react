import { useNavigate, NavLink } from "react-router-dom";
import classes from "./navbar.module.css";

/**
 * Navigation bar component
 * @param {Function} onLogout - function to call when logout is clicked
 * @returns {JSX.Element} - navigation bar component
 */
export default function NavBar(onLogout) {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout(false)
    navigate("/login");
  };
  return (
    <nav className={classes.navbar}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            Login
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={handleLogout}>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
