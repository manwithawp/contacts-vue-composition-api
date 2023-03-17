import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useContactsStore = defineStore("contactsStore", () => {
  const API_URL = "https://mocki.io/v1/ad75334b-6762-4998-a5c5-975e58f9a759";

  const contacts = ref([]);

  const contactNew = ref(true);

  const contact = reactive({
    firstName: "",
    jobTitle: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
  });

  const contactFilter = ref("");

  const contactFilteredQuanty = ref("");

  const filteredContacts = computed(() => {
    const filter = contactFilter.value.trim().toLowerCase();
    const contactsShown = contacts.value.filter((contact) => {
      const fullFilter =
        `${contact.firstName} ${contact.lastName} ${contact.company} ${contact.email}`
          .trim()
          .toLowerCase();
      return fullFilter.toLowerCase().indexOf(filter) > -1;
    });
    contactFilteredQuanty.value = contactsShown.length;
    return contactsShown;
  });

  return {
    contact,
    contacts,
    filteredContacts,
    contactFilter,
    contactFilteredQuanty,
    contactNew,
  };
});
