import React from "react";
import classes from "./card.module.css";

/**
 * Card component for displaying feature cards with icon, title and description
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.icon - Icon component to display
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description
 * @returns {JSX.Element} - Card component
 */
const Card = ({ icon: Icon, title, description }) => {
  return (
    <div className={classes.card}>
      <div className={classes.iconContainer}>
        <Icon className={classes.icon} />
      </div>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default Card;
