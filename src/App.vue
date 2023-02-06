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

            <search-contact
                :searchQuanty="searchQuanty"
                @input="contactSearch = $event"
            />
        </div>
        <div v-if="!contacts" class="text-center h5">loading ...</div>
        <div v-else class="accordion" id="accordionContacts">
            <contact-item
                v-for="(contact, idx) in showContacts"
                :key="idx"
                :contact="contact"
                @delete-contact="editContact('delete', $event)"
                @edit-contact="editContact"
            />
        </div>
    </div>

    <edit-contact-modal
        :validate="this.v$"
        :contact="contact"
        :contactNew="contactNew"
        @add-contact="addContact"
    />
</template>

<script>
import { loadContacts } from "./api";

import EditContactModal from "./components/EditContactModal.vue";
import AddButton from "./components/AddButton.vue";
import SearchContact from "./components/SearchContact.vue";
import ContactItem from "./components/ContactItem.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
    components: {
        AddButton,
        SearchContact,
        ContactItem,
        EditContactModal,
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            contacts: null,
            contactNew: false,
            searchQuanty: "",
            contactSearch: "",
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
                phone: { required },
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
        },
        editContact(action = "delete", contact) {
            this.contactNew = false;
            if (action === "delete") {
                const i = this.contacts.lastIndexOf(contact);
                if (i > -1) this.contacts.splice(i, 1);
                // const contacts = JSON.parse(localStorage.contactsList);
                // this.contacts = contacts.filter((item) => {
                //     return item.id !== contact.id;
                // });
                localStorage.contactsList = JSON.stringify(this.contacts);
            }
        },
        async addContact() {
            const result = await this.v$.$validate();
            if (result) {
                this.contacts.push(this.contact);
                localStorage.contactsList = JSON.stringify(this.contacts);
            }
        },
    },
    computed: {
        showContacts() {
            const search = this.contactSearch.trim();
            const contactsShown = this.contacts.filter((contact) => {
                const fullname =
                    `${contact.firstName} ${contact.lastName}`.trim();
                return (
                    fullname.indexOf(search) > -1 ||
                    contact.company.indexOf(search) > -1 ||
                    contact.email.indexOf(search) > -1
                );
            });
            this.searchQuanty = contactsShown.length;
            return contactsShown;
        },
    },
};
</script>

