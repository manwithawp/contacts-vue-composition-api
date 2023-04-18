<template>
  <b-modal v-model="contactMethodsStore.contactRemoveModal" :centered="true">
    <template v-slot:header>
      <div class="modal-title h3">Remove contact</div>
      <button
        type="button"
        class="btn-close mx-1"
        data-bs-dismiss="modal"
        aria-label="Close"
        @click="contactMethodsStore.contactRemoveModal = false"
      ></button>
    </template>
    <div class="text-center">
      <div class="h3">
        Delete contact
        {{ contactMethodsStore.contactCurrent.firstName }}
        {{ contactMethodsStore.contactCurrent.lastName }}?
      </div>
      <p>This contact will be remove forever</p>
    </div>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-danger btn-lg"
        @click="contactMethodsStore.contactRemoveModal = false"
      >
        No
      </button>
      <button type="button" class="btn btn-success btn-lg" @click="removeContact()">
        YES
      </button>
    </template>
  </b-modal>
</template>

<script setup>
import { reactive, computed, ref } from "vue";

import { useContactMethodsStore } from "../store/contactMethodsStore";

const contactMethodsStore = useContactMethodsStore();

const emit = defineEmits(["removeContact"]);

function removeContact() {
  contactMethodsStore.contactRemoveModal = false;
  emit("removeContact", contactMethodsStore.contactCurrent.email);
}
</script>
