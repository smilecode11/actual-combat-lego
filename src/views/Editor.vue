<template>
	<a-row class="editor-header">
		<a-button type="text" @click="handleGoBack">
			<template #icon><LeftOutlined /></template>
			返回
		</a-button>
	</a-row>
	<a-row class="editor-content">
		<a-col :span="6" class="component-container"> 组件列表 </a-col>
		<a-col :span="12" class="canvas-container">
			画布区域
			{{ editorId }}
		</a-col>
		<a-col :span="6" class="attr-container">组件属性</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button as AButton } from "ant-design-vue";
import { LeftOutlined } from "@ant-design/icons-vue";

export default defineComponent({
	name: "Editor",
	setup() {
		//#region 获取路由信息, 请求展示数据
		const router = useRoute();
		const editorId = router.params.id;
		//#endregion 获取路由信息, 请求展示数据

		//#region 返回按钮事件注册
		const route = useRouter();
		const handleGoBack = () => {
			route.back();
		};
		//#endregion 返回按钮事件注册

		return {
			editorId,
			handleGoBack
		};
	},
	components: {
		AButton,
		LeftOutlined
	}
});
</script>

<style scoped>
.editor-header {
	height: 46px;
	display: flex;
	align-items: center;
	background: floralwhite;
}
.editor-content {
	min-height: calc(100vh - 46px);
}
.component-container {
	background: aquamarine;
}

.canvas-container {
	background: cornsilk;
}

.attr-container {
	background: burlywood;
}
</style>
