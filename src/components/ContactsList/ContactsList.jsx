import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";

// Import components
import Modal from "../Modal/Modal";
import ContactCard from "../cards/contactCard/ContactCard";
import ContactForm from "../forms/ContactForm/ContactForm";
import SearchBar from "../controls/search/Search";
import Button from "../controls/button/Button";
import SortButton from "../controls/sort-button/SortButton";
import FavoriteButton from "../controls/favorite-button/FavoriteButton";
import ViewToggleButton from "../controls/veiw-toggle-button/ViewToggleButton";
import AddButton from "../controls/add-button/AddButton";
import * as api from "../../utils/api";

import classes from "./contactsList.module.css";

const ContactsList = ({ user, activeGroup }) => {
  // State variables
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  // Available groups for contacts
  const availableGroups = api.getAvailableGroups();

  const isAdmin = user?.role === "admin";

  // Load contacts once
  useEffect(() => {
    async function loadData() {
      const result = await api.loadContacts();
      setContacts(result.contacts);
      setLoading(false);
      setError(result.error);
    }
    loadData();
  }, []);

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone?.includes(searchQuery) ||
        contact.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFavorites = showFavorites ? contact.favorite : true;
      const matchesGroup = activeGroup
        ? contact.groups && contact.groups.includes(activeGroup)
        : true;
      return matchesSearch && matchesFavorites && matchesGroup;
    });
  }, [contacts, searchQuery, showFavorites, activeGroup]);

  // Sort contacts
  const sortedContacts = useMemo(() => {
    return [...filteredContacts].sort((a, b) => {
      const valueA = a[sortField]?.toLowerCase() || "";
      const valueB = b[sortField]?.toLowerCase() || "";
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }, [filteredContacts, sortField, sortDirection]);

  // Event handlers
  const handleToggleFavorite = (id) => {
    // Toggle favorite locally
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
    );
    // Update the API state
    api.toggleFavorite(id);
    // Update local state
    setContacts(updatedContacts);
  };

  const handleAddContact = () => {
    setCurrentContact(null);
    setModalTitle("Add New Contact");
    setIsModalOpen(true);
  };

  const handleEditContact = (contact) => {
    setCurrentContact(contact);
    setModalTitle("Edit Contact");
    setIsModalOpen(true);
  };

  const handleContactFormSubmit = (formData) => {
    if (currentContact) {
      // Update contact
      const updatedContacts = contacts.map((contact) =>
        contact.id === currentContact.id
          ? { ...formData, id: contact.id, favorite: contact.favorite }
          : contact
      );
      // Update the API state
      api.updateContact(currentContact.id, formData);
      // Update local state
      setContacts(updatedContacts);
    } else {
      // Add new contact
      const newId =
        contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1;
      const newContact = { ...formData, id: newId, favorite: false };
      // Update the API state
      api.addContact(newContact);
      // Update local state
      setContacts([...contacts, newContact]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteContact = (id) => {
    // Filter out the deleted contact locally
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    // Update the API state
    api.deleteContact(id);
    // Update local state
    setContacts(updatedContacts);
  };

  const handleDeleteAllContacts = () => {
    // Clear contacts locally
    api.clearContacts();
    // Update local state
    setContacts([]);
  };

  if (loading)
    return <div className={classes.loading}>Loading contacts...</div>;
  if (error) return <div className={classes.error}>{error}</div>;

  return (
    <div className={classes.contactsListContainer}>
      {/* Controls */}
      <div className={classes.controls}>
        <div className={classes.topRow}>
          <SearchBar
            initialValue={searchQuery}
            onSearch={setSearchQuery}
            placeholder="Search contacts..."
            debounceTime={300}
          />

          <div className={classes.buttonGroup}>
            <FavoriteButton
              initialFavorite={showFavorites}
              onFavoriteChange={setShowFavorites}
              className={classes.actionButton}
            />

            {isAdmin && (
              <Button
                variant="danger"
                onClick={handleDeleteAllContacts}
                disabled={!sortedContacts.length}
                className={classes.deleteAllButton}
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        <div className={classes.bottomRow}>
          <div className={classes.sortButtons}>
            <ViewToggleButton
              initialCompact={compactView}
              onViewChange={setCompactView}
              label="Simple View"
            />
            <SortButton
              field="name"
              initialSortField={sortField}
              initialSortDirection={sortDirection}
              onSort={(f, d) => {
                setSortField(f);
                setSortDirection(d);
              }}
              label="Name"
            />
            <SortButton
              field="email"
              initialSortField={sortField}
              initialSortDirection={sortDirection}
              onSort={(f, d) => {
                setSortField(f);
                setSortDirection(d);
              }}
              label="Email"
            />
            <SortButton
              field="phone"
              initialSortField={sortField}
              initialSortDirection={sortDirection}
              onSort={(f, d) => {
                setSortField(f);
                setSortDirection(d);
              }}
              label="Phone"
            />
          </div>

          {isAdmin && (
            <div className={classes.buttonGroup}>
              <AddButton onClick={handleAddContact} label="Contact" />
            </div>
          )}
        </div>
      </div>

      {/* Contact list */}
      {sortedContacts.length === 0 ? (
        <div className={classes.emptyState}>
          {showFavorites ? (
            <p>No favorites found.</p>
          ) : searchQuery ? (
            <p>No matching contacts.</p>
          ) : (
            <p>No contacts available.</p>
          )}
        </div>
      ) : (
        <div className={classes.cards}>
          {sortedContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={{
                ...contact,
                isFavorite: contact.favorite,
                // Ensure we have an image for each contact
                image:
                  contact.image ||
                  `https://randomuser.me/api/portraits/${
                    contact.gender === "female" ? "women" : "men"
                  }/${contact.id % 99}.jpg`,
              }}
              isAdmin={isAdmin}
              isCompact={compactView}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        <ContactForm
          contact={currentContact}
          onSubmit={handleContactFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          groups={availableGroups}
        />
      </Modal>
    </div>
  );
};

ContactsList.propTypes = {
  user: PropTypes.object,
  activeGroup: PropTypes.string,
};

export default ContactsList;
