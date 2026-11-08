import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useLayoutStore = defineStore('layout', () => {
    // 侧边栏是否展开
    const sidebarExpanded = ref(false)
    

    // 返回数据
    return { sidebarExpanded }
})