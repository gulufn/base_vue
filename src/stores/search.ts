import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useSearchStore = defineStore('search', () => {
    //搜索关键字
    let keyword = ref('')
    //当前页面
    let thisPage = ref('')
    //搜索状态
    let searchTrigger = ref(0)
    // 触发搜索
    function triggerSearch() {
        searchTrigger.value++
    }
    // 搜索数据
    async function search_data() {
        if (thisPage.value === 'music') {
            //执行请求,返回请求的数据
            console.log('音乐页面搜索')
            return ''
        } else if (thisPage.value === 'video') {
            //执行请求,返回请求的数据
            console.log('视频页面搜索')
            return ''
        }
    }

    // 返回数据
    return { keyword, thisPage, searchTrigger, triggerSearch, search_data }
})