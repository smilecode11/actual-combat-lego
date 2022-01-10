<template>
	<div class="user-profile">
		<a-dropdown-button v-if="user.isLogin">
			{{ user.userName }}
			<template #overlay>
				<a-menu @click="handleMenuClick">
					<a-menu-item key="usercenter"> 个人中心 </a-menu-item>
					<a-menu-item key="logout"> 登出 </a-menu-item>
				</a-menu>
			</template>
		</a-dropdown-button>
		<a-button @click="handleRouterGoLogin" type="primary" v-else>登录</a-button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	props: ["user"],
	emits: ["onMenuClick", "onRouterGoLogin"],
	setup(props, context) {
		const handleMenuClick = (data: any) => {
			context.emit("onMenuClick", data);
		};
		const handleRouterGoLogin = () => {
			context.emit("onRouterGoLogin");
		};
		return {
			handleMenuClick,
			handleRouterGoLogin
		};
	}
});
</script>
