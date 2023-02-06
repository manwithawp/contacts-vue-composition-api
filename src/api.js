const contactsApiUrl = 'https://mocki.io/v1/ad75334b-6762-4998-a5c5-975e58f9a759'

export const loadContacts = async () => {
    if (localStorage.contactsList) {
        return JSON.parse(localStorage.contactsList)
    } else {
        const response = await fetch(contactsApiUrl)
        const data = await response.json()
        // const mapped = data.map((item, id) => ({...item, id}))
        if (!localStorage.contactsList) {
            localStorage.contactsList = JSON.stringify(data)
        }
        return data
    }
}