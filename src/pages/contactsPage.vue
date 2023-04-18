<template>
  <div class="container pt-5">
    <div class="mb-5 text-center">
      <h1>Contacts</h1>
    </div>

    <div class="mb-5">
      <div class="row align-items-center mb-2">
        <div class="col mb-2">
          <div class="h3">Contacts</div>
        </div>
        <div class="col-auto mb-2">
          <b-button
            size="lg"
            variant="primary"
            @click="contactMethodsStore.contactAddModal = true"
            >Add</b-button
          >
        </div>
      </div>

      <b-form-group
        label="Search by name, company or email"
        label-for="input-floating-1"
        floating
      >
        <b-form-input
          v-model="searchQuery"
          trim
          :disabled="contacts.length == 0"
          placeholder="Search by name, company or email"
        ></b-form-input>
      </b-form-group>

      <div v-if="searchQuery != false" class="mt-3 text-center">
        {{ contactsShown.length }} contact
        <template v-if="contactsShown.length !== 1">s</template>
        found
      </div>

      <div v-if="contacts.length == 0" class="text-center py-5">
        <div class="mb-2 text-yellow-300">
          Contact list is empty. Click "Add" to add new contact
        </div>
        <b-button
          size="lg"
          variant="primary"
          @click="contactMethodsStore.contactAddModal = true"
          >Add</b-button
        >
      </div>
    </div>
    <!-- <div v-if="contacts.length == 0 && !contactsEmpty" class="text-center h5">
      loading ...
    </div> -->
    <div class="accordion" id="accordionContacts">
      <contact
        v-for="(contact, idx) in contactsShown"
        :key="idx"
        :contactIdx="idx"
        :contact="contact"
        @toggle-dropdown="toggleDropdown($event)"
      />
    </div>

    <contact-update />
    <contact-add />
    <contact-remove @remove-contact="removeContact($event)" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Contact from "../components/ContactItem.vue";

import ContactUpdate from "../components/ContactUpdate.vue";

import ContactAdd from "../components/ContactAdd.vue";

import ContactRemove from "../components/ContactRemove.vue";

import { useContactMethodsStore } from "../store/contactMethodsStore";

import { useContacts } from "../hooks/useContacts";

import { searchedContacts } from "../hooks/useSearchedContacts";

const searchQuery = ref("");

const contactMethodsStore = useContactMethodsStore();

const { contacts, removeContact, contactsEmpty, addContact } = useContacts();

const { contactsShown } = searchedContacts(contacts, searchQuery);

// onMounted(() => {
//   contactMethodsStore.contactRemoveModal = true;
//   //   contactMethodsStore.contactAddModal = true;
// });
</script>
