import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatNewsStore = defineStore('chat_news', () => {
    const chat_news = ref<any[]>([])

    return { chat_news }
})