<template>
	<a-layout>
		<a-layout-header>
			<a-row :gutter="16">
				<a-col :span="8">尘心@《仿慕课乐高》</a-col>
				<a-col :span="8"></a-col>
				<a-col :span="8">{{ helloMessage }}</a-col>
			</a-row>
		</a-layout-header>
		<a-layout-content class="layout-content-container">
			<router-view />
		</a-layout-content>
		<a-layout-footer>
			<a-row>
				<a-col :span="6">尘心@仿慕课乐高</a-col>
				<a-col :span="18">footer</a-col>
			</a-row>
		</a-layout-footer>
	</a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "App",
	setup() {
		const helloMessage = "hello, Chenxin";

		return {
			helloMessage
		};
	},
	components: {}
});
</script>

<style scoped>
.ant-layout {
	min-height: 100vh;
}

.ant-layout-header {
	color: antiquewhite;
}

.ant-layout-content {
	/* padding: 18px 50px; */
	background: #fff;
}
.ant-layout-footer {
	color: antiquewhite;
	background: #001529;
}
</style>
