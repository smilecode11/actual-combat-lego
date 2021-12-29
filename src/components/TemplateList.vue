<template>
	<a-row :gutter="24">
		<a-col v-for="(item, index) in listData" :key="index" :span="6">
			<a-card hoverable class="card-item-wrap" :loading="listDataLoading">
				<template #cover>
					<img
						alt="example"
						src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
					/>
				</template>
				<template class="ant-card-actions" #actions>
					<setting-outlined key="setting" />
					<edit-outlined key="edit" @click="handleRouterGoDetail(item.id)" />
					<ellipsis-outlined key="ellipsis" />
				</template>
				<a-card-meta :title="item.title" description="This is the description">
					<template #avatar>
						<a-avatar
							src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
						/>
					</template>
				</a-card-meta>
			</a-card>
		</a-col>
	</a-row>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import { Avatar as AAvatar } from "ant-design-vue";
import {
	SettingOutlined,
	EditOutlined,
	EllipsisOutlined
} from "@ant-design/icons-vue";
import { TemplateProps } from "@/store/templates";

export default defineComponent({
	props: {
		listData: {
			type: Array as PropType<TemplateProps[]>,
			default: () => []
		},
		listDataLoading: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		// 详情跳转事件注册
		const router = useRouter();
		const handleRouterGoDetail = (id: string | number) => {
			router.push(`/detail/${id}`);
		};
		return {
			handleRouterGoDetail
		};
	},
	components: {
		SettingOutlined,
		EditOutlined,
		EllipsisOutlined,
		AAvatar
	}
});
</script>

<style scoped>
.card-item-wrap {
	margin-bottom: 32px;
}
</style>
