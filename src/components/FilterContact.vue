<template>
    <input
        type="text"
        v-model="contactFilter"
        class="form-control form-control-lg"
        placeholder="Search by name, company or email"
    />
    <div v-if="contactFilter" class="mt-3 text-center">
        {{ filterQuanty }} contact<template v-if="filterQuanty > 1">s</template>
        found
    </div>
</template>

<script>
export default {
    data() {
        return {
            contactFilter: "",
        };
    },
    emits: ["input"],
    props: {
        filterQuanty: {
            type: Number,
            required: true,
        },
    },
    watch: {
        contactFilter(value) {
            this.$emit("input", value);
        },
    },
};
</script>