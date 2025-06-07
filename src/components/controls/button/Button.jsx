import React from "react";
import classes from "./button.module.css";

/**
 * Base Button component
 * @param {Object} props Component props
 * @param {string} props.className Additional CSS class
 * @param {string} props.variant Button variant ('primary', 'danger', etc.)
 * @param {ReactNode} props.children Button content
 * @param {Function} props.onClick Click handler
 * @param {string} props.title Button tooltip
 * @returns {JSX.Element} Button component
 */
const Button = ({
  className = "",
  variant = "primary",
  children,
  onClick,
  title,
  ...props
}) => {
  return (
    <button
      className={`${classes.button} ${classes[variant]} ${className}`}
      onClick={onClick}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
