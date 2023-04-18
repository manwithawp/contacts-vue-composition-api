import { useContacts } from "./useContacts";

export function useContactMethods() {
  const { addContact, removeContact } = useContacts();

  function handleAddContact(contact) {
    addContact(contact);
  }

  function handleRemoveContact(index) {
    removeContact(index);
  }

  return {
    handleAddContact,
    handleRemoveContact,
  };
}
