<script lang="ts">
export default { name: 'MusicList' }
</script>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { API_BASE, API_BASE_MUSIC } from '@/config.ts'
import { showFailToast } from 'vant';
import { useSearchStore } from '@/stores/search'
import request from '@/utils/http'

const props = defineProps({
  api: { type: String, required: true },        // 接口路径，如 '/music/get_favorite_list'
})


const store = useSearchStore()

let youbiao = 0;
let key = ref('')
let status = ref(0)

//获取音乐列表
async function get_music_list() {
	let data: any
	try {
		data = await request.post(props.api, {
			youbiao: youbiao
		})
	} catch (err) {
		data = err
	}
	if (data.data.status == 1) {
		status.value = 1
		key.value = data.data.data.key
		const list = data.data.data.data;
		if (youbiao == 0) {
			store.listMusic = []
		}
		store.listMusic.push(...list)

	} else {
		status.value = 0
		showFailToast(data.data.msg)
	}
}
get_music_list()

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = async () => {
	await new Promise(r => setTimeout(r, 800));
	try {
		youbiao = youbiao + 10
		await get_music_list();   //  等请求完成
	} finally {
		if (status.value == 1) {
			loading.value = false;    //  无论成败都重置
		} else {
			loading.value = true;    //  无论成败都重置
		}
	}
}
async function onRefresh() {
	await new Promise(r => setTimeout(r, 800));
	youbiao = 100000
	store.listMusic = []
	finished.value = false
	get_music_list()
		.then(() => {
			refreshing.value = false
		})
		.catch(() => {
			refreshing.value = false
		})
}
//切换收藏
async function toggleFavorite(item: any) {
	let data = await request.post(`${API_BASE}` + '/music/toggle_favorites_music', {
		music_id: item.id,
		is_favorite: item.is_favorite
	})
	if (data.data.status == 1) {
		item.is_favorite = !item.is_favorite
		showFailToast(data.data.msg)
	} else {
		showFailToast(data.data.msg)
	}
}

let musicUrl = ref('')
function bofang(name: string) {
	musicUrl.value = API_BASE_MUSIC + '/music/' + name + '?key=' + key.value
}
</script>

<template>
	<div class="page">
		<div class="list-wrap">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
					:offset="50">
					<van-cell v-for="(item,index) in store.listMusic" :key="`${item.id}-${index}`" :title="item.title" :label="item.artist"
						@click="bofang(item.name)">
						<template #right-icon>
							<van-icon :name="item.is_favorite ? 'star' : 'star-o'"
								:color="item.is_favorite ? '#ff5000' : '#c8c9cc'" size="20"
								@click='toggleFavorite(item)' />
						</template>
					</van-cell>
				</van-list>
			</van-pull-refresh>

		</div>
		<!-- 播放器：固定在底部 -->
		<div class="player-bar">
			<audio :src="musicUrl" controls autoplay></audio>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	border: 1px solid rgb(0, 0, 0);
	display: flex; // 弹性布局，一维结构
	flex-direction: column; // 所有子元素竖向堆叠
	height: 100%;

	.list-wrap {
		border: 1px solid rgb(0, 0, 0);
		overflow-y: auto; // 中间滚动
		flex: 1; // 吃掉剩余高度 
		min-height: 0; //容器允许的最小高度
	}

	.player-bar {
		border: 1px solid rgb(0, 0, 0);

		// order: 2; // 放到底部
		audio {
			width: 100%;
		}
	}

}
</style>