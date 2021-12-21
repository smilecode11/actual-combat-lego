<template>
	<a-row class="detail-container">
		<a-col :span="12" class="detail-left">detail-container Left</a-col>
		<a-col :span="12" class="detail-right">
			<div>detail-container Right</div>
			<div class="info-wrapper">info-wrapper</div>
			<div class="opera-wrapper">
				<div>opera-wrapper</div>
				<a-button type="primary" danger @click="handleRouterGoEditor">
					<template #icon><EditOutlined /></template>
					编辑
				</a-button>
			</div>
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "ant-design-vue";
import { EditOutlined } from "@ant-design/icons-vue";

export default defineComponent({
	name: "Detail",
	setup() {
		const route = useRoute();
		const router = useRouter();

		//#region 详情路由跳转事件
		const handleRouterGoEditor = () => {
			router.push({
				path: `/editor/${route.params.id}`
			});
		};
		//#endregion

		return {
			handleRouterGoEditor
		};
	},
	components: {
		EditOutlined,
		AButton: Button
	}
});
</script>

<style scoped>
.detail-container {
	padding: 8px 50px;
	min-height: calc(100vh - 64px - 70px);
}

.detail-right {
	border-left: 1px solid #f2f2f2;
	padding: 18px;
}
</style>
