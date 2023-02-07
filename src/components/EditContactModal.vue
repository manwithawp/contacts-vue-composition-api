<template>
    <div
        class="modal modal-md fade"
        id="modal-edit"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div
                        v-if="contactNew"
                        class="modal-title h3"
                        id="modalTitleId"
                    >
                        Add contact
                    </div>
                    <div v-else class="modal-title h3" id="modalTitleId">
                        Edit contact
                    </div>
                    <button
                        type="button"
                        class="btn-close mx-1"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body py-4">
                    <div
                        class="text-success h4 text-center"
                        v-if="contactEditSuccess"
                    >
                        {{ contactEditSuccess }}
                    </div>
                    <template v-else>
                        <div class="row gap-x-10">
                            <div class="col-6 mb-3">
                                <label class="mb-2"
                                    >First name
                                    <sup class="text-danger">*</sup></label
                                >
                                <input
                                    type="text"
                                    v-model="contact.firstName"
                                    class="form-control form-control-lg"
                                    placeholder="Enter name"
                                />
                                <div
                                    v-for="error in validate.contact.firstName
                                        .$errors"
                                    :key="error.$uid"
                                    class="text-danger my-2"
                                >
                                    {{ error.$message }}
                                </div>
                            </div>
                            <div class="col-6 mb-3">
                                <label class="mb-2"
                                    >Last name
                                    <sup class="text-danger">*</sup></label
                                >
                                <input
                                    type="text"
                                    v-model="contact.lastName"
                                    class="form-control form-control-lg"
                                    placeholder="Enter last name"
                                />
                                <div
                                    v-for="error in validate.contact.lastName
                                        .$errors"
                                    :key="error.$uid"
                                    class="text-danger my-2"
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
                                v-model="contact.email"
                                class="form-control form-control-lg"
                                placeholder="Enter email"
                            />
                            <div
                                v-for="error in validate.contact.email.$errors"
                                :key="error.$uid"
                                class="text-danger my-2"
                            >
                                {{ error.$message }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="mb-2">Company</label>
                            <input
                                type="text"
                                v-model="contact.company"
                                class="form-control form-control-lg"
                            />
                        </div>
                        <div class="mb-3">
                            <label class="mb-2">Job title</label>
                            <input
                                type="text"
                                v-model="contact.jobTitle"
                                class="form-control form-control-lg"
                            />
                        </div>
                        <div class="mb-3">
                            <label class="mb-2">Country</label>
                            <multiselect
                                v-model="contact.country"
                                :options="countries"
                                placeholder="Pick a value"
                            >
                            </multiselect>
                        </div>
                        <div class="mb-3">
                            <label class="mb-2">Phone</label>
                            <input
                                v-model="contact.phone"
                                type="tel"
                                class="form-control form-control-lg"
                            />
                        </div>
                    </template>
                </div>
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
                                class="btn btn-danger btn-lg"
                                data-bs-dismiss="modal"
                            >
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import country from "country-list-js";

export default {
    props: {
        contactNew: {
            type: Boolean,
        },
        contact: {
            type: Object,
            required: true,
        },
        validate: {
            type: Object,
        },
        contactEditSuccess: {
            type: String,
            required: false,
        },
    },
    components: {
        Multiselect,
    },
    data() {
        return {
            newContact: null,
            countries: country.names(),
        };
    },
};
</script>

<style scoped lang="scss">
.modal-content {
    background: var(--color-background);
}

@media (prefers-color-scheme: dark) {
    .btn-close {
        margin-right: 0.015rem !important;
        background-color: var(--color-text);
    }
    :root {
        --bs-border-color: #3f3f45;
    }
}
.multiselect__tags {
    min-height: calc(1.5em + 1rem + 2px);
    font-size: 1.15rem;
    border-radius: 0.5rem;
    padding-top: 7px;
    border-color: #ced4da;
    padding: 0.5rem 1rem;
    display: flex;
    line-height: 1.3;
    align-items: center;
}

.multiselect__select {
    height: 46px;
    top: 0px;
}

.multiselect__option {
    padding-left: 1rem;
    padding-right: 1rem;
}

.multiselect__placeholder {
    margin-bottom: 0;
    padding: 0;
}

.multiselect__input,
.multiselect__single {
    font-size: inherit;
    margin-bottom: 0;
    padding: 0;
    background-color: transparent;
}

.multiselect__select {
    z-index: 1;
}

.multiselect--active .multiselect__tags,
.multiselect--active .multiselect__content-wrapper {
    border-color: #86b7fe;
}

@media (prefers-color-scheme: dark) {
    .multiselect__input,
    .multiselect__single {
        color: #e1e3e6;
    }
    .multiselect__input::placeholder {
        color: #e1e3e6;
    }
    .multiselect__tags {
        color: #e1e3e6;
        background: #454545 !important;
        border-color: #3f3f44;
    }
    .multiselect__content-wrapper {
        color: #e1e3e6;
        background: #454545 !important;
        border-color: #3f3f44;
    }
    .multiselect--active .multiselect__tags,
    .multiselect--active .multiselect__content-wrapper {
        border-color: #3f3f44;
    }
}
</style>