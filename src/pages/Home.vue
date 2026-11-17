<script lang="ts">
export default { name: 'Home' }
</script>
<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { API_BASE } from '@/config.ts'
import { showFailToast } from 'vant';
import { NSelect } from 'naive-ui'
import { useChatNewsStore } from '@/stores/chat_news'
import request from '@/utils/http'

const store = useChatNewsStore()

const langOptions = [
	{ label: '中文', value: '中文' },
	{ label: '英语', value: '英语' },
	{ label: '法语', value: '法语' },
	{ label: '乌克兰语', value: '乌克兰语' },
	{ label: '日语', value: '日语' },
	{ label: '俄语', value: '俄语' },
	{ label: '阿拉伯语', value: '阿拉伯语' },
	{ label: '韩语', value: '韩语' },
	{ label: '繁体中文', value: '繁体中文' },
	{ label: '藏语', value: '藏语' },
	{ label: '哈萨克语', value: '哈萨克语' },
	{ label: '蒙古语', value: '蒙古语' },
	{ label: '维吾尔语', value: '维吾尔语' },
	{ label: '粤语', value: '粤语' },
	{ label: '葡萄牙语', value: '葡萄牙语' },
	{ label: '西班牙语', value: '西班牙语' },
	{ label: '土耳其语', value: '土耳其语' },
	{ label: '泰语', value: '泰语' },
	{ label: '意大利语', value: '意大利语' },
	{ label: '德语', value: '德语' },
	{ label: '越南语', value: '越南语' },
	{ label: '马来语', value: '马来语' },
	{ label: '印尼语', value: '印尼语' },
	{ label: '菲律宾语', value: '菲律宾语' },
	{ label: '印地语', value: '印地语' },
	{ label: '波兰语', value: '波兰语' },
	{ label: '捷克语', value: '捷克语' },
	{ label: '荷兰语', value: '荷兰语' },
	{ label: '高棉语', value: '高棉语' },
	{ label: '缅甸语', value: '缅甸语' },
	{ label: '波斯语', value: '波斯语' },
	{ label: '古吉拉特语', value: '古吉拉特语' },
	{ label: '乌尔都语', value: '乌尔都语' },
	{ label: '泰卢固语', value: '泰卢固语' },
	{ label: '马拉地语', value: '马拉地语' },
	{ label: '希伯来语', value: '希伯来语' },
	{ label: '孟加拉语', value: '孟加拉语' },
	{ label: '泰米尔语', value: '泰米尔语' }
]

const youbiao = ref('0');
const last_youbiao = ref('')
const listRef = ref<HTMLElement | null>(null)

const loading = ref(false);
const finished = ref(false);
// 关键：首次数据渲染并滚到底部之前，禁止 van-list 自动触发 @load
const listReady = ref(false);
const initialLoaded = ref(false);

async function get_chat_news_list() {
	const data = await request.post(`${API_BASE}` + '/home/get_chat_list', {
		youbiao: youbiao.value
	})
	if (data.data.status == 1) {
		const list = data.data.data;
		if (youbiao.value == '0') {
			store.chat_news = []
		}
		for (const item of list) {
			store.chat_news.unshift(item)
		}
		last_youbiao.value = youbiao.value;
		if (list.length > 0) {
			youbiao.value = store.chat_news[0]['created_at'];
		}
		return list.length > 0;
	} else {
		showFailToast(data.data.msg)
		return false;
	}
}

async function scrollToBottom() {
	await nextTick();
	const el = listRef.value;
	if (!el) return;
	const scroller = el.querySelector('.content') as HTMLElement | null;
	const target = scroller ?? el;
	target.scrollTop = target.scrollHeight;
}

// 只有 listReady 为 true 时 van-list 才会触发
async function onLoad() {
	if (!listReady.value) return;
	if (last_youbiao.value != youbiao.value) {
		const hasMore = await get_chat_news_list();
		if (!hasMore) finished.value = true;
	} else {
		finished.value = true;
	}
	loading.value = false;
}

onMounted(async () => {
	loading.value = true;
	try {
		await get_chat_news_list();
		await scrollToBottom();
		initialLoaded.value = true;
	} finally {
		loading.value = false;
		// 首次加载 + 滚动完成后，再放开 van-list 的加载能力
		await nextTick();
		listReady.value = true;
	}
});


const content = ref('')
const target_lang = ref('英语')
const buttonDisabled = ref(false)

async function sendMessage() {
	if (content.value.length > 0) {
		buttonDisabled.value = true // 禁用发送按钮
		let data = await request.post(`${API_BASE}` + '/home/create_chat_task', {
			content: content.value,
			target_lang: target_lang.value
		})
		if (data.data.status == 1) {
			store.chat_news.push(data.data.data[0])
			await nextTick()        // 等 DOM 更新完
			scrollToBottom()         //滚动到底部
			content.value = '' // 清空输入框

			let n=0
			let flag = false
			let answer:any;
			while (true) {
				//开始要结果
				answer = await request.post(`${API_BASE}` + '/home/get_answer', {id: data.data.data[0].id})
				if(answer.data.status == 1){
					store.chat_news.push(answer.data.data)
					break
				}
				if(n>=10){
					break
				}
				n=n+1;
				await new Promise(r => setTimeout(r, 1000))
			}
			if(flag){
				showFailToast(answer.data.msg)
			}

			await nextTick()        // 等 DOM 更新完
			scrollToBottom()         //滚动到底部
			buttonDisabled.value = false // 重新启用发送按钮
		} else {
			showFailToast(data.data.msg)
			buttonDisabled.value = false // 重新启用发送按钮
		}

	}

}

</script>

<template>
	<div class="page">
		<div class="header">
			<span>选择目标语言：</span>
			<n-select v-model:value="target_lang" :options="langOptions" placeholder="目标语言" />
		</div>
		<div class="content" ref="listRef">
			<!-- 只有 listReady 后才渲染 van-list，彻底避免初始化自动 @load -->
			<van-list v-if="listReady" v-model:loading="loading" :finished="finished" direction="up"
				finished-text="没有更多了" @load="onLoad">
				<van-cell style="max-height: 180px;min-height: 80px;" v-for="item in store.chat_news" :key="item.id"
					:title="item.content" :label="item.created_at"
					:class="item.role == 1 ? 'align-right' : 'align-left'" />
			</van-list>
			<!-- 首次加载时的普通列表，仅用于渲染并滚动到底部 -->
			<template v-else>
				<van-cell style="max-height: 180px;min-height: 80px;" v-for="item in store.chat_news" :key="item.id"
					:title="item.content" :label="item.created_at"
					:class="item.role == 1 ? 'align-right' : 'align-left'" />
			</template>
		</div>
		<div class="buttom">
			<van-cell-group inset>
				<van-field v-model="content" rows="2" autosize label="" type="textarea" maxlength="1000"
					placeholder="请输入内容" show-word-limit>
					<template #button>
						<van-button size="small" type="primary" :disabled="buttonDisabled" @click="sendMessage">
							发送
						</van-button>
					</template>
				</van-field>
			</van-cell-group>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	border: 1px solid rgb(0, 0, 0);
	display: flex;
	flex-direction: column;
	height: 100%;


	.header {
		border: 1px solid #e1e4e8;
		height: 34px;
		display: flex; //弹性布局
		flex-direction: row; //横排
		align-items: center; //上下居中

		span {
			white-space: nowrap; //强制不换行
		}
	}

	.content {
		border: 1px solid #e1e4e8;
		flex: 1;
		overflow-y: auto;

		// .chat-scroll {
		flex: 1;
		overflow-y: auto;

		.tip {
			text-align: center;
			padding: 10px;
			color: #999;
			font-size: 13px;
		}

		.align-right,
		.align-left {
			:deep(.van-cell__title) {
				flex: none; // ★ 关键：不拉伸
				max-width: 80%;
				padding: 6px 10px;
				border-radius: 8px;
				white-space: normal;
				word-break: break-word;
				overflow-wrap: anywhere;
			}
		}

		.align-right {
			:deep(.van-cell__title) {
				text-align: right;
				margin-left: auto; // 靠右
				background-color: rgb(91, 207, 91);
			}
		}

		.align-left {
			:deep(.van-cell__title) {
				text-align: left;
				margin-right: auto; // 靠左
				background-color: #f5f5f5;
			}
		}

		// }

	}

	.buttom {
		border: 1px solid rgb(0, 0, 0);
		order: 3;
	}

}
</style>