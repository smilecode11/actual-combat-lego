<template>
	<a-row>
		<a-col :span="6">组件列表</a-col>
		<a-col :span="12">
			<div>画布区域</div>
			{{ editorId }}
		</a-col>
		<a-col :span="6">组件属性</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
	name: "Editor",
	setup() {
		//#region 获取路由信息, 请求展示数据
		const router = useRoute();
		const editorId = router.params.id;

		return {
			editorId
		};
	},
	mounted() {
		// console.log(this.$route);
	}
});
</script>
