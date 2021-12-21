<template>
	<h1>慕课乐高标准模版</h1>
	<hello :msg="helloMessage"></hello>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hello from "./components/Hello";

export default defineComponent({
	name: "App",
	setup() {
		const helloMessage = "hello, Chenxin";

		return {
			helloMessage
		};
	},
	components: {
		Hello
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
