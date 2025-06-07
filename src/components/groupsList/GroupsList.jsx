import { useState } from "react";
import { usePhoneBook } from "../../context/PhoneBookContext";
import AddButton from "../controls/add-button/AddButton";
import Modal from "../modal/Modal";
import GroupForm from "../forms/GroupForm/GroupForm";
import classes from "./groupsList.module.css";

export default function GroupsList({
  groups = [],
  selectedGroup = "all",
  onSelectGroup,
  isAdmin = false,
  onDeleteGroup,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contacts, addGroup } = usePhoneBook();

  const handleAddGroup = () => {
    setIsModalOpen(true);
  };

  const handleSubmitGroup = (groupName) => {
    addGroup(groupName);
    setIsModalOpen(false);
  };

  // Count contacts in each group
  const getGroupCount = (group) => {
    if (group === "all") {
      return contacts.length;
    }
    return contacts.filter((contact) => contact.groups.includes(group)).length;
  };

  // Get color for group indicator
  const getGroupColor = (group) => {
    switch (group) {
      case "all":
        return "#3b82f6"; // blue
      case "Family":
        return "#22c55e"; // green
      case "Work":
        return "#0ea5e9"; // light blue
      case "Friends":
        return "#f59e0b"; // orange
      default:
        return "#94a3b8"; // gray
    }
  };
  return (
    <>
      {isAdmin && (
        <div className={classes.addButtonContainer}>
          <AddButton onClick={handleAddGroup} label="Add Group" />
        </div>
      )}
      <div className={classes.groupsContainer}>
        <ul className={classes.groupList}>
          <li
            className={`${classes.groupItem} ${
              selectedGroup === "all" ? classes.selected : ""
            }`}
            onClick={() => onSelectGroup("all")}
          >
            <div
              className={classes.groupIndicator}
              style={{ backgroundColor: getGroupColor("all") }}
            />
            <span className={classes.groupName}>All</span>
            <span className={classes.count}>{getGroupCount("all")}</span>
          </li>

          {groups.map((group) => (
            <li
              key={group}
              className={`${classes.groupItem} ${
                selectedGroup === group ? classes.selected : ""
              }`}
              onClick={() => onSelectGroup(group)}
            >
              <div
                className={classes.groupIndicator}
                style={{ backgroundColor: getGroupColor(group) }}
              />
              <span className={classes.groupName}>{group}</span>
              <span className={classes.count}>{getGroupCount(group)}</span>
              {isAdmin && onDeleteGroup && (
                <button
                  className={classes.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm(
                        `Are you sure you want to delete the ${group} group?`
                      )
                    ) {
                      onDeleteGroup(group);
                    }
                  }}
                  title={`Delete ${group} group`}
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <Modal title="Add New Group" onClose={() => setIsModalOpen(false)}>
          <GroupForm
            onSubmit={handleSubmitGroup}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
