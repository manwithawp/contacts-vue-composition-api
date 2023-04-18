import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useContactMethodsStore = defineStore("contactMethodsStore", () => {
  const contactAddModal = ref(false);
  const contactRemoveModal = ref(false);
  const contactAddSuccess = ref(false);
  const contactCurrent = ref({});

  const contactAdd = reactive({
    firstName: "",
    jobTitle: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
  });

  return {
    contactAdd,
    contactRemoveModal,
    contactAddSuccess,
    contactAddModal,
    contactCurrent,
  };
});
