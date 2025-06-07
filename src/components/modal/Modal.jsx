import { useEffect } from "react";
import { HiX } from "react-icons/hi";
import classes from "./modal.module.css";

/**
 * Modal component for displaying content in a popup dialog
 * @param {Object} props Component props
 * @param {string} props.title Modal title
 * @param {ReactNode} props.children Modal content
 * @param {Function} props.onClose Function to close the modal
 * @returns {JSX.Element} Modal component
 */
const Modal = ({ title, children, onClose }) => {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classes.backdrop} onClick={handleBackdropClick}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2 className={classes.title}>{title}</h2>
          <button
            className={classes.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <HiX />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
