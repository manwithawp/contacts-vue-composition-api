<template>
    <!-- <div class="modal-header">
        <div v-if="contactNew" class="modal-title h3" id="modalTitleId">
            Add contact
        </div>
        <div v-else class="modal-title h3" id="modalTitleId">Edit contact</div>
        <button
            type="button"
            class="btn-close mx-1"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('cancel-edit-contact')"
        ></button>
    </div> -->
    <!-- <div class="modal-body py-4">
        <div class="text-success h4 text-center" v-if="contactEditSuccess">
            {{ contactEditSuccess.text }}
        </div>
        <template v-else>
            <div class="row gap-x-10">
                <div class="col-sm-6 mb-3">
                    <label class="mb-2"
                        >First name <sup class="text-danger">*</sup></label
                    >
                    <input
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Enter name"
                    />
                    <div
                        v-for="error in validate.contact.firstName.$errors"
                        :key="error.$uid"
                        class="text-danger mt-2"
                    >
                        {{ error.$message }}
                    </div>
                </div>
                <div class="col-sm-6 mb-3">
                    <label class="mb-2"
                        >Last name <sup class="text-danger">*</sup></label
                    >
                    <input
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Enter last name"
                    />
                    <div
                        v-for="error in validate.contact.lastName.$errors"
                        :key="error.$uid"
                        class="text-danger mt-2"
                    >
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label class="mb-2"
                    >E-mail <sup class="text-danger">*</sup></label
                >
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
            </div>
        </template>
    </div> -->
    <div class="modal-footer">
        <template v-if="contactEditSuccess">
            <button
                type="button"
                class="btn btn-danger btn-lg"
                data-bs-dismiss="modal"
            >
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
                <button
                    type="button"
                    class="btn btn-link btn-lg"
                    data-bs-dismiss="modal"
                    @click="$emit('cancel-edit-contact')"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    class="btn btn-success btn-lg"
                    :class="{
                        disabled: contactHasChange === false,
                    }"
                    @click="$emit('save-contact')"
                >
                    Save
                </button>
            </template>
        </template>
    </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import country from "country-list-js";

// export default {
// props: {
//     contactNew: {
//         type: Boolean,
//     },
//     contact: {
//         type: Object,
//         required: true,
//     },
//     validate: {
//         type: Object,
//     },
//     contactEditSuccess: {
//         type: String,
//         required: false,
//     },
//     contactHasChange: {
//         type: Boolean,
//         required: false,
//     },
// },
// components: {
//     Multiselect,
// },
// data() {
//     return {
//         newContact: null,
//         countries: country.names(),
//     };
// },
// };
</script>