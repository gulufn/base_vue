import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/utils/http'
import { API_BASE, API_BASE_MUSIC } from '@/config.ts'

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
    let listMusic = ref<any[]>([])
    // 搜索数据
    async function search_data() {
        if (thisPage.value === 'music') {
            //执行请求,返回请求的数据
            let data = await request.post(`${API_BASE}` + '/music/search_music', {
                keyword: keyword.value
            })
            //清空listMusic
            listMusic.value = []
            if (data.data.status == 1) {
                for (const item of data.data.data) {
                    //倒序插入
                    listMusic.value.unshift(item)
                }
            }
            return ''
        } else if (thisPage.value === 'video') {
            //执行请求,返回请求的数据
            console.log('视频页面搜索')
            return ''
        }
    }

    // 返回数据
    return { keyword, thisPage, searchTrigger, listMusic, triggerSearch, search_data }
})