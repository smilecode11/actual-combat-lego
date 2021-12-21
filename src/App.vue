<template>
	<h1>慕课乐高标准模版</h1>
	<divider orientation="left">tsx component test</divider>
	<hello :msg="helloMessage"></hello>
	<divider orientation="left">antd-vue test</divider>
	<antd-vue></antd-vue>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Divider } from "ant-design-vue";

import Hello from "./components/Hello";
import AntdVue from "./components/AntdVue";

export default defineComponent({
	name: "App",
	setup() {
		const helloMessage = "hello, Chenxin";

		return {
			helloMessage
		};
	},
	components: {
		Hello,
		AntdVue,
		Divider
	}
});
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
