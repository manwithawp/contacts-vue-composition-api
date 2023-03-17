<template>
  <div class="text-success h4 text-center" v-if="contactEditSuccess">
    {{ contactEditSuccess.text }}
  </div>
  <template v-else>
    <form @submit.prevent="addContact">
      <div class="row gap-x-10">
        <div class="mb-3">
          <b-form-group
            label="First name"
            label-class="label-required"
            label-for="input-firstname"
            :invalid-feedback="firstNameInvalidFeedback"
            :state="firstNameState"
          >
            <b-form-input
              id="input-firstname"
              v-model="states.contact.firstName"
              :state="firstNameState"
              trim
            ></b-form-input>
          </b-form-group>
          <!-- <div
            class="d-block invalid-feedback"
            v-for="error of v$.contact.firstName.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div> -->
        </div>
      </div>
      <!-- <div class="mb-3">
            <label class="mb-2">E-mail <sup class="text-danger">*</sup></label>
            <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Enter email"
            />
            <div
                v-for="error in validate.contact.email.$errors"
                :key="error.$uid"
                class="text-danger mt-2"
            >
                {{ error.$message }}
            </div>
        </div>
        <div class="mb-3">
            <label class="mb-2">Company</label>
            <input
                type="text"
                placeholder="Enter company name"
                class="form-control form-control-lg"
            />
        </div>
        <div class="mb-3">
            <label class="mb-2">Job title</label>
            <input
                type="text"
                placeholder="Enter job title"
                class="form-control form-control-lg"
            />
        </div>
        <div class="mb-3">
            <label class="mb-2">Country</label>
            <multiselect :options="countries" placeholder="Pick a value">
            </multiselect>
        </div>
        <div class="mb-3">
            <label class="mb-2">Phone</label>
            <input
                type="tel"
                placeholder="Enter phone number"
                class="form-control form-control-lg"
            />
        </div> -->
      <button type="submit">sss</button>
    </form>
  </template>
</template>

<script setup>
import { reactive, computed } from "vue";

import Multiselect from "vue-multiselect";
import country from "country-list-js";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const props = defineProps({
  contactNew: {
    type: Boolean,
  },
  contactEditSuccess: {
    type: String,
    required: false,
  },
});
// components: {
//     Multiselect,
// },
// const newContact = null;
// const countries = country.names();
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
    firstName: { required, email },
    lastName: { required },
  },
};

const v$ = useVuelidate(rules, states);

const addContact = async () => {
  const result = await v$.value.$validate();
  if (result) {
    console.log(result);
  }
};

const firstNameState = computed(() => {
  return v$.value.contact.firstName.$errors.length != 0 ? false : null;
});

const firstNameInvalidFeedback = computed(() => {
  // console.log(v$.value.contact.firstName.$errors[0].$message);
  return v$.value.contact.firstName.$errors[0];
});

// const onReset = (event) => {
//     event.preventDefault();
//     // Reset our form values
//     (state.contact.phone = ""),
//         (state.contact.email = ""),
//         (state.contact.country = ""),
//         (state.contact.company = ""),
//         (state.contact.lastName = ""),
//         (state.contact.firstName = "");
// };

// return { state, v$, countries };
</script>
