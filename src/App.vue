<script lang="ts">
export default { name: 'App' }
</script>
<script setup lang="ts">
import AppHeaderM from '@/components/mobile/AppHeaderM.vue'
import AppNavM from '@/components/mobile/AppNavM.vue'
import AppHeaderP from '@/components/pc/AppHeaderP.vue'
import AppNavP from '@/components/pc/AppNavP.vue'
import { ref, computed, watch } from 'vue'
import { useWindowSize } from '@vant/use'
import { useLayoutStore } from '@/stores/layout'

//获取当前窗口宽度
const { width } = useWindowSize()
//获取布局状态
const layout = useLayoutStore()
//计算网格布局样式
const gridStyle = computed(() => ({
	gridTemplateColumns: layout.sidebarExpanded ? '2fr 43fr' : '6fr 39fr'
}))
//判断当前是移动端还是PC端
const isDisplay = ref()
if (width.value >= 1024) {
	isDisplay.value = false
} else {
	isDisplay.value = true
}
//监听窗口宽度变化，动态切换布局
watch(() => width.value, (val) => {
	if (val >= 1024) {
		isDisplay.value = false
	} else {
		isDisplay.value = true
	}
})
</script>
<template>
	<div class="app" :style="gridStyle">
		<header class="app-header">
			<AppHeaderM v-if="isDisplay" />
			<AppHeaderP v-if="!isDisplay" />
		</header>
		<nav class="app-nav">
			<AppNavM v-if="isDisplay" />
			<AppNavP v-if="!isDisplay" />
		</nav>
		<main class="app-content">
			<router-view />
		</main>
	</div>
</template>
<style lang="scss" scoped>
.app {
	border: 1px solid rgb(0, 0, 0);
	display: flex; // 弹性布局，一维结构
	flex-direction: column; // 所有子元素竖向堆叠
	height: 100dvh; // 满屏

	.app-header {
		border: 1px solid #d9dee4;
		order: 1; //放顶部
		height: 46px; //容器期望高度
		min-height: 0; //容器允许的最小高度
		overflow: hidden; //超过高度就隐藏掉，避免主页面结构变形
	}

	.app-nav {
		border: 1px solid rgb(0, 0, 0);
		order: 3; // 放到底部
		height: 50px; //容器期望高度
		min-height: 0; //容器允许的最小高度
		overflow: hidden; //超过高度就隐藏掉，避免主页面结构变形
	}

	.app-content {
		border: 1px solid rgb(0, 0, 0);
		order: 2; // 放到中间
		flex: 1; // 吃掉剩余高度 
		min-height: 0; //容器允许的最小高度
		overflow: hidden; //超过高度就隐藏掉，避免主页面结构变形
	}
}

/* ===== PC 端 ===== */
@media (min-width: 1024px) {
	.app {
		display: grid; // 弹性布局，二维结构
		grid-template-areas: // 网格布局
			"nav header"
			"nav    content";
		// grid-template-columns: 6fr 39fr; // 第一列：占1份         第二列：占10份
		grid-template-rows: 1fr 16fr; // 第一行：占1份         第二行：占20份 
		transition: grid-template-columns 0.3s;

		.app-header {
			grid-area: header; // 对应父容器里的header区域
			height: 100%; //覆盖移动端设置的高度
		}

		.app-nav {
			grid-area: nav; // 对应父容器里的nav区域
			height: 100%; //覆盖移动端设置的高度
		}

		.app-content {
			grid-area: content; // 对应父容器里的content区域
		}
	}
}
</style>