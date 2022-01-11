<template>
	<a-dropdown-button v-if="user.isLogin" class="user-profile-component">
		{{ user.userName }}
		<!-- 具名插槽 overlay -->
		<template #overlay>
			<a-menu class="user-profile-dropdown">
				<a-menu-item key="usercenter" @click="handleRouterGoCenter">
					个人中心
				</a-menu-item>
				<a-menu-item key="logout" @click="logout"> 登出 </a-menu-item>
			</a-menu>
		</template>
	</a-dropdown-button>
	<a-button class="login-btn" @click="handleRouterGoLogin" type="primary" v-else
		>登录</a-button
	>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import { message } from "ant-design-vue";
import { GlobalDataProps } from "@/store/index";

export default defineComponent({
	props: {
		user: {
			isRequired: true,
			default: () => ({ isLogin: false, userName: "" })
		}
	},
	setup() {
		const instance = getCurrentInstance();
		const router = useRouter();
		//#region 用户操作相关
		const store = useStore<GlobalDataProps>();
		//  登出
		const logout = () => {
			(instance?.proxy as any).message.success("操作成功, 2s 后登出用户.");
			// message.success("操作成功, 2s 后登出用户.");

			setTimeout(() => {
				store.commit("logout");
				router.push("/");
			}, 2000);
		};
		//  用户中心页面路由
		const handleRouterGoCenter = () => {
			router.push("/mycenter");
		};
		//  登录页面路由
		const handleRouterGoLogin = () => {
			router.push(`/login`);
		};
		//#endregion

		return {
			logout,
			handleRouterGoCenter,
			handleRouterGoLogin
		};
	}
});
</script>
