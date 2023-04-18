import { onMounted, ref } from "vue";

export function useContacts() {
  const API_URL = "https://mocki.io/v1/ad75334b-6762-4998-a5c5-975e58f9a759";

  const contacts = ref([]);

  const contactsEmpty = ref(false);

  if (localStorage.contactsList) {
    contacts.value = JSON.parse(localStorage.contactsList);
  } else {
    const fetching = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (!localStorage.contactsList) {
        localStorage.contactsList = JSON.stringify(data);
      }
      contacts.value = data;
    };

    onMounted(fetching);
  }

  function setContacts(newContacts) {
    contacts.value = newContacts;
    localStorage.contactsList = JSON.stringify(newContacts);
    if (!newContacts.length) {
      contactsEmpty.value = true;
    }
  }

  function addContact(newContact) {
    const newContacts = [...contacts.value, newContact];
    setContacts(newContacts);
  }

  function removeContact(email) {
    const newContacts = contacts.value.filter(
      (contact) => contact.email != email
    );
    // const newContacts = [...contacts.value];
    // newContacts.splice(index, 1);
    setContacts(newContacts);
  }

  return {
    contacts,
    addContact,
    removeContact,
    contactsEmpty,
  };
}
