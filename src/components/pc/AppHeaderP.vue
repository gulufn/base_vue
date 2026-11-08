<script lang="ts">
export default { name: 'AppHeaderP' }
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import menu from '@/assets/img/menu.svg'


const store = useLayoutStore()

</script>

<template>
	<div class="page">
		<img :src="menu" alt="" @click="store.sidebarExpanded = !store.sidebarExpanded">     <!--页面布局状态切换-->
	</div>
</template>

<style lang="scss" scoped>
.page {
	background-color: #ededed;
	height: 100%;
	display: flex;
	flex-direction: row; // 所有子元素横向堆叠
	align-items: center;

	img {
		width: 30px;
		height: 30px;
		margin-left: 10px;
	}
}
</style>