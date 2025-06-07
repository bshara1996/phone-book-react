import { useState } from "react";
import { usePhoneBook } from "../../context/PhoneBookContext";
import ContactCard from "../cards/contactCard/ContactCard";
import Search from "../controls/search/Search";
import SortButton from "../controls/sort-button/SortButton";
import ViewToggleButton from "../controls/view-toggle-button/ViewToggleButton";
import AddButton from "../controls/add-button/AddButton";
import Button from "../controls/button/Button";
import Modal from "../modal/Modal";
import ContactForm from "../forms/ContactForm/ContactForm";
import classes from "./contactsList.module.css";

/**
 * ContactsList component for displaying and managing contacts
 * @param {Object} props Component props
 * @param {boolean} props.isAdmin Whether current user is admin
 * @param {string} props.group Optional group filter
 * @returns {JSX.Element} ContactsList component
 */
const ContactsList = ({ isAdmin, group }) => {
  const {
    favoriteContacts,
    viewMode,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    setViewMode,
    filteredContacts,
  } = usePhoneBook();

  // Local states for this list
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  // Filter contacts based on group and favorites
  const filtered = filteredContacts(group, searchTerm);

  // Apply sorting to filtered contacts
  const sortedContacts = [...filtered].sort((a, b) => {
    const aValue = a[sortConfig.key].toLowerCase();
    const bValue = b[sortConfig.key].toLowerCase();

    if (sortConfig.direction === "asc") {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    } else {
      if (aValue < bValue) return 1;
      if (aValue > bValue) return -1;
      return 0;
    }
  });

  const displayedContacts = showFavorites
    ? group
      ? favoriteContacts(group, searchTerm)
      : sortedContacts.filter((contact) => contact.isFavorite)
    : sortedContacts;

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleAdd = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const contact = displayedContacts.find((c) => c.id === id);
    if (confirm(`Are you sure you want to delete '${contact.name}'?`)) {
      deleteContact(id);
    }
  };

  // Add handler for delete all contacts
  const handleDeleteAll = () => {
    if (displayedContacts.length === 0) return;

    if (
      confirm(
        "Are you sure you want to delete all contacts? This action cannot be undone."
      )
    ) {
      displayedContacts.forEach((contact) => deleteContact(contact.id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingContact) {
      updateContact(editingContact.id, formData);
    } else {
      const newContact = {
        ...formData,
        id: crypto.randomUUID(),
        image:
          formData.image ||
          `https://i.pravatar.cc/200?img=${Math.floor(Math.random() * 70) + 1}`,
        isFavorite: false,
      };
      addContact(newContact);
    }
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };
  return (
    <div className={classes.container}>
      {isAdmin && (
        <div className={classes.adminControls}>
          <AddButton onClick={handleAdd} />
          <Button
            variant="danger"
            onClick={handleDeleteAll}
            title="Delete all visible contacts"
          >
            Delete All
          </Button>
        </div>
      )}
      <div className={classes.controls}>
        <div className={classes.controlsRow}>
          <div className={classes.searchContainer}>
            <Search value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className={classes.sortButtons}>
            <SortButton
              currentKey={sortConfig.key}
              sortKey="name"
              direction={sortConfig.direction}
              onSort={handleSort}
              label="Name"
            />
            <SortButton
              currentKey={sortConfig.key}
              sortKey="email"
              direction={sortConfig.direction}
              onSort={handleSort}
              label="Email"
            />
            <SortButton
              currentKey={sortConfig.key}
              sortKey="phone"
              direction={sortConfig.direction}
              onSort={handleSort}
              label="Phone"
            />
          </div>

          <div className={classes.verticalDivider}></div>

          <div className={classes.rightControls}>
            <ViewToggleButton view={viewMode} onToggle={setViewMode} />

            <Button
              variant={showFavorites ? "primary" : "secondary"}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              {showFavorites ? "Hide Favorites" : "Show Favorites"}
            </Button>
          </div>
        </div>
      </div>
      {displayedContacts.length === 0 ? (
        <div className={classes.emptyState}>
          <h3>No Contacts Found</h3>
          <p>Try adjusting your search terms</p>
        </div>
      ) : (
        <div className={classes.list}>
          {displayedContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              viewMode={viewMode}
              isAdmin={isAdmin}
              onEdit={() => handleEdit(contact)}
              onDelete={() => handleDelete(contact.id)}
              onToggleFavorite={() => toggleFavorite(contact.id)}
            />
          ))}
        </div>
      )}
      {isModalOpen && (
        <Modal
          title={editingContact ? "Edit Contact" : "Add Contact"}
          onClose={handleCloseModal}
        >
          <ContactForm
            contact={editingContact}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default ContactsList;
