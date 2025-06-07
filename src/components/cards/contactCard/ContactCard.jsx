import { HiPhone, HiMail, HiPencil, HiTrash } from "react-icons/hi";
import FavoriteButton from "../../controls/favorite-button/FavoriteButton";
import classes from "./ContactCard.module.css";

/**
 * ContactCard component for displaying contact information
 * @param {Object} props Component props
 * @param {Object} props.contact Contact data
 * @param {string} props.viewMode View mode ('full' or 'compact')
 * @param {boolean} props.isAdmin Whether current user is admin
 * @param {Function} props.onEdit Edit handler
 * @param {Function} props.onDelete Delete handler
 * @param {Function} props.onToggleFavorite Favorite toggle handler
 * @returns {JSX.Element} ContactCard component
 */
const ContactCard = ({
  contact,
  viewMode = "full",
  isAdmin,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  const { name, phone, email, image, groups, isFavorite } = contact;

  if (viewMode === "compact") {
    return (
      <div className={`${classes.card} ${classes.compactView}`}>
        <div className={classes.imageContainer}>
          <img src={image} alt={name} />
        </div>
        <div className={classes.info}>
          <h3 className={classes.name}>{name}</h3>
          <div className={classes.contactItem}>
            <HiPhone className={classes.icon} />
            <span>{phone}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={() => onToggleFavorite(contact.id)}
          />
          {isAdmin && (
            <>
              <button
                className={`${classes.actionButton} ${classes.editButton}`}
                onClick={() => onEdit(contact)}
                aria-label="Edit contact"
              >
                <HiPencil />
              </button>
              <button
                className={`${classes.actionButton} ${classes.deleteButton}`}
                onClick={() => onDelete(contact.id)}
                aria-label="Delete contact"
              >
                <HiTrash />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${classes.card} ${classes.fullView}`}>
      <div className={classes.header}>
        <div className={classes.imageContainer}>
          <img src={image} alt={name} />
        </div>
        <div className={classes.actions}>
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={() => onToggleFavorite(contact.id)}
          />
          {isAdmin && (
            <>
              <button
                className={`${classes.actionButton} ${classes.editButton}`}
                onClick={() => onEdit(contact)}
                aria-label="Edit contact"
              >
                <HiPencil />
              </button>
              <button
                className={`${classes.actionButton} ${classes.deleteButton}`}
                onClick={() => onDelete(contact.id)}
                aria-label="Delete contact"
              >
                <HiTrash />
              </button>
            </>
          )}
        </div>
      </div>

      <div className={classes.info}>
        <h3 className={classes.name}>{name}</h3>
        <div className={classes.contactInfo}>
          <div className={classes.contactItem}>
            <HiPhone className={classes.icon} />
            <span>{phone}</span>
          </div>
          <div className={classes.contactItem}>
            <HiMail className={classes.icon} />
            <span>{email}</span>
          </div>
        </div>
        <div className={classes.groups}>
          {groups.map((group) => (
            <span key={group} className={classes.group}>
              {group}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
