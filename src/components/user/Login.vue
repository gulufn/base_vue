<script lang="ts">
export default { name: 'Login' }
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { API_BASE } from '@/config.ts'
import { setToken } from '@/utils/auth'
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style'  // 样式也要手动引入
import { NCard, NTabs, NTabPane, NForm, NFormItemRow, NButton, NInput } from "naive-ui";


const showPassword = ref(false);
const router = useRouter()

// 页面数据
// 注册表单数据
let registerForm = reactive({
	email: '',
	pwd: '',
	email_captcha: '',
	picture_captcha: '',
	key: '',
	idDisabled: false
})
let register_picture_captcha_url = ref<string>('')

// 获取图片验证码
async function register_send_picture_captcha_data() {
	let data = await axios.get(`${API_BASE}` + '/user/get_picture_captcha')
	register_picture_captcha_url.value = `${API_BASE}` + data.data.img_url
	registerForm.key = data.data.key
}
register_send_picture_captcha_data()

// 获取邮箱验证码
let register_email_captcha_countdown = ref<any>('获取验证码')
async function register_send_email_captcha() {
	let data = await axios.post(`${API_BASE}` + '/user/get_email_captcha',{
		email: registerForm.email
	})
	if (data.data.status == 1) {
		registerForm.idDisabled = true
		register_email_captcha_countdown.value = 60
		let timer = setInterval(() => {
			register_email_captcha_countdown.value--   // ← 这是"减"
			if (register_email_captcha_countdown.value <= 0) {
				clearInterval(timer)                     // ← 这是"停"
				register_email_captcha_countdown.value = '点击获取验证码'
				registerForm.idDisabled = false
			}
		}, 1000)
	} else {
		showFailToast(data.data.msg)
	}
}

// 注册表单提交
async function register_send_register_form() {
	if(registerForm.email == '' || registerForm.pwd == '' || registerForm.email_captcha == '' || registerForm.picture_captcha == '' || registerForm.key == ''){
		showFailToast('请填写完整信息')
		return
	}
	if(registerForm.pwd.length < 6 || registerForm.pwd.length > 20){
		showFailToast('密码长度应为6-20位')
		return
	}
	let data = await axios.post(`${API_BASE}` + '/user/register', registerForm)
	if (data.data.status == 1) {
		setToken(data.data.token)
		router.push('/')
	} else {
		registerForm.picture_captcha =''
		showFailToast(data.data.msg)
	}
	register_send_picture_captcha_data()   //不论注册成功与否，都重新获取图片验证码
}





//登录表单数据和方法
const loginForm = reactive({
	email: '',
	pwd: '',
	picture_captcha: '',
	key: ''
})
let login_picture_captcha_url = ref<string>('')
// 获取图片验证码
async function login_send_picture_captcha_data() {
	let data = await axios.get(`${API_BASE}` + '/user/get_picture_captcha')
	login_picture_captcha_url.value = `${API_BASE}` + data.data.img_url
	loginForm.key = data.data.key
}
login_send_picture_captcha_data()
// 登录表单提交
async function login_send_form() {
	if(loginForm.email == '' || loginForm.pwd == '' || loginForm.picture_captcha == '' || loginForm.key == ''){
		showFailToast('请填写完整信息')
		return
	}
	if(loginForm.pwd.length < 6 || loginForm.pwd.length > 20){
		showFailToast('密码长度应为6-20位')
		return
	}
	let data = await axios.post(`${API_BASE}` + '/user/login_by_pwd', loginForm)
	if (data.data.status == 1) {
		setToken(data.data.token)
		router.push('/')
	} else {
		loginForm.picture_captcha =''
		showFailToast(data.data.msg)
	}
	login_send_picture_captcha_data()
}
	




//免密登录表单数据和方法
const passwordlessLoginForm = reactive({
	email: '',
	email_captcha: '',
	picture_captcha: '',
	key: '',
	idDisabled: false
})
let passwordlessLogin_picture_captcha_url = ref<string>('')

// 免密登录 获取图片验证码
async function passwordlessLogin_send_picture_captcha_data() {
	let data = await axios.get(`${API_BASE}` + '/user/get_picture_captcha')
	passwordlessLogin_picture_captcha_url.value = `${API_BASE}` + data.data.img_url
	passwordlessLoginForm.key = data.data.key
}
passwordlessLogin_send_picture_captcha_data()

// 免密登录 获取邮箱验证码
let passwordlessLogin_email_captcha_countdown = ref<any>('获取验证码')
async function passwordlessLogin_send_email_captcha() {
	let data = await axios.post(`${API_BASE}` + '/user/get_email_captcha',{
		email: passwordlessLoginForm.email
	})
	if (data.data.status == 1) {
		passwordlessLoginForm.idDisabled = true
		passwordlessLogin_email_captcha_countdown.value = 60
		let timer = setInterval(() => {
			passwordlessLogin_email_captcha_countdown.value--   // ← 这是"减"
			if (passwordlessLogin_email_captcha_countdown.value <= 0) {
				clearInterval(timer)                     // ← 这是"停"
				passwordlessLogin_email_captcha_countdown.value = '点击获取验证码'
				passwordlessLoginForm.idDisabled = false
			}
		}, 1000)
	} else {
		showFailToast(data.data.msg)
	}
}

// 免密登录 表单提交
async function passwordlessLogin_send_form() {
	if(passwordlessLoginForm.email == '' || passwordlessLoginForm.email_captcha == '' || passwordlessLoginForm.picture_captcha == '' || passwordlessLoginForm.key == ''){
		showFailToast('请填写完整信息')
		return
	}
	let data = await axios.post(`${API_BASE}` + '/user/login_by_email', passwordlessLoginForm)
	if (data.data.status == 1) {
		setToken(data.data.token)
		router.push('/')
	} else {
		passwordlessLoginForm.picture_captcha = ''
		showFailToast(data.data.msg)
	}
	passwordlessLogin_send_picture_captcha_data()
}
</script>

<template>
	<div>
		<n-card>
			<n-tabs class="card-tabs" default-value="signin" size="large" animated>
				
				<n-tab-pane name="signin" tab="登录">
					<n-form>
						<van-cell-group inset>
							<van-field v-model="loginForm.email" clearable label="邮箱" type="email" placeholder="请输入邮箱" />
							<van-field v-model="loginForm.pwd" clearable label="密码" :type="showPassword ? 'text' : 'password'" placeholder="请输入密码">
								<template #right-icon>
									<van-icon :name="showPassword ? 'eye-o' : 'closed-eye'" @click="showPassword = !showPassword" class="custom-eye" />
								</template>
							</van-field>
							<van-field v-model="loginForm.picture_captcha" clearable label="图片验证码" placeholder="请输入图片验证码" type="text">
								<template #button>
									<img :src="login_picture_captcha_url" alt="验证码" class="captcha-img" @click="login_send_picture_captcha_data" />
								</template>
							</van-field>
						</van-cell-group>
					</n-form>
					<n-button type="primary" block secondary strong @click="login_send_form">登录</n-button>
				</n-tab-pane>

				<n-tab-pane name="sign" tab="免密登录">
					<n-form>
						<van-cell-group inset>
							<van-field v-model="passwordlessLoginForm.email" clearable label="邮箱" placeholder="请输入邮箱" type="email" />
							<van-field v-model="passwordlessLoginForm.email_captcha" center clearable label="邮箱验证码" placeholder="请输入邮箱验证码" type="text">
								<template #button>
									<van-button size="small" type="primary" :disabled="passwordlessLoginForm.idDisabled" @click="passwordlessLogin_send_email_captcha">
										{{passwordlessLogin_email_captcha_countdown}}
									</van-button>
								</template>
							</van-field>
							<van-field v-model="passwordlessLoginForm.picture_captcha" clearable label="图片验证码" placeholder="请输入图片验证码" type="text">
								<template #button>
									<img :src="passwordlessLogin_picture_captcha_url" alt="验证码" class="captcha-img" @click="passwordlessLogin_send_picture_captcha_data" />
								</template>
							</van-field>
						</van-cell-group>
					</n-form>
					<n-button type="primary" block secondary strong @click="passwordlessLogin_send_form">免密登录</n-button>
				</n-tab-pane>

				<n-tab-pane name="signup" tab="注册">
					<n-form>
						<van-cell-group inset>
							<van-field v-model="registerForm.email" clearable label="邮箱" type="email" placeholder="请输入邮箱" :maxlength="50"/>
							<van-field v-model="registerForm.pwd" clearable label="密码" :type="showPassword ? 'text' : 'password'" placeholder="请输入6-20个字符的密码" :maxlength="20">
								<template #right-icon>
									<van-icon :name="showPassword ? 'eye-o' : 'closed-eye'" @click="showPassword = !showPassword" class="custom-eye" />
								</template>
							</van-field>
							<van-field v-model="registerForm.email_captcha" center clearable label="邮箱验证码" placeholder="请输入验证码" type="text" :maxlength="6">
								<template #button>
									<van-button size="small" type="primary" @click="register_send_email_captcha" :disabled="registerForm.idDisabled">{{ register_email_captcha_countdown }}</van-button>
								</template>
							</van-field>
							<van-field v-model="registerForm.picture_captcha" clearable label="图片验证码" placeholder="请输入图片验证码" type="text" :maxlength="6">
								<template #button>
									<img :src="register_picture_captcha_url" alt="验证码" class="captcha-img" @click="register_send_picture_captcha_data" />
								</template>
							</van-field>
						</van-cell-group>
					</n-form>
					<n-button type="primary" @click="register_send_register_form" block secondary strong>注册</n-button>
				</n-tab-pane>

			</n-tabs>
		</n-card>
	</div>
</template>

<style lang="scss" scoped></style>