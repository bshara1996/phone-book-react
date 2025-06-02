import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaUsers } from "react-icons/fa";
import * as api from "../../utils/api";
import classes from "./groupsList.module.css";

/**
 * GroupsList component displays a list of available groups with counts
 */
const GroupsList = ({ onGroupSelect, selectedGroup }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load groups data
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const contacts = api.getContacts();
        const availableGroups = api.getAvailableGroups();
        
        // Count contacts in each group
        const groupsWithCounts = availableGroups.map(group => {
          const count = contacts.filter(contact => 
            contact.groups && contact.groups.includes(group)
          ).length;
          
          return { name: group, count };
        });
        
        // Add "All" option
        const allContacts = { name: "All", count: contacts.length };
        
        setGroups([allContacts, ...groupsWithCounts]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load groups");
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

  if (loading) return <div className={classes.loading}>Loading groups...</div>;
  if (error) return <div className={classes.error}>{error}</div>;

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>
        <FaUsers size={24} className={classes.icon} />
        <span>Groups</span>
      </h2>
      <ul className={classes.groupList}>
        {groups.map((group) => (
          <li 
            key={group.name}
            className={`${classes.groupItem} ${selectedGroup === group.name ? classes.selected : ""}`}
            onClick={() => onGroupSelect(group.name)}
          >
            <div className={`${classes.groupColor} ${classes[group.name.toLowerCase().replace(/\s+/g, '')]}`}></div>
            <span className={classes.groupName}>{group.name}</span>
            <span className={classes.groupCount}>{group.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

GroupsList.propTypes = {
  onGroupSelect: PropTypes.func.isRequired,
  selectedGroup: PropTypes.string
};

export default GroupsList;
