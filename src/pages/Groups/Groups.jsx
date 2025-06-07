import { useState } from "react";
import ContactsList from "../../components/contactsList/ContactsList";
import GroupsList from "../../components/groupsList/GroupsList";
import { usePhoneBook } from "../../context/PhoneBookContext";
import pageClasses from "../page.module.css";
import classes from "./groups.module.css";

/**
 * Groups page component
 * @param {Object} props Component props
 * @param {Object} props.user Current user data
 * @returns {JSX.Element} Groups page component
 */
export default function Groups({ user }) {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const { groups, deleteGroup, deleteContactsInGroup } = usePhoneBook();
  const isAdmin = user?.role === "admin";

  const handleDeleteGroup = (group) => {
    deleteContactsInGroup(group);
    deleteGroup(group);
  };

  return (
    <div className={pageClasses.page}>
      <main>
        <div className={classes.header}>
          <h2 className={classes.title}>Contact Groups</h2>
        </div>
        <div className={classes.container}>
          <div className={classes.sidebar}>
            <GroupsList
              groups={groups}
              selectedGroup={selectedGroup}
              onSelectGroup={setSelectedGroup}
              isAdmin={isAdmin}
              onDeleteGroup={handleDeleteGroup}
            />
          </div>
          <div className={classes.content}>
            <ContactsList
              isAdmin={isAdmin}
              group={selectedGroup !== "all" ? selectedGroup : undefined}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
