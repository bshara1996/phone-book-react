import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import classes from "./search.module.css";

/**
 * Search component for filtering contacts
 * @param {Object} props Component props
 * @param {string} props.value Current search value
 * @param {Function} props.onChange Change handler
 * @returns {JSX.Element} Search component
 */
const Search = ({ value, onChange }) => {
  return (
    <div className={classes.searchWrapper}>
      <HiOutlineSearch className={classes.searchIcon} />
      <input
        type="text"
        className={classes.searchInput}
        placeholder="Search contacts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
