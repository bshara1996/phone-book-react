import { useState } from 'react';
import { FaSort, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import PropTypes from 'prop-types';
import classes from './sortButton.module.css';

/**
 * SortButton component for sorting functionality
 * @param {Object} props - Component props
 * @param {string} props.field - Field to sort by
 * @param {Function} props.onSort - Function to call when sorting changes with (field, direction) parameters
 * @param {string} props.label - Button label
 * @param {string} props.initialSortField - Initially active sort field
 * @param {string} props.initialSortDirection - Initial sort direction ('asc' or 'desc')
 * @returns {JSX.Element} - SortButton component
 */
const SortButton = ({ field, onSort, label, initialSortField, initialSortDirection }) => {
  // Use shared state if provided via props, otherwise use internal state
  const [sortField, setSortField] = useState(initialSortField || 'name');
  const [sortDirection, setSortDirection] = useState(initialSortDirection || 'asc');
  
  const isActive = sortField === field;
  
  const handleClick = () => {
    let newDirection = sortDirection;
    let newField = field;
    
    if (sortField === field) {
      // Toggle sort direction if same field
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set new field and default to ascending
      newField = field;
      newDirection = 'asc';
    }
    
    // Update internal state
    setSortField(newField);
    setSortDirection(newDirection);
    
    // Call parent callback
    onSort(newField, newDirection);
  };
  
  return (
    <button
      className={`${classes.sortButton} ${isActive ? classes.active : ''}`}
      onClick={handleClick}
      aria-label={`Sort by ${field} ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
      title={`Sort by ${field} ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
    >
      {label} {isActive && (sortDirection === 'asc' ? '↓' : '↑')}
    </button>
  );
};

SortButton.propTypes = {
  field: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  initialSortField: PropTypes.string,
  initialSortDirection: PropTypes.oneOf(['asc', 'desc']),
};

SortButton.defaultProps = {
  initialSortField: 'name',
  initialSortDirection: 'asc',
};

export default SortButton;