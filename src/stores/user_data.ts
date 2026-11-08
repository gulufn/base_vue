import { ref } from 'vue'
import { defineStore } from 'pinia'

export const emailStore = defineStore('user_data', () => {
    const email = ref('')

    return { email }
})