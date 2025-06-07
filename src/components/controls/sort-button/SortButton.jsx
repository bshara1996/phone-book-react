import React from "react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import classes from "./sortButton.module.css";

/**
 * SortButton component for sorting contacts
 * @param {Object} props Component props
 * @param {string} props.currentKey Current sort field
 * @param {string} props.sortKey This button's sort field
 * @param {string} props.direction Current sort direction
 * @param {Function} props.onSort Sort handler
 * @param {string} props.label Button label
 * @returns {JSX.Element} SortButton component
 */
const SortButton = ({ currentKey, sortKey, direction, onSort, label }) => {
  const isActive = currentKey === sortKey;

  return (
    <button
      className={`${classes.sortButton} ${isActive ? classes.active : ""}`}
      onClick={() => onSort(sortKey)}
      aria-label={`Sort by ${label}`}
    >
      <span>{label}</span>
      {isActive &&
        (direction === "asc" ? (
          <HiSortAscending className={classes.icon} />
        ) : (
          <HiSortDescending className={classes.icon} />
        ))}
    </button>
  );
};

export default SortButton;
