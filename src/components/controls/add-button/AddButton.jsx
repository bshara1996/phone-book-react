import React from "react";
import { HiPlus } from "react-icons/hi";
import classes from "./addButton.module.css";

/**
 * AddButton component for adding new items
 * @param {Object} props Component props
 * @param {Function} props.onClick Click handler
 * @param {string} props.label Button label
 * @returns {JSX.Element} AddButton component
 */
const AddButton = ({ onClick, label = "Add New" }) => {
  return (
    <button className={classes.addButton} onClick={onClick} aria-label={label}>
      <HiPlus className={classes.icon} />
      <span>{label}</span>
    </button>
  );
};

export default AddButton;
