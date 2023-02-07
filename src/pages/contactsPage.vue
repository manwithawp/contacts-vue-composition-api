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
                    <add-button @add-new-contact="addNewContact" />
                </div>
            </div>

            <filter-contact
                :filterQuanty="filterQuanty"
                @input="contactFilter = $event"
            />
        </div>
        <div v-if="!contacts" class="text-center h5">loading ...</div>
        <div v-else class="accordion" id="accordionContacts">
            <contact-item
                v-for="(contact, idx) in showContacts"
                :key="idx"
                :contactIdx="idx"
                :contact="contact"
                @delete-contact="editContact('delete', $event)"
                @edit-contact="editContact('edit', $event)"
            />
        </div>
    </div>

    <edit-contact-modal
        :contact="contact"
        :validate="v$"
        :contactNew="contactNew"
        @add-contact="addContact"
        @save-contact="saveContact"
        @add-more="contactEditSuccess = ''"
        :contactEditSuccess="contactEditSuccess"
    />
</template>

<script>
import { loadContacts, recordContacts } from "../api";

import EditContactModal from "../components/EditContactModal.vue";
import AddButton from "../components/AddButton.vue";
import FilterContact from "../components/FilterContact.vue";
import ContactItem from "../components/ContactItem.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
    name: "contactPage",
    components: {
        AddButton,
        ContactItem,
        FilterContact,
        EditContactModal,
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            editModal: "",
            contacts: null,
            filterQuanty: 0,
            contactFilter: "",
            contactNew: false,
            contactEditIndex: "",
            contactEditSuccess: "",
            contact: {
                phone: "",
                email: "",
                country: "",
                company: "",
                lastName: "",
                firstName: "",
            },
        };
    },
    validations() {
        return {
            contact: {
                firstName: { required },
                lastName: { required },
                email: { required, email },
            },
        };
    },
    mounted() {
        loadContacts().then((data) => (this.contacts = data));
    },
    methods: {
        addNewContact() {
            this.contactNew = true;
            this.contactEditSuccess = "";
        },
        editContact(action, contact) {
            this.contactNew = false;
            this.contactEditSuccess = "";
            if (action === "delete") {
                const i = this.contacts.lastIndexOf(contact);
                if (i > -1) this.contacts.splice(i, 1);
                this.renewContacts();
            } else {
                this.contactEditIndex = this.contacts.lastIndexOf(contact);
                this.contact = contact;
            }
        },
        async addContact() {
            const result = await this.v$.$validate();
            if (result) {
                this.contacts.push(this.contact);
                this.contactEditSuccess = "Contact successfully added!";
                this.renewContacts();
            }
        },
        async saveContact() {
            const result = await this.v$.$validate();
            if (result) {
                this.contacts[this.contactEditIndex] = this.contact;
                this.contactEditSuccess = "Contact successfully saved!";
                this.renewContacts();
            }
        },
        renewContacts() {
            this.v$.$reset();
            recordContacts(this.contacts);
            this.contact = this.$options.data().contact;
        },
    },
    computed: {
        showContacts() {
            const filter = this.contactFilter.trim().toLowerCase();
            const contactsShown = this.contacts.filter((contact) => {
                const fullname = `${contact.firstName} ${contact.lastName}`
                    .trim()
                    .toLowerCase();
                return (
                    fullname.toLowerCase().indexOf(filter) > -1 ||
                    contact.company.toLowerCase().indexOf(filter) > -1 ||
                    contact.email.toLowerCase().indexOf(filter) > -1
                );
            });
            this.filterQuanty = contactsShown.length;
            return contactsShown;
        },
    },
};
</script>

