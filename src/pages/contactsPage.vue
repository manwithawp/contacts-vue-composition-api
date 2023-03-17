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
          <b-button size="lg" variant="primary" @click="contactModal = !modal"
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
          placeholder="Search by name, company or email"
        ></b-form-input>
      </b-form-group>

      <div v-if="searchQuery != false" class="mt-3 text-center">
        {{ contactsShown.length }} contact
        <template v-if="contactsShown.length !== 1">s</template>
        found
      </div>

      <div v-if="contacts.length == 0">
        <b-button size="lg" variant="primary" @click="contactModal = !modal"
          >Add</b-button
        >
      </div>
    </div>
    <div v-if="!contactsStore.contacts" class="text-center h5">loading ...</div>
    <div v-else class="accordion" id="accordionContacts">
      <contact
        v-for="(contact, idx) in contactsShown"
        :key="idx"
        :contactIdx="idx"
        :contact="contact"
        @edit-contact="editContact($event)"
        @delete-contact="deleteContact($event)"
        @toggle-dropdown="toggleDropdown($event)"
      />
    </div>

    <b-modal v-model="contactModal" :centered="true">
      <template v-slot:header>
        <div v-if="contactNew" class="modal-title h3" id="modalTitleId">Add contact</div>
        <div v-else class="modal-title h3" id="modalTitleId">Edit contact</div>
        <button
          type="button"
          class="btn-close mx-1"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="contactModal = false"
        ></button>
      </template>

      <edit-contact-form
        :contactNew="contactNew"
        :contactEditSuccess="contactEditSuccess"
      />

      <template v-slot:footer>
        <template v-if="contactEditSuccess">
          <button type="button" class="btn btn-danger btn-lg" data-bs-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            v-if="contactEditSuccess.type === 'add'"
            class="btn btn-success btn-lg"
            @click="$emit('add-more', '')"
          >
            Add More
          </button>
        </template>
        <template v-else>
          <button
            v-if="contactNew"
            type="button"
            class="btn btn-success btn-lg"
            @click="$emit('add-contact')"
          >
            Add
          </button>
          <template v-else>
            <button type="button" class="btn btn-link btn-lg" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-success btn-lg"
              @click="$emit('save-contact')"
            >
              Save
            </button>
          </template>
        </template>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useContactsStore } from "../store/contactsStore";

import Contact from "../components/ContactItem.vue";
import EditContactForm from "../components/EditContactForm.vue";
import { useContacts } from "../hooks/useContacts";
import { searchedContacts } from "../hooks/useSearchedContacts";

const searchQuery = ref("");

const contactModal = ref(false);
const contactNew = ref(false);
const contactsStore = useContactsStore();
const contactEditSuccess = ref("");
const contactEditIndex = ref("");

const { contacts } = useContacts();
const { contactsShown } = searchedContacts(contacts, searchQuery);

// onMounted(() => {
//     contactsStore.getContacts();
// });

const editContact = (contact) => {
  const contactEditIndex = contactsStore.contacts.indexOf(contact);
  contactsStore.contact = contact;
  contactsStore.contactNew = false;
};
// return {
//     modal,
//     contactNew,
//     contactsStore,
//     contactEditSuccess,
// };

// export default {
//     name: "contactPage",
//     components: {
//         AddButton,
//         ContactItem,
//         FilterContact,
//         EditContactModal,
//     },
//     // validations() {
//     //     return {
//     //         contact: {
//     //             firstName: { required },
//     //             lastName: { required },
//     //             email: { required, email },
//     //         },
//     //     };
//     // },
//     // mounted() {
//     //     // loadContacts().then((data) => (this.contacts = data));
//     // },
//     // methods: {
//     //     addNewContact() {
//     //         this.contactNew = true;
//     //         this.contactEditSuccess = "";
//     //     },
//     //     deleteContact(contact) {
//     //         const i = this.contacts.lastIndexOf(contact);
//     //         if (i > -1) this.contacts.splice(i, 1);
//     //         this.renewContacts();
//     //     },
//     //     async addContact() {
//     //         const result = await this.v$.$validate();
//     //         if (result) {
//     //             this.contacts.push(this.contact);
//     //             this.contactEditSuccess = {
//     //                 text: "Contact successfully added!",
//     //                 type: "add",
//     //             };
//     //             this.renewContacts();
//     //         }
//     //     },
//     //     async saveContact() {
//     //         const result = await this.v$.$validate();
//     //         if (result) {
//     //             this.contacts[this.contactEditIndex] = this.contact;
//     //             this.contactEditSuccess = {
//     //                 text: "Contact successfully saved!",
//     //                 type: "edit",
//     //             };
//     //             this.renewContacts();
//     //         }
//     //     },
//     //     cancelEditContact() {
//     //         this.contacts[this.contactEditIndex] = JSON.parse(
//     //             localStorage.editContact
//     //         );
//     //         this.contact = this.$options.data().contact;
//     //     },
//     //     renewContacts() {
//     //         this.v$.$reset();
//     //         recordContacts(this.contacts);
//     //         this.contact = this.$options.data().contact;
//     //     },
//     //     toggleDropdown(event) {
//     //         Array.from(
//     //             document.querySelectorAll(".accordion-dropdown")
//     //         ).forEach((el) => el.classList.remove("active"));
//     //         event.srcElement.parentElement.classList.add("active");
//     //     },
//     // },
//     // computed: {
//     //     showContacts() {
//     //         const filter = this.contactFilter.trim().toLowerCase();
//     //         const contactsShown = this.contacts.filter((contact) => {
//     //             const fullname = `${contact.firstName} ${contact.lastName}`
//     //                 .trim()
//     //                 .toLowerCase();
//     //             return (
//     //                 fullname.toLowerCase().indexOf(filter) > -1 ||
//     //                 contact.company.toLowerCase().indexOf(filter) > -1 ||
//     //                 contact.email.toLowerCase().indexOf(filter) > -1
//     //             );
//     //         });
//     //         this.filterQuanty = contactsShown.length;
//     //         return contactsShown;
//     //     },
//     //     contactHasChange() {
//     //         if (localStorage.editContact === JSON.stringify(this.contact)) {
//     //             return false;
//     //         } else {
//     //             return true;
//     //         }
//     //     },
//     // },
// };
</script>
