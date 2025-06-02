import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import classes from './addButton.module.css';

/**
 * AddButton component for adding new items
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Function to call when button is clicked
 * @param {string} props.label - Button label
 * @returns {JSX.Element} - AddButton component
 */
const AddButton = ({ onClick, label }) => {
  return (
    <button
      className={classes.addButton}
      onClick={onClick}
      aria-label={`Add ${label}`}
      title={`Add ${label}`}
    >
      <FaPlus size={12} className={classes.addIcon} />
      <span> {label}</span>
    </button>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
};

AddButton.defaultProps = {
  label: 'New',
};

export default AddButton;