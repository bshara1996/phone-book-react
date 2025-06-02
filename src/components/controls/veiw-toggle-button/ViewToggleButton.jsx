import { useState } from 'react';
import { FaList, FaTh } from 'react-icons/fa';
import PropTypes from 'prop-types';
import classes from './viewToggleButton.module.css';

const ViewToggleButton = ({ initialCompact, onViewChange, label }) => {
  const [isCompact, setIsCompact] = useState(initialCompact);
  
  const handleToggle = () => {
    const newCompactState = !isCompact;
    setIsCompact(newCompactState);
    onViewChange(newCompactState);
  };
  
  return (
    <button
      className={`${classes.viewToggleButton} ${isCompact ? classes.active : ''}`}
      onClick={handleToggle}
      aria-label={isCompact ? 'Switch to expanded view' : 'Switch to compact view'}
      title={isCompact ? 'Switch to expanded view' : 'Switch to compact view'}
    >
      {label || 'Simple View'}
    </button>
  );
};

ViewToggleButton.propTypes = {
  initialCompact: PropTypes.bool,
  onViewChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

ViewToggleButton.defaultProps = {
  initialCompact: false,
  label: 'Simple View',
};

export default ViewToggleButton;