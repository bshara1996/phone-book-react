import { useState, useEffect } from "react";
import { usePhoneBook } from "../../../context/PhoneBookContext";
import Button from "../../controls/button/Button";
import classes from "./contactForm.module.css";

/**
 * ContactForm component for adding/editing contacts
 * @param {Object} props Component props
 * @param {Object} props.contact Contact data for editing (optional)
 * @param {Function} props.onSubmit Submit handler
 * @param {Function} props.onCancel Cancel handler
 * @returns {JSX.Element} ContactForm component
 */
const ContactForm = ({ contact, onSubmit, onCancel }) => {
  const { groups } = usePhoneBook();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    image: "",
    groups: [],
    ...contact,
  });
  const [errors, setErrors] = useState({});

  // Reset form when contact prop changes
  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleGroupToggle = (group) => {
    setFormData((prev) => {
      const updatedGroups = prev.groups.includes(group)
        ? prev.groups.filter((g) => g !== group)
        : [...prev.groups, group];
      return { ...prev, groups: updatedGroups };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.image && !contact) {
      newErrors.image = "Image URL is required";
    }
    if (formData.groups.length === 0) {
      newErrors.groups = "Please select at least one group";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.inputGroup}>
        <label htmlFor="name" className={classes.label}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={classes.input}
          value={formData.name}
          onChange={handleInput}
        />
        {errors.name && <p className={classes.error}>{errors.name}</p>}
      </div>

      <div className={classes.inputGroup}>
        <label htmlFor="phone" className={classes.label}>
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={classes.input}
          value={formData.phone}
          onChange={handleInput}
        />
        {errors.phone && <p className={classes.error}>{errors.phone}</p>}
      </div>

      <div className={classes.inputGroup}>
        <label htmlFor="email" className={classes.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={classes.input}
          value={formData.email}
          onChange={handleInput}
        />
        {errors.email && <p className={classes.error}>{errors.email}</p>}
      </div>

      <div className={classes.inputGroup}>
        <label htmlFor="image" className={classes.label}>
          Image URL
        </label>
        <input
          type="text"
          id="image"
          name="image"
          className={classes.input}
          value={formData.image}
          onChange={handleInput}
          placeholder="https://i.pravatar.cc/200?img=1"
        />
        <p className={classes.helper}>
          Leave empty to use a random avatar from pravatar.cc
        </p>
        {errors.image && <p className={classes.error}>{errors.image}</p>}
        {formData.image && (
          <div className={classes.imagePreview}>
            <img src={formData.image} alt="Preview" />
          </div>
        )}
      </div>

      <div className={classes.inputGroup}>
        <label className={classes.label}>Groups</label>
        <div className={classes.groupsContainer}>
          {groups.map((group) => (
            <div key={group} className={classes.groupCheckbox}>
              <input
                type="checkbox"
                id={`group-${group}`}
                checked={formData.groups.includes(group)}
                onChange={() => handleGroupToggle(group)}
              />
              <label htmlFor={`group-${group}`}>{group}</label>
            </div>
          ))}
        </div>
        {errors.groups && <p className={classes.error}>{errors.groups}</p>}
      </div>

      <div className={classes.buttonGroup}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{contact ? "Update" : "Add"} Contact</Button>
      </div>
    </form>
  );
};

export default ContactForm;
