<script lang="ts">
export default { name: 'Music' }
</script>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import MusicList from '@/components/music/MusicList.vue'
import { API_BASE, API_BASE_MUSIC } from '@/config.ts'
import { useSearchStore } from '@/stores/search'

const store = useSearchStore()

//设置获取音乐列表的接口
const api = ref(API_BASE + '/music/get_music_list')
//监听搜索栏
watch(() => store.keyword, (val) => {
	store.search_data()
})
</script>

<template>
	<div class="page">
		<MusicList :api=api />
	</div>
</template>

<style lang="scss" scoped>
.page {
	border: 1px solid rgb(0, 0, 0);
	height: 100%;

}
</style>