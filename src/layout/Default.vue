<template>
	<a-layout>
		<a-layout-header>
			<a-row :gutter="16">
				<a-col :span="8">
					<h2 @click="handleRouterGoHome" class="logo-wrapper">
						尘心@《仿慕课乐高》
					</h2>
				</a-col>
				<a-col :span="12"></a-col>
				<a-col :span="4">
					<user-profile
						:user="user"
						@onMenuClick="handleMenuClick"
						@onRouterGoLogin="handleRouterGoLogin"
					></user-profile>
				</a-col>
			</a-row>
		</a-layout-header>
		<a-layout-content class="layout-content-container">
			<router-view />
		</a-layout-content>
		<a-layout-footer>
			<a-row>
				<a-col :span="6">尘心@《仿慕课乐高》</a-col>
			</a-row>
		</a-layout-footer>
	</a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { GlobalDataProps } from "@/store/index";

import UserProfile from "./components/UserProfile.vue";

export default defineComponent({
	name: "App",
	setup() {
		const router = useRouter();

		//#region logo 相关
		const handleRouterGoHome = () => {
			router.push("/");
		};
		//#endregion logo 相关

		//#region 用户操作相关
		const store = useStore<GlobalDataProps>();
		const user = computed(() => store.state.user);
		const handleMenuClick = (data: { key: string }) => {
			const { key } = data;
			if (key === "usercenter") {
				router.push("/mycenter");
			} else if (key === "logout") {
				store.commit("logout");
				router.push("/");
			}
		};
		//  登录页面跳转
		const handleRouterGoLogin = () => {
			router.push(`/login`);
		};
		//#endregion

		return {
			handleRouterGoHome,
			user,
			handleMenuClick,
			handleRouterGoLogin
		};
	},
	components: {
		UserProfile
	}
});
</script>

<style scoped>
.logo-wrapper {
	color: lavenderblush;
	cursor: pointer;
}
.ant-layout {
	min-height: 100vh;
}

.ant-layout-header {
	color: antiquewhite;
}

.ant-layout-content {
	background: #fff;
}
.ant-layout-footer {
	color: antiquewhite;
	background: #001529;
}
</style>
