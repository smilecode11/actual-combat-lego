<template>
	<a-row class="detail-container">
		<a-col :span="12" class="detail-left">
			<div>{{ templateDetail }}</div>
		</a-col>
		<a-col :span="12" class="detail-right">
			<div class="info-wrapper">
				<div class="title">title: {{ templateDetail.title }}</div>
				<div class="desc" v-if="templateDetail.description">
					desc: {{ templateDetail.description }}
				</div>
				<div class="praise">parise: {{ templateDetail.praise }}</div>
				<div class="collect">collect: {{ templateDetail.collect }}</div>
			</div>
			<div class="opera-wrapper">
				<a-button type="primary" danger @click="handleRouterGoEditor()">
					<template #icon><EditOutlined /></template>
					编辑
				</a-button>
			</div>
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { Button } from "ant-design-vue";
import { EditOutlined } from "@ant-design/icons-vue";

import { GlobalDataProps } from "@/store/index";
import { TemplateProps } from "@/store/templates";

export default defineComponent({
	name: "Detail",
	setup() {
		const route = useRoute();
		const router = useRouter();
		const store = useStore<GlobalDataProps>();

		//#region 详情数据获取
		const currentTemplateId = Number(route.params.id);
		const templateDetail = computed<TemplateProps>(() =>
			store.getters.getTemplateById(currentTemplateId)
		);

		const handleRouterGoEditor = () => {
			router.push({
				path: `/editor/${currentTemplateId}`
			});
		};
		//#endregion

		return {
			templateDetail,
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
