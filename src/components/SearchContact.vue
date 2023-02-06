<template>
    <input
        type="text"
        v-model="contactSearch"
        class="form-control form-control-lg"
        placeholder="Search by name, company or email"
    />
    <div v-if="contactSearch" class="mt-3 text-center">
        {{ searchQuanty }} contact<template v-if="searchQuanty > 1">s</template>
        found
    </div>
</template>

<script>
import { numeric } from "@vuelidate/validators";
export default {
    data() {
        return {
            contactSearch: "",
        };
    },
    props: {
        searchQuanty: {
            type: String,
            required: true,
        },
    },
    watch: {
        contactSearch(value) {
            console.log(value);
            this.$emit("input", value);
        },
    },
};
</script>