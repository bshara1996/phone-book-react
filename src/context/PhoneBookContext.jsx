import { createContext, useContext, useState, useEffect } from "react";

const PhoneBookContext = createContext();

export const PhoneBookProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState(["Family", "Friends", "Work"]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [viewMode, setViewMode] = useState("full");

  // Fetch contacts from both APIs when component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Fetch 10 contacts from randomuser.me
        const randomUserResponse = await fetch(
          "https://randomuser.me/api/?results=10"
        );
        const randomUserData = await randomUserResponse.json();

        // Map randomUser data to our contact format
        const contacts = randomUserData.results.map((user, index) => ({
          id: crypto.randomUUID(),
          name: `${user.name.first} ${user.name.last}`,
          phone: user.phone,
          email: user.email,
          image: `https://i.pravatar.cc/200?img=${index + 1}`,
          groups: [groups[Math.floor(Math.random() * groups.length)]],
          isFavorite: false,
        }));

        setContacts(contacts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []); // Sort contacts based on current configuration

  // Filter contacts based on search term and active group
  const filteredContacts = (group, searchTerm = "") => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm);

      const matchesGroup = group ? contact.groups.includes(group) : true;

      return matchesSearch && matchesGroup;
    });
  };

  // Get favorite contacts
  const favoriteContacts = (group, searchTerm = "") => {
    return filteredContacts(group, searchTerm).filter(
      (contact) => contact.isFavorite
    );
  };

  // Contact CRUD operations
  const addContact = (newContact) => {
    setContacts((prev) => [
      ...prev,
      { ...newContact, id: crypto.randomUUID() },
    ]);
  };

  const updateContact = (id, updatedContact) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const deleteContactsInGroup = (group) => {
    setContacts((prev) =>
      prev.filter((contact) => !contact.groups.includes(group))
    );
  };

  const toggleFavorite = (id) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  };

  // Group operations
  const addGroup = (newGroup) => {
    if (!groups.includes(newGroup)) {
      setGroups((prev) => [...prev, newGroup]);
    }
  };

  const deleteGroup = (group) => {
    setGroups((prev) => prev.filter((g) => g !== group));
  };

  const value = {
    contacts,
    favoriteContacts,
    groups,
    isLoading,
    viewMode,
    selectedGroup,
    setSelectedGroup,
    addContact,
    updateContact,
    deleteContact,
    deleteContactsInGroup,
    toggleFavorite,
    addGroup,
    deleteGroup,
    setViewMode,
    filteredContacts,
  };

  return (
    <PhoneBookContext.Provider value={value}>
      {children}
    </PhoneBookContext.Provider>
  );
};

export const usePhoneBook = () => {
  const context = useContext(PhoneBookContext);
  if (!context) {
    throw new Error("usePhoneBook must be used within a PhoneBookProvider");
  }
  return context;
};
