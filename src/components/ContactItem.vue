<template>
    <div class="accordion-item accordion-item--contact mb-3">
        <div class="accordion-header" :id="'contactHeading-' + contactId">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#contact-' + contactId" aria-expanded="true" aria-controls="collapseOne">
            <span class="d-block">
              <span class="h4">{{ contact.firstName }} {{ contact.lastName }}</span>
              <span class="d-block">{{ contact.jobTitle }}</span>
            </span>
          </button>
          <div class="dropdown accordion-dropdown">
            <button class="btn-menu" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="btn-menu__dots"></span>
              <span class="btn-menu__dots"></span>
              <span class="btn-menu__dots"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#modal-edit" data-bs-toggle="modal">Edit</a></li>
              <li><a class="dropdown-item" href="#">Delete</a></li>
            </ul>
          </div>
        </div>
        <div 
          :id="'contact-' + contactId" 
          class="accordion-collapse collapse" 
          :class="{
            'show': contactId === 0
          }"
          :aria-labelledby="'contactHeading-' + contactId" 
          data-bs-parent="#accordionContacts">
          <div class="accordion-body">
            <table class="contact-table">
              <tbody>
                <tr v-if="contact.country">
                  <td>
                    <b>Country</b>
                  </td>
                  <td>{{ contact.country }}</td>
                </tr>
                <tr v-if="contact.email">
                  <td>
                    <b>Email</b>
                  </td>
                  <td>{{ contact.email }}</td>
                </tr>
                <tr v-if="contact.email">
                  <td>
                    <b>Phone</b>
                  </td>
                  <td>{{ contact.phone }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
</template>

<script>
import { onMounted } from 'vue-demi'
  export default {
    props: {
      contact: {
        type: Object,
        required: true
      },
      contactId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        // contact: ""
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .accordion-dropdown:focus {
    z-index: 5;
  }
  .accordion-dropdown {
    top: 50%;
    z-index: 3;
    right: 15px;
    position: absolute;
    transform: translateY(-50%);
  }
  .btn-menu {
    border: 0;
    width: 40px;
    height: 40px;
    display: flex;
    padding: 0;
    justify-content: center;
    align-items: center;
    background: none;
  }
  .btn-menu__dots {
    width: 8px;
    height: 8px;
    display: block;
    margin-left: 2px;
    margin-right: 2px;
    border-radius: 50%;
    background: var(--bs-accordion-active-color);
  }
  .btn-menu:hover .btn-menu__dots {
    background: green;
  }
  .contact-table tr td {
    padding-right: 15px;
  }
  .accordion-item--contact .accordion-body,
  .accordion-item--contact .accordion-button {
    padding-left: 80px;
  }
  .accordion-item--contact .accordion-button::after {
    top: 23px;
    left: 30px;
    position: absolute;
  }
  .accordion-item--contact:not(:first-of-type) {
    border-top: var(--bs-accordion-border-width) solid var(--bs-accordion-border-color);;
  }
  .accordion-item--contact,
  .accordion-item--contact .accordion-button {
    border-radius: 0.5rem;
  }
  .accordion-item--contact .accordion-button:hover {
    background-color: #e9f1fe;
  }
  @media (prefers-color-scheme: dark) {
    .accordion-item {
      color: #e1e3e6;
      background: #434343;
    }
  }
</style>