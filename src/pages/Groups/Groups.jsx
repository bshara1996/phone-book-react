import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "../page.module.css";
import ContactsList from "../../components/ContactsList/ContactsList";
import GroupsList from "../../components/GroupsList/GroupsList";
import GroupHeader from "../../components/GroupHeader/GroupHeader";
import * as api from "../../utils/api";

import groupsClasses from "./groups.module.css";

/**
 * Groups page component
 * @returns {JSX.Element} - Groups page component
 */
export default function Groups({ user }) {
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [groupContactCount, setGroupContactCount] = useState(0);
  
  // Update contact count when selected group changes
  useEffect(() => {
    const contacts = api.getContacts();
    let count;
    
    if (selectedGroup === "All") {
      count = contacts.length;
    } else {
      count = contacts.filter(contact => 
        contact.groups && contact.groups.includes(selectedGroup)
      ).length;
    }
    
    setGroupContactCount(count);
  }, [selectedGroup]);
  
  // Handle clearing a group (removes the group from all contacts)
  const handleClearGroup = () => {
    if (selectedGroup === "All") return;
    
    const contacts = api.getContacts();
    const updatedContacts = contacts.map(contact => {
      if (contact.groups && contact.groups.includes(selectedGroup)) {
        return {
          ...contact,
          groups: contact.groups.filter(g => g !== selectedGroup)
        };
      }
      return contact;
    });
    
    // Update each contact that had the group
    updatedContacts.forEach(contact => {
      if (JSON.stringify(contact) !== JSON.stringify(contacts.find(c => c.id === contact.id))) {
        api.updateContact(contact.id, contact);
      }
    });
    
    // Reset to All group
    setSelectedGroup("All");
  };

  return (
    <div className={classes.page}>
      <main>
        <div className={groupsClasses.container}>
          <div className={groupsClasses.sidebar}>
            <GroupsList 
              onGroupSelect={setSelectedGroup} 
              selectedGroup={selectedGroup} 
            />
          </div>
          
          <div className={groupsClasses.content}>
            <GroupHeader 
              groupName={selectedGroup} 
              contactCount={groupContactCount}
              onClearGroup={handleClearGroup}
            />
            
            <ContactsList 
              user={user} 
              activeGroup={selectedGroup !== "All" ? selectedGroup : null} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

Groups.propTypes = {
  user: PropTypes.object
};
