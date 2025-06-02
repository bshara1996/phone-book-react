// API utility functions for fetching data

// Function to fetch random users from the API
export const fetchRandomUsers = async (count = 10) => {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Function to fetch contact images
export const getContactImage = (id) => {
  return `https://i.pravatar.cc/200?img=${id}`;
};

// Available groups for random assignment
const availableGroups = ['Family', 'Friends', 'Work', 'School', 'Gym', 'Neighbors', 'Book Club'];

// Store state
let contacts = [];
let loading = true;
let error = null;
let initialized = false;
let manuallyCleared = false;

// Get contacts
export const getContacts = () => contacts;
export const getLoading = () => loading;
export const getError = () => error;
export const isInitialized = () => initialized;
export const getAvailableGroups = () => availableGroups;

// Load contacts
export const loadContacts = async () => {
  // If contacts are already loaded or manually cleared, return them
  if (initialized || manuallyCleared) {
    return {
      contacts,
      loading: false,
      error: null,
    };
  }

  try {
    loading = true;
    const users = await fetchRandomUsers(15);

    if (users.length > 0) {
      // Available groups for random assignment
      const availableGroups = ['Family', 'Friends', 'Work', 'School', 'Gym', 'Neighbors', 'Book Club'];
      
      contacts = users.map((user, index) => {
        // Randomly assign 0-3 groups to each contact
        const numGroups = Math.floor(Math.random() * 4); // 0 to 3 groups
        const groups = [];
        
        // Select random groups without duplicates
        for (let i = 0; i < numGroups; i++) {
          const randomGroup = availableGroups[Math.floor(Math.random() * availableGroups.length)];
          if (!groups.includes(randomGroup)) {
            groups.push(randomGroup);
          }
        }
        
        return {
          id: index + 1,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          phone: user.phone,
          image: user.picture.large,
          favorite: Math.random() > 0.7, // Randomly set some as favorites
          gender: user.gender,
          groups: groups,
        };
      });
      error = null;
    } else {
      error = "Failed to load contacts";
    }
  } catch (err) {
    console.error("Error loading contacts:", err);
    error = "An error occurred while fetching contacts";
  } finally {
    loading = false;
    initialized = true;
  }

  return { contacts, loading, error };
};

// Toggle favorite
export const toggleFavorite = (id) => {
  contacts = contacts.map((contact) =>
    contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
  );
  return contacts;
};

// Delete contact
export const deleteContact = (id) => {
  contacts = contacts.filter((contact) => contact.id !== id);
  return contacts;
};

// Clear all contacts and prevent refetching
export const clearContacts = () => {
  contacts = [];
  loading = false;
  error = null;
  initialized = true;
  manuallyCleared = true; // Mark as manually cleared to prevent refetching
  return contacts;
};

// Update an existing contact
export const updateContact = (id, contactData) => {
  contacts = contacts.map(contact => 
    contact.id === id ? { ...contact, ...contactData } : contact
  );
  return contacts;
};

// Add a new contact
export const addContact = (contactData) => {
  contacts = [...contacts, contactData];
  return contacts;
};
