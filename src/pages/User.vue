<script lang="ts">
export default { name: 'User' }
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import Login from '@/components/user/Login.vue'
import Profile from '@/components/user/Profile.vue'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { API_BASE } from '@/config.ts'
import { emailStore } from '@/stores/user_data'
import request from '@/utils/http'


const store = emailStore()


async function verify_token() {
	let url = `${API_BASE}` + '/user/verify_token'         //?token=' + getToken()
	let data = await request.get(url)
	
	if (data.data.status == 1) {
		store.isLoggedIn = true
		store.email = data.data.data['email']
	} else {
		store.isLoggedIn = false
	}
}
//检测到没有登录才验证token
if(!store.isLoggedIn){
	verify_token()
}



</script>

<template>
	<div class="page">
		<Profile v-if="store.isLoggedIn" />
		<Login v-else/>
	</div>
</template>

<style lang="scss" scoped>
.page{
	height: 100%;
	overflow-y: auto; // 中间滚动
}
</style>