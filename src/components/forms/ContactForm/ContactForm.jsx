import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './contactForm.module.css';

/**
 * Contact form component for adding and editing contacts
 * @param {Object} props - Component props
 * @param {Object|null} props.contact - Contact to edit (null for new contact)
 * @param {Function} props.onSubmit - Function to call when form is submitted
 * @param {Function} props.onCancel - Function to call when form is cancelled
 * @param {Array} props.groups - Available groups for selection
 * @returns {JSX.Element} - Contact form component
 */
const ContactForm = ({ contact, onSubmit, onCancel, groups }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    groups: [],
    image: `https://i.pravatar.cc/200?img=${Math.floor(Math.random() * 70) + 1}`,
  });
  
  // Form validation errors
  const [errors, setErrors] = useState({});
  
  // Initialize form with contact data if editing
  useEffect(() => {
    if (contact) {
      setFormData({
        ...contact,
        // Ensure groups is an array
        groups: contact.groups || [],
      });
    }
  }, [contact]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Handle group selection
  const handleGroupChange = (e) => {
    const { value, checked } = e.target;
    
    setFormData({
      ...formData,
      groups: checked
        ? [...formData.groups, value]
        : formData.groups.filter(group => group !== value),
    });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/[-()\s]/g, ''))) {
      newErrors.phone = 'Enter a valid phone number';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? classes.errorInput : ''}
        />
        {errors.name && <div className={classes.errorMessage}>{errors.name}</div>}
      </div>
      
      <div className={classes.formGroup}>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? classes.errorInput : ''}
        />
        {errors.phone && <div className={classes.errorMessage}>{errors.phone}</div>}
      </div>
      
      <div className={classes.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? classes.errorInput : ''}
        />
        {errors.email && <div className={classes.errorMessage}>{errors.email}</div>}
      </div>
      
      <div className={classes.formGroup}>
        <label>Groups</label>
        <div className={classes.checkboxGroup}>
          {groups.map((group) => (
            <div key={group} className={classes.checkbox}>
              <input
                type="checkbox"
                id={`group-${group}`}
                name="groups"
                value={group}
                checked={formData.groups.includes(group)}
                onChange={handleGroupChange}
              />
              <label htmlFor={`group-${group}`}>{group}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className={classes.buttonGroup}>
        <button type="button" className={classes.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submitButton}>
          {contact ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  contact: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
};

ContactForm.defaultProps = {
  contact: null,
};

export default ContactForm;
