import { ref } from 'vue'
import { defineStore } from 'pinia'

export const emailStore = defineStore('user_data', () => {
    const email = ref('')
    const isLoggedIn = ref(false)

    return { email ,isLoggedIn,}
})