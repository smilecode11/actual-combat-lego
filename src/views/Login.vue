<template>
	<a-row class="login-container" :gutter="24">
		<a-col :span="12" class="left-wrapper">Left</a-col>
		<a-col :span="12" class="right-wrapper">
			<!-- 登录模块 -->
			<section class="form-wrapper">
				<a-form layout="horizontal" :model="formState" @finish="handleFinish">
					<!-- @finishFailed="handleFinishFailed" -->
					<a-form-item>
						<a-input v-model:value="formState.user" placeholder="用户名">
							<template #prefix
								><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
							/></template>
						</a-input>
					</a-form-item>
					<a-form-item>
						<a-input
							v-model:value="formState.password"
							type="password"
							placeholder="密码"
						>
							<template #prefix
								><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
							/></template>
						</a-input>
					</a-form-item>
					<a-form-item class="code-wrapper">
						<a-input
							v-model:value="formState.code"
							placeholder="验证码"
						></a-input>
						<a-button
							:disabled="codeNum !== 0"
							@click="sendCode"
							class="code-button"
							>{{ codeNum ? codeNumComp : "发送验证码" }}</a-button
						>
					</a-form-item>
					<a-form-item>
						<a-button
							:loading="loginLoading"
							type="primary"
							html-type="submit"
							:disabled="
								formState.user === '' ||
								formState.password === '' ||
								formState.code === ''
							"
						>
							登录
						</a-button>
					</a-form-item>
				</a-form>
			</section>
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

/** 倒计时时长*/
const COUNT_NUM = 5;

export default defineComponent({
	name: "Login",
	setup() {
		//#region 登录相关
		const codeNum = ref(0);
		//	发送验证码
		const sendCode = () => {
			codeNum.value = COUNT_NUM;
			// 倒计时
			const intervalTimer = setInterval(() => {
				codeNum.value -= 1;
				if (codeNum.value <= 0) {
					clearInterval(intervalTimer);
				}
			}, 1000);
		};
		const codeNumComp = computed(() => codeNum.value + "s 后重试");

		const loginLoading = ref(false);
		const formState = reactive({
			user: "",
			password: "",
			code: ""
		});
		const router = useRouter();
		//	登录
		const handleFinish = () => {
			loginLoading.value = true;
			console.error("handleFinish: ", formState);
			setTimeout(() => {
				loginLoading.value = false;
				router.push(`/home`);
			}, 1500);
		};
		//#endregion 登陆相关

		return {
			codeNum,
			codeNumComp,
			sendCode,
			loginLoading,
			formState,
			handleFinish
		};
	},
	components: {
		UserOutlined,
		LockOutlined
	}
});
</script>

<style scoped>
.login-container {
	min-height: 100vh;
}

.left-wrapper {
	background: cornsilk;
}

.right-wrapper {
	padding-left: 36px !important;
	background: floralwhite;
	border-left: 1px solid #f2f2f2;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.right-wrapper .form-wrapper {
	padding: 12px;
	width: 360px;
	/* border: 1px solid lavenderblush; */
}

.form-wrapper .code-wrapper /deep/ .ant-form-item-control-input-content {
	display: flex;
	align-items: center;
}

.code-wrapper .code-button {
	margin-left: 8px;
}
</style>
