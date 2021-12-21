<template>
	<a-row class="home-container">
		<!-- 模板数据 -->
		<div class="template-wrapper">
			<h2>推荐模板</h2>
			<a-row :gutter="24">
				<a-col v-for="(item, index) in ListData.list" :key="index" :span="6">
					<a-card hoverable class="card-item-wrap">
						<template #cover>
							<img
								alt="example"
								src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
							/>
						</template>
						<template class="ant-card-actions" #actions>
							<setting-outlined key="setting" />
							<edit-outlined
								key="edit"
								@click="handleRouterGoDetail(item.id)"
							/>
							<ellipsis-outlined key="ellipsis" />
						</template>
						<a-card-meta title="Title" description="This is the description">
							<template #avatar>
								<a-avatar
									src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
								/>
							</template>
						</a-card-meta>
					</a-card>
				</a-col>
			</a-row>
			<div class="opera-wrap">
				<a-button>查看更多...</a-button>
			</div>
		</div>

		<!-- 我的作品 -->
		<div class="my-works-wrapper">
			<h2>我的作品</h2>
			<a-row :gutter="24">
				<a-col
					v-for="(item, index) in ListDataWithMine.list"
					:key="index"
					:span="6"
				>
					<a-card hoverable class="card-item-wrap">
						<template #cover>
							<img
								alt="example"
								src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
							/>
						</template>
						<template class="ant-card-actions" #actions>
							<setting-outlined key="setting" />
							<edit-outlined
								key="edit"
								@click="handleRouterGoDetail(item.id)"
							/>
							<ellipsis-outlined key="ellipsis" />
						</template>
						<a-card-meta title="Title" description="This is the description">
							<template #avatar>
								<a-avatar
									src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
								/>
							</template>
						</a-card-meta>
					</a-card>
				</a-col>
			</a-row>
		</div>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { Avatar as AAvatar, Button as AButton } from "ant-design-vue";
import {
	SettingOutlined,
	EditOutlined,
	EllipsisOutlined
} from "@ant-design/icons-vue";

import { nanoid } from "nanoid";
export default defineComponent({
	name: "Home",
	setup() {
		//#region 模板列表相关
		//  模板源数据获取
		const ListData = reactive({
			list: [
				{
					id: nanoid()
				},
				{
					id: nanoid()
				},
				{
					id: nanoid()
				},
				{
					id: nanoid()
				},
				{
					id: nanoid()
				},
				{
					id: nanoid()
				},
				{
					id: nanoid()
				},
				{
					id: nanoid()
				}
			],
			totla: 12
		});
		//  我的作品
		const ListDataWithMine = reactive({
			list: [
				{
					id: nanoid()
				},
				{
					id: nanoid()
				},
				{
					id: nanoid()
				},
				{
					id: nanoid()
				}
			],
			totla: 12
		});
		// 详情跳转事件注册
		const router = useRouter();
		const handleRouterGoDetail = (id: string | number) => {
			router.push(`/detail/${id}`);
		};
		//#endregion 模板列表相关

		return {
			ListData,
			ListDataWithMine,
			handleRouterGoDetail
		};
	},
	components: {
		AAvatar,
		AButton,
		SettingOutlined,
		EditOutlined,
		EllipsisOutlined
	}
});
</script>

<style scoped>
.home-container {
	padding: 32px 50px;
	min-height: calc(100vh - 64px - 70px);
}

.card-item-wrap {
	margin-bottom: 32px;
}

.opera-wrap {
	margin-bottom: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
