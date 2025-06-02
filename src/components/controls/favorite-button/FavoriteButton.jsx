import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import classes from './favoriteButton.module.css';

/**
 * FavoriteButton component for toggling favorite status
 * @param {Object} props - Component props
 * @param {boolean} props.initialFavorite - Initial favorite state
 * @param {Function} props.onFavoriteChange - Function to call when favorite status changes with boolean parameter
 * @param {string} props.className - Additional CSS class names
 * @param {number|string} props.itemId - Optional ID of the item being favorited
 * @returns {JSX.Element} - FavoriteButton component
 */
const FavoriteButton = ({ initialFavorite, onFavoriteChange, className, itemId }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  
  const handleToggle = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    // If an itemId is provided, pass it along with the state
    if (itemId !== undefined) {
      onFavoriteChange(itemId, newFavoriteState);
    } else {
      onFavoriteChange(newFavoriteState);
    }
  };
  
  return (
    <button
      className={`${classes.favoriteButton} ${className}`}
      onClick={handleToggle}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <FaStar size={18} className={classes.favoriteIcon} />
      ) : (
        <FaRegStar size={18} className={classes.favoriteIcon} />
      )}
    </button>
  );
};

FavoriteButton.propTypes = {
  initialFavorite: PropTypes.bool,
  onFavoriteChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FavoriteButton.defaultProps = {
  initialFavorite: false,
  className: '',
};

export default FavoriteButton;