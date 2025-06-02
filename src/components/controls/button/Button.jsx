import PropTypes from 'prop-types';
import classes from './button.module.css';

/**
 * Button component for consistent button styling across the application
 * @param {Object} props - Component props
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {string} props.variant - Button variant (primary, secondary, danger, text)
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {Function} props.onClick - Function to call when button is clicked
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS class names
 * @param {Object} props.rest - Additional props to pass to the button element
 * @returns {JSX.Element} - Button component
 */
const Button = ({
  type,
  variant,
  disabled,
  onClick,
  children,
  className,
  ...rest
}) => {
  const buttonClasses = [
    classes.button,
    classes[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'text']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  disabled: false,
  onClick: () => {},
  className: '',
};

export default Button;