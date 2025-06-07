import React from "react";
import { HiViewList, HiViewGrid } from "react-icons/hi";
import classes from "./viewToggleButton.module.css";

/**
 * ViewToggleButton component for switching between full and compact views
 * @param {Object} props Component props
 * @param {string} props.view Current view mode ('full' or 'compact')
 * @param {Function} props.onToggle Toggle handler
 * @returns {JSX.Element} ViewToggleButton component
 */
const ViewToggleButton = ({ view, onToggle }) => {
  return (
    <button
      className={classes.toggleButton}
      onClick={() => onToggle(view === "full" ? "compact" : "full")}
      aria-label={`Switch to ${view === "full" ? "compact" : "full"} view`}
    >
      {view === "full" ? (
        <HiViewList className={classes.icon} />
      ) : (
        <HiViewGrid className={classes.icon} />
      )}
    </button>
  );
};

export default ViewToggleButton;
