import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import classes from './search.module.css';

/**
 * SearchBar component for searching functionality
 * @param {Object} props - Component props
 * @param {string} props.initialValue - Initial search value
 * @param {Function} props.onSearch - Function to call when search value changes
 * @param {string} props.placeholder - Placeholder text for search input
 * @param {number} props.debounceTime - Debounce time in milliseconds
 * @returns {JSX.Element} - SearchBar component
 */
const SearchBar = ({ initialValue, onSearch, placeholder, debounceTime }) => {
  const [searchValue, setSearchValue] = useState(initialValue || '');
  
  // Debounce search input to avoid excessive callbacks
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, debounceTime);
    
    return () => clearTimeout(timer);
  }, [searchValue, onSearch, debounceTime]);
  
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  
  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };
  
  return (
    <div className={classes.searchContainer}>
      <FaSearch className={classes.searchIcon} />
      <input
        type="text"
        className={classes.searchInput}
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        aria-label="Search"
      />
      {searchValue && (
        <button
          className={classes.clearButton}
          onClick={handleClear}
          aria-label="Clear search"
          title="Clear search"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  initialValue: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  debounceTime: PropTypes.number,
};

SearchBar.defaultProps = {
  initialValue: '',
  placeholder: 'Search...',
  debounceTime: 300,
};

export default SearchBar;