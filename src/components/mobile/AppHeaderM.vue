<script lang="ts">
export default { name: 'AppHeaderM' }
</script>
<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { SearchInstance } from 'vant'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/search'

const store = useSearchStore()
const route = useRoute()

//和页面显示有关的
const showSearch = ref(false)                //导航栏和搜索栏的显示与隐藏，二者互斥
const onClickLeft = () => history.back();    //回退，回到上一个路由


const title = computed<string>(() => route.meta.title as string || '')         //通过路由获取标题
const showSearchBtn = computed(() => route.meta.title === '音乐' || route.meta.title === '视频')      //通过路由判断当前页面
// 搜索关键词,数据
const keyword = ref('')
// 搜索方法
const onSearch = () => {
	console.log('搜索：', keyword.value)
	store.searchTrigger =store.searchTrigger+1       //让别的页面知道点击了搜索
}
// 取消搜索
const cancelSearch = () => {
	showSearch.value = false
	keyword.value = ''
}

// 打开时自动聚焦
const searchInput = ref<SearchInstance | null>(null)  // 关键在这里
watch(showSearch, async (val) => {
	if (val) {
		await nextTick()
		searchInput.value?.focus()  // 现在类型正确，不会报错
	}
})

// 监听路由变化，清空搜索框
watch(title, (val) => {
	cancelSearch()
	if(title.value === '音乐'){store.thisPage = 'music'}
	if(title.value === '视频'){store.thisPage = 'video'}
	store.searchTrigger=0
})
// 监听keyword变化，同步pinia
watch(keyword, (val) => {
	store.keyword=val
})

</script>

<template>
	<div class="page">
		<van-nav-bar v-if="!showSearch" :title="title" left-arrow @click-left="onClickLeft">
			<template #right v-if="showSearchBtn">
				<van-icon name="search" size="18" @click="showSearch = true" />
			</template>
		</van-nav-bar>
		<van-search v-else v-model="keyword" placeholder="请输入搜索关键词" show-action ref="searchInput" @search="onSearch">
			<template #action>
				<div @click="cancelSearch">取消</div>
			</template>
			<template #left>
				<div @click="onSearch">搜索</div>
			</template>
		</van-search>
	</div>
</template>

<style lang="scss" scoped></style>