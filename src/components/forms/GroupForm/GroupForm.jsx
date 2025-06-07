import { useState } from "react";
import Button from "../../controls/button/Button";
import classes from "./groupForm.module.css";

const GroupForm = ({ onSubmit, onCancel }) => {
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError("Group name is required");
      return;
    }
    onSubmit(groupName.trim());
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.inputGroup}>
        <label htmlFor="groupName" className={classes.label}>
          Group Name
        </label>
        <input
          type="text"
          id="groupName"
          className={classes.input}
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
            setError("");
          }}
          placeholder="Enter group name"
        />
        {error && <p className={classes.error}>{error}</p>}
      </div>
      <div className={classes.buttonGroup}>
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit">Add Group</Button>
      </div>
    </form>
  );
};

export default GroupForm;
