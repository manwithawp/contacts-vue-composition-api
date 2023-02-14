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
                    <!-- <add-button @add-new-contact="addNewContact" /> -->
                </div>
            </div>

            <!-- <filter-contact
                :filterQuanty="filterQuanty"
                @input="contactFilter = $event"
            /> -->
        </div>
        <!-- <div v-if="!contacts" class="text-center h5">loading ...</div>
        <div v-else class="accordion" id="accordionContacts">
            <contact-item
                v-for="(contact, idx) in showContacts"
                :key="idx"
                :contactIdx="idx"
                :contact="contact"
                @edit-contact="editContact($event)"
                @delete-contact="deleteContact($event)"
                @toggle-dropdown="toggleDropdown($event)"
            />
        </div> -->
    </div>

    <!-- <edit-contact-modal
        :validate="v$"
        :contact="contact"
        :contactNew="contactNew"
        :contactHasChange="contactHasChange"
        :contactEditSuccess="contactEditSuccess"
        @add-contact="addContact"
        @save-contact="saveContact"
        @add-more="contactEditSuccess = ''"
        @cancel-edit-contact="cancelEditContact"
    /> -->

    <b-button @click="modal = !modal"> Toggle modal </b-button>

    <b-modal v-model="modal">
        <template v-slot:header>
            <h1>Здесь мог быть заголовок страницы</h1>
        </template>
        <edit-contact-form />
    </b-modal>
</template>

<script>
import { ref } from "vue";

import EditContactForm from "../components/EditContactForm.vue";
import AddButton from "../components/AddButton.vue";
import FilterContact from "../components/FilterContact.vue";
import ContactItem from "../components/ContactItem.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
    components: {
        EditContactForm,
    },
    setup() {
        const modal = ref(false);
        return {
            modal,
        };
    },
};

// export default {
//     name: "contactPage",
//     components: {
//         AddButton,
//         ContactItem,
//         FilterContact,
//         EditContactModal,
//     },
//     setup() {
//         const modal = ref(false);
//         // return { v$: useVuelidate() };
//         // const contacts =
//     },
//     data() {
//         return {
//             editModal: "",
//             contacts: null,
//             filterQuanty: 0,
//             contactNew: false,
//             contactFilter: "",
//             contactEditIndex: "",
//             contactEditSuccess: "",
//             contactHasChange: false,
//             contact: {
//                 phone: "",
//                 email: "",
//                 country: "",
//                 company: "",
//                 lastName: "",
//                 firstName: "",
//             },
//         };
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
//     //     editContact(contact) {
//     //         this.contactNew = false;
//     //         this.contactEditSuccess = "";
//     //         this.contactEditIndex = this.contacts.lastIndexOf(contact);
//     //         this.contact = contact;
//     //         localStorage.editContact = JSON.stringify(contact);
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

