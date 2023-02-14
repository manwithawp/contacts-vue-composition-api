import {defineStore} from 'Pinia'

export const useContactsStore = createPinia('contactsStore', {
    state: () => ({
        contacts: async () => {
            if (localStorage.contactsList) {
                return JSON.parse(localStorage.contactsList)
            } else {
                const response = await fetch(contactsApiUrl)
                const data = await response.json()
                if (!localStorage.contactsList) {
                    localStorage.contactsList = JSON.stringify(data)
                }
                return data
            }
        }
    })
})