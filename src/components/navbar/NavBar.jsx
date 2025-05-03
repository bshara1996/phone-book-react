import { useNavigate, NavLink } from "react-router-dom";

import { links } from "../../app/data/navLinks";
import classes from "./navbar.module.css";

/**
 * Navigation bar component that displays navigation links
 *
 * @param {Function} onLogout - function to call when logout is clicked
 * @returns {JSX.Element} - navigation bar component with dynamic links
 */
export default function Navbar({ onLogout }) {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handles logout action by calling the onLogout callback and redirecting to login page
  const handleLogout = () => {
    // Call the onLogout callback if provided
    if (onLogout) onLogout(false);
    // Redirect to login page
    navigate("/login");
  };
  return (
    <nav className={classes.navbar}>
      <ul>
        {/* Map through navigation links from data file */}

        {links.map((el) => (
          <li key={crypto.randomUUID()}>
            <NavLink
              to={el.link}
              className={({ isActive }) =>
                /* Apply active class conditionally based on current route */

                `${classes.navLink} ${isActive ? classes.active : ""}`
              }
              onClick={el.name === "Logout" ? handleLogout : undefined}
            >
              {el.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
