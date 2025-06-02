import PropTypes from "prop-types";
import FavoriteButton from "../../controls/favorite-button/FavoriteButton";
import Button from "../../controls/button/Button";
import classes from "./ContactCard.module.css";

/**
 * ContactCard component for displaying contact information
 * @param {Object} props - Component props
 * @param {Object} props.contact - Contact data
 * @param {boolean} props.isAdmin - Whether the current user is an admin
 * @param {boolean} props.isCompact - Whether to show compact view
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 * @param {Function} props.onToggleFavorite - Function to call when favorite button is clicked
 * @returns {JSX.Element} - ContactCard component
 */
const ContactCard = ({
  contact,
  isAdmin,
  isCompact,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  const { id, name, phone, email, image, groups, isFavorite } = contact;

  return (
    <div className={`${classes.card} ${isCompact ? classes.compact : ""}`}>
      <div className={classes.cardContent}>
        <div className={classes.imageContainer}>
          <img
            src={image || "https://randomuser.me/api/portraits/men/1.jpg"}
            alt={name}
            className={classes.avatar}
          />
          <div className={classes.favoriteContainer}>
            <FavoriteButton
              initialFavorite={isFavorite}
              onFavoriteChange={() => onToggleFavorite(id)}
              className={classes.favoriteButton}
              itemId={id}
            />
          </div>
        </div>

        <div className={classes.info}>
          <h3 className={classes.name}>{name}</h3>
          <p className={classes.phone}>{phone}</p>
          <p className={classes.email}>{email}</p>

          {groups && groups.length > 0 && (
            <div className={classes.groups}>
              {groups.map((group) => (
                <span key={group} className={classes.groupTag}>
                  {group}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={classes.actions}>
        {isAdmin && (
          <>
            <Button variant="primary" onClick={() => onEdit(contact)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDelete(id)}>
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string,
    groups: PropTypes.arrayOf(PropTypes.string),
    isFavorite: PropTypes.bool,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isCompact: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

ContactCard.defaultProps = {
  isCompact: false,
};

export default ContactCard;
