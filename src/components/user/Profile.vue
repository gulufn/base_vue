<script lang="ts">
export default { name: 'Profile' }
</script>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { emailStore } from '@/stores/user_data'
import { useRouter, useRoute } from 'vue-router'
import { getToken, setToken, removeToken } from '@/utils/auth'


const route = useRoute()
const router = useRouter()
const store = emailStore()

const isProfile = computed(() => route.name === 'user')

const name = store.email
const accountName = ref(name.split('@')[0])
const accountHandle = ref(name)

const avatarUrl = ref('')
const avatarError = ref(false)

const onAvatarError = () => {
	avatarError.value = true
}

const accountInitial = computed(() => {
	if (!accountName.value) return '?'
	return accountName.value.charAt(0).toUpperCase()
})

//去音乐收藏页面
const music_collect = () => {
	router.push(`/user/music_collect`)
}
//去视频收藏页面
const video_collect = () => {
	router.push(`/user/video_collect`)
}
//去用户设置页面
const user_setting = () => {
	router.push(`/user/user_setting`)
}
//退出登录状态
const login_out = () => {
	removeToken()
	window.location.href = '/user'
}
</script>

<template>
	<div class="page">
		<div class="profile-page" v-show="isProfile">
			<div class="profile-header">
				<div class="touxiang">
					{{ accountInitial }}
				</div>
				<div class="userdata">
					<span class="s1">{{ accountName }}</span>
					<span class="s2">{{ accountHandle }}</span>
				</div>
			</div>

			<div class="settings">
				<van-cell-group inset>
					<van-cell title="音乐收藏" is-link @click="music_collect" />
				</van-cell-group>
				<!-- <van-cell-group inset>
					<van-cell title="视频收藏" is-link @click="video_collect" />
				</van-cell-group> -->
				<van-cell-group inset>
					<van-cell title="账号设置" is-link @click="user_setting" />
				</van-cell-group>
				<van-cell-group inset>
					<van-cell title="退出登录" is-link @click="login_out" />
				</van-cell-group>
			</div>
		</div>
		<div class="users">
			<router-view />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	height: 100%;

	.profile-page {
		height: 100%;

		.profile-header {
			border: 1px solid #edf0f5;
			display: flex;
			flex-direction: row;
			height: 9%;
			padding: 20px 24px;
			align-items: center;
			border-radius: 16px;
			font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

			.touxiang {
				width: 64px;
				height: 64px;
				border-radius: 50%;
				background-color: #4a6cf0;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24px;
				font-weight: 500;
				font-weight: bolder;
			}

			.userdata {
				display: flex;
				flex-direction: column;
				margin-left: 16px;

				.s1 {
					font-size: 18px;
					font-weight: 600;
					color: #1a1f2e;
					line-height: 1.3;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.s2 {
					margin-top: 4px;
					font-size: 13px;
					color: #8b95a8;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

			}

		}

		.settings {

			// 每组分隔
			:deep(.van-cell-group--inset) {
				margin-bottom: 12px;
				margin-top: 12px;
				border-radius: 12px;
			}

			// 单个 cell 高度增加，内容更松
			:deep(.van-cell) {
				padding-top: 16px;
				padding-bottom: 16px;
				font-size: 15px;
			}
		}
	}

	.users {
		height: 100%;
	}

}
</style>