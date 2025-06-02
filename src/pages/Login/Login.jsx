import { useNavigate } from "react-router-dom";

import LoginForm from "../../components/forms/loginForm/LoginForm";
import { users } from "../../app/data/users";

import pageClasses from "../page.module.css";
import classes from "./login.module.css";

/**
 * Login page component
 * @param {Function} onLogin - function to call when login is successful
 * @returns {JSX.Element} - login page component
 */
export default function Login({ onLogin }) {
  const navigate = useNavigate();

  //Handles successful login
  function handleLoginSuccess(userData) {
    // Store role information along with login state
    onLogin({ ...userData, isAuthenticated: true });
    navigate("/home");
  }

  return (
    <div className={pageClasses.page}>
      {/* Main login container with form and test accounts */}
      <div className={classes.loginContainer}>
        {/* Login form component with success callback */}
        <LoginForm onLoginSuccess={handleLoginSuccess} />

        {/* Test accounts section for development/testing */}
        <div className={classes.testAccountsContainer}>
          <p>Available test accounts:</p>

          {/* Map through available test users */}
          {users.map((account) => (
            <div className={classes.accountItem} key={crypto.randomUUID()}>
              Username: <b>{account.username}</b> | Password:{" "}
              <b>{account.password}</b> | Role: <b>{account.role}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
