import classes from "./form.module.css";

import { useState } from "react";
import { users } from "../../../app/data/users";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

/**
 * Login Form Component
 * Handles user authentication against the users data
 *
 * @param {Object} props - Component props
 * @param {Function} props.onLoginSuccess - Callback function triggered on successful login
 * @returns {JSX.Element} - Rendered login form
 */
export default function Form({ onLoginSuccess }) {
  // State for form input values
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State for error message display
  const [error, setError] = useState("");

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Toggles password field between visible text and hidden characters
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Handles form submission
   * Validates user credentials against the users data
   * Calls onLoginSuccess callback if authentication succeeds
   * Displays error message if authentication fails
   *
   * @param {Event} e - Form submit event
   */
  function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear any existing error messages

    // Validate against user data from users.js
    const user = users.find(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password
    );

    if (user) {
      // Call success handler with the found user
      onLoginSuccess({ username: user.username, name: user.name });
    } else {
      // Show error message
      setError("Invalid username or password");
    }
  }

  /**
   * Handles input field changes
   * Updates form state and clears error messages when user types
   *
   * @param {Event} e - Input change event
   */
  function handleInput(e) {
    // Clear error message when user types
    if (error) {
      setError("");
    }

    // Update form data using the input name as key
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div>
      {/* Form title */}
      <h2 className={classes.loginTitle}>Login</h2>

      {/* Conditional error message display */}
      {error && <p className={classes.errorMessage}>{error}</p>}

      {/* Login form */}
      <form onSubmit={handleSubmit} className={classes.form}>
        {/* Username input field */}
        <input
          type="text"
          placeholder="Username"
          required
          onChange={handleInput}
          name="username"
          value={formData.username}
        />

        {/* Password input container with toggle visibility button */}
        <div className={classes.passwordContainer}>
          <input
            name="password"
            onChange={handleInput}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={formData.password}
          />

          {/* Toggle password visibility button */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={classes.passwordToggle}
          >
            {/* Show different icon based on password visibility state */}
            {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </button>
        </div>

        {/* Submit button */}
        <button className={classes.passwordBtn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
