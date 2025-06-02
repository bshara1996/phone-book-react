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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const usernamePattern = /^[a-zA-Z0-9_]{3,}$/;
  const passwordPattern = /^.{1,}$/;

  const togglePasswordVisibility = () => setShowPassword((v) => !v);
  const toggleConfirmVisibility = () => setShowConfirm((v) => !v);

  function handleInput(e) {
    if (error) setError("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function validate() {
    if (!usernamePattern.test(formData.username))
      return "Invalid username (min 3 chars, letters/numbers/underscore)";
    if (!passwordPattern.test(formData.password))
      return "Password must have at least one character";
    if (formData.password !== formData.confirm) return "Passwords do not match";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    const user = users.find(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password
    );
    if (user) {
      onLoginSuccess({
        username: user.username,
        name: user.name,
        type: user.type,
        role: user.role,
      });
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div>
      <h2 className={classes.loginTitle}>Login</h2>
      {error && <p className={classes.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.formGroup}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={handleInput}
            name="username"
            value={formData.username}
            id="username"
            pattern={usernamePattern.source}
          />
          <label htmlFor="username" className={classes.floatingLabel}>
            Username
          </label>
        </div>
        <div className={classes.passwordContainer}>
          <input
            name="password"
            onChange={handleInput}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={formData.password}
            id="password"
            pattern={passwordPattern.source}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={classes.passwordToggle}
            tabIndex={-1}
          >
            {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </button>
          <label htmlFor="password" className={classes.floatingLabel}>
            Password
          </label>
        </div>
        <div className={classes.passwordContainer}>
          <input
            name="confirm"
            onChange={handleInput}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            required
            value={formData.confirm}
            id="confirm"
            pattern={passwordPattern.source}
          />

          <button
            type="button"
            onClick={toggleConfirmVisibility}
            className={classes.passwordToggle}
            tabIndex={-1}
          >
            {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </button>
          <label htmlFor="confirm" className={classes.floatingLabel}>
            Confirm Password
          </label>
        </div>
        <button className={classes.passwordBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
