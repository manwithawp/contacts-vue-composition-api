<template>
    <div class="container pt-5">
        <div class="mb-5 text-center">
            <h1>Contacts Page</h1>
        </div>

        <div class="mb-5">
            <div class="row align-items-center mb-2">
                <div class="col mb-2">
                    <div class="h3">Contacts</div>
                </div>
                <div class="col-auto mb-2">
                    <add-button />
                </div>
            </div>
            <search-contact />
        </div>
        <div v-if="!contacts" class="text-center h5">loading ...</div>
        <div v-else class="accordion" id="accordionContacts">
            <contact-item
                v-for="(contact, idx) in contacts"
                :key="idx"
                :contactId="idx"
                :contact="contact"
            />
        </div>
    </div>

    <!-- <edit-contact-modal /> -->
</template>

<script>
import { loadContacts } from "./api";

import EditContactModal from "./components/EditContactModal.vue";
import AddButton from "./components/AddButton.vue";
import SearchContact from "./components/SearchContact.vue";
import ContactItem from "./components/ContactItem.vue";

import country from "country-list-js";
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
            email: "",
            country: "",
            lastName: "",
            firstName: "",
            contacts: null,
            countries: country.names(),
        };
    },
    async mounted() {
        this.contacts = await loadContacts();
        console.log(this.contacts);
    },
    validations() {
        return {
            firstName: { required },
            lastName: { required },
            email: { required, email },
        };
    },
    methods: {
        add() {},
    },
};
</script>

