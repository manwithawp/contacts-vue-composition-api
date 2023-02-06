<template>
    <button
        class="btn btn-success btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#modal-edit"
        @click="$emit('add-new-contact')"
    >
        Add
    </button>
</template>