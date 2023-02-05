<template>
    
  
  <!-- Modal -->
  <div class="modal modal-md fade" id="modal-edit" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
            <div class="modal-title h3" id="modalTitleId">Add contact</div>
            <button type="button" class="btn-close mx-1" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body py-4">
          <div class="row gap-x-10">
            <div class="col-6 mb-3">
              <label class="mb-2">First name <sup class="text-danger">*</sup></label>
              <input type="text" v-modal="firstName" class="form-control form-control-lg" placeholder="Enter name">
            </div>
            <div class="col-6 mb-3">
              <label class="mb-2">Last name <sup class="text-danger">*</sup></label>
              <input type="text" v-modal="lastName" class="form-control form-control-lg" placeholder="Enter last name">
            </div>
          </div>
          <div class="mb-3">
            <label class="mb-2">E-mail <sup class="text-danger">*</sup></label>
            <input type="text" v-model="email" class="form-control form-control-lg" placeholder="Enter email">
          </div>
          <div class="mb-3">
            <label class="mb-2">Company</label>
            <input type="text" v-model="company" class="form-control form-control-lg">
          </div>
          <div class="mb-3">
            <label class="mb-2">Job title</label>
            <input type="text" v-model="jobTitle" class="form-control form-control-lg">
          </div>
          <div class="mb-3">
            <label class="mb-2">Country</label>
            <multiselect 
              v-model="country" 
              :options="countries"
              placeholder="Pick a value">
            </multiselect>
          </div>
          <div class="mb-3">
            <label class="mb-2">Phone</label>
            <input type="tel" class="form-control form-control-lg">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success btn-lg" @click="add">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    
    export default {
        components: {
          Multiselect
        }
    }
</script>