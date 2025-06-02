import PropTypes from "prop-types";
import { FaUsers } from "react-icons/fa";
import Button from "../controls/button/Button";
import classes from "./groupHeader.module.css";

/**
 * GroupHeader component displays information about the selected group
 */
const GroupHeader = ({ groupName, contactCount, onClearGroup }) => {
  // Get description based on group name
  const getGroupDescription = (name) => {
    const descriptions = {
      All: "All contacts in your phonebook",
      Family: "Family members and relatives",
      Friends: "Personal friends and acquaintances",
      Work: "Professional contacts and colleagues",
      School: "Classmates, teachers, and school connections",
      Gym: "Fitness partners and trainers",
      Neighbors: "People living nearby",
      "Book Club": "Fellow book enthusiasts",
    };

    return descriptions[name] || `Contacts in the ${name} group`;
  };

  return (
    <div className={classes.header}>
      <div className={classes.groupInfo}>
        <h1 className={classes.title}>
          <span
            className={`${classes.colorIndicator} ${
              classes[groupName.toLowerCase().replace(/\s+/g, "")]
            }`}
          ></span>
          {groupName}
        </h1>
        <p className={classes.description}>{getGroupDescription(groupName)}</p>
        <div className={classes.stats}>
          <div className={classes.statItem}>
            <FaUsers size={18} className={classes.statIcon} />
            <span>
              {contactCount} {contactCount === 1 ? "contact" : "contacts"}
            </span>
          </div>
        </div>
      </div>

      {groupName !== "All" && (
        <div className={classes.actions}>
          <Button
            variant="danger"
            onClick={onClearGroup}
            className={classes.clearButton}
          >
            Clear Group
          </Button>
        </div>
      )}
    </div>
  );
};

GroupHeader.propTypes = {
  groupName: PropTypes.string.isRequired,
  contactCount: PropTypes.number.isRequired,
  onClearGroup: PropTypes.func.isRequired,
};

export default GroupHeader;
