<template>
  <b-modal v-model="contactMethodsStore.contactAddModal" :centered="true">
    <template v-slot:header>
      <div class="modal-title h3" id="modalTitleId">Add contact</div>
      <button
        type="button"
        class="btn-close mx-1"
        data-bs-dismiss="modal"
        aria-label="Close"
        @click="contactMethodsStore.contactAddModal = false"
      ></button>
    </template>

    <div>
      <div
        class="text-success h4 text-center"
        v-if="contactMethodsStore.contactAddSuccess"
      >
        Сontact added successfully
      </div>
      <template v-else>
        <form @submit.prevent="addContact">
          <div class="row gap-x-10">
            <div class="mb-2 col-6">
              <b-form-group
                label="First name"
                label-class="label-required"
                label-for="input-firstname"
                :state="firstNameState"
              >
                <b-form-input
                  id="input-firstname"
                  v-model="states.contact.firstName"
                  :state="firstNameState"
                  trim
                ></b-form-input>
                <div
                  class="d-block invalid-feedback"
                  v-for="error of v$.contact.firstName.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </b-form-group>
            </div>
            <div class="mb-2 col-6">
              <b-form-group
                label="Last name"
                label-class="label-required"
                label-for="input-lastname"
                :state="lastNameState"
              >
                <b-form-input
                  id="input-lastname"
                  v-model="states.contact.lastName"
                  :state="lastNameState"
                  trim
                ></b-form-input>
                <div
                  class="d-block invalid-feedback"
                  v-for="error of v$.contact.firstName.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </b-form-group>
            </div>
          </div>
          <div class="mb-2">
            <b-form-group
              label="Email"
              label-class="label-required"
              label-for="input-lastname"
              :state="emailState"
            >
              <b-form-input
                id="input-lastname"
                v-model="states.contact.email"
                :state="emailState"
                trim
              ></b-form-input>
              <div
                class="d-block invalid-feedback"
                v-for="error of v$.contact.email.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </b-form-group>
          </div>
        </form>
      </template>
    </div>

    <template v-slot:footer>
      <template v-if="contactMethodsStore.contactAddSuccess">
        <button type="button" class="btn btn-danger btn-lg" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-success btn-lg" @click="addMore">
          Add More
        </button>
      </template>
      <template v-else>
        <button type="button" class="btn btn-success btn-lg" @click="addContact">
          Add
        </button>
      </template>
    </template>
  </b-modal>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import Multiselect from "vue-multiselect";
import country from "country-list-js";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useContactMethodsStore } from "../store/contactMethodsStore";

const contactMethodsStore = useContactMethodsStore();

const states = reactive({
  contact: {
    phone: "",
    email: "",
    country: "",
    company: "",
    lastName: "",
    firstName: "",
  },
});

const rules = {
  contact: {
    phone: "",
    country: "",
    company: "",
    email: { required, email },
    firstName: { required },
    lastName: { required },
  },
};

const v$ = useVuelidate(rules, states);

const firstNameState = computed(() => {
  return v$.value.contact.firstName.$errors.length != 0 ? false : null;
});

const lastNameState = computed(() => {
  return v$.value.contact.lastName.$errors.length != 0 ? false : null;
});

const emailState = computed(() => {
  return v$.value.contact.email.$errors.length != 0 ? false : null;
});

async function addContact() {
  const result = await v$.value.$validate();
  if (result) {
    console.log(result);
  }
}
</script>
