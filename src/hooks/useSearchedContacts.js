import { computed, ref } from "vue";

export function searchedContacts(contacts, searchQuery) {
  const contactsShown = computed(() => {
    return contacts.value.filter((contact) => {
      const fullFilter =
        `${contact.firstName} ${contact.lastName} ${contact.company} ${contact.email}`
          .trim()
          .toLowerCase();
      return fullFilter.indexOf(searchQuery.value.trim().toLowerCase()) > -1;
    });
  });
  return { contactsShown, searchQuery };
}
