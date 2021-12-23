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
					<a-dropdown-button v-if="user.isLogin">
						{{ user.userName }}
						<template #overlay>
							<a-menu @click="handleMenuClick">
								<a-menu-item key="usercenter"> 个人中心 </a-menu-item>
								<a-menu-item key="logout"> 登出 </a-menu-item>
							</a-menu>
						</template>
					</a-dropdown-button>
					<a-button @click="handleRouterGoLogin" type="primary" v-else
						>登录</a-button
					>
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
	components: {}
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
