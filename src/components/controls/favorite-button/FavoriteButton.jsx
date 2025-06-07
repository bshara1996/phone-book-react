import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import classes from "./favoriteButton.module.css";

/**
 * FavoriteButton component for toggling favorite status
 * @param {Object} props Component props
 * @param {boolean} props.isFavorite Whether the item is favorited
 * @param {Function} props.onClick Click handler function
 * @returns {JSX.Element} FavoriteButton component
 */
const FavoriteButton = ({ isFavorite, onClick }) => {
  return (
    <button
      className={`${classes.favoriteButton} ${
        isFavorite ? classes.active : ""
      }`}
      onClick={onClick}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <HiStar className={classes.icon} />
      ) : (
        <HiOutlineStar className={classes.icon} />
      )}
    </button>
  );
};

export default FavoriteButton;
