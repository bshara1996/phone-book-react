import {
  loadContacts,
  toggleFavorite,
  deleteContact,
  clearContacts,
  getContacts,
  getLoading,
  getError
} from './api';

// Event listeners
const listeners = [];

// Subscribe to contacts changes
export const subscribeToContacts = (callback) => {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// Notify all listeners
const notifyListeners = () => {
  const state = {
    contacts: getContacts(),
    loading: getLoading(),
    error: getError()
  };
  
  listeners.forEach(listener => listener(state));
};

// Initialize contacts
export const initializeContacts = async () => {
  const result = await loadContacts();
  notifyListeners();
  return result;
};

// Toggle favorite for a contact
export const toggleContactFavorite = (id) => {
  const updatedContacts = toggleFavorite(id);
  notifyListeners();
  return updatedContacts;
};

// Add a new contact
export const addContact = (contactData) => {
  const contacts = getContacts();
  const newContact = {
    ...contactData,
    id: contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1,
    favorite: false,
  };
  
  const updatedContacts = [...contacts, newContact];
  // Update the contacts in the API module
  // This would need to be implemented in the API module
  
  notifyListeners();
  return newContact;
};

// Update an existing contact
export const updateContact = (id, contactData) => {
  const contacts = getContacts();
  const updatedContacts = contacts.map(contact => 
    contact.id === id ? { ...contactData, id } : contact
  );
  
  // Update the contacts in the API module
  // This would need to be implemented in the API module
  
  notifyListeners();
  return updatedContacts;
};

// Delete a contact
export const removeContact = (id) => {
  const updatedContacts = deleteContact(id);
  notifyListeners();
  return updatedContacts;
};

// Delete all contacts
export const removeAllContacts = () => {
  const updatedContacts = clearContacts();
  notifyListeners();
  return updatedContacts;
};

// Refresh contacts
export const refreshContacts = async () => {
  const result = await loadContacts();
  notifyListeners();
  return result;
};

// Get current state
export const getCurrentState = () => {
  return {
    contacts: getContacts(),
    loading: getLoading(),
    error: getError()
  };
};
