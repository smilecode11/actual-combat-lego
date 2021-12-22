<template>
	<a-row class="home-container">
		<!-- 搜索模块 -->
		<div class="search-wrapper">
			<h2>搜索模板</h2>
			<div class="search-content">
				<a-input-search
					class="input-search-control"
					v-model:value="searchParams.keyword"
					placeholder="搜索模板"
					enter-button
					@search="handleSearchWithTemplate"
				/>
			</div>
		</div>

		<!-- 模板数据 -->
		<div class="template-wrapper">
			<h2>推荐模板</h2>
			<a-row :gutter="24">
				<a-col v-for="(item, index) in ListData.list" :key="index" :span="6">
					<a-card hoverable class="card-item-wrap" :loading="listDataLoading">
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
				<a-button @click="handleLoadMoreWithTemplate">查看更多...</a-button>
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
					<a-card
						hoverable
						class="card-item-wrap"
						:loading="listDataWithMineLoading"
					>
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
import { defineComponent, reactive, ref } from "vue";
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
		//#region 搜索相关
		const searchParams = reactive({
			keyword: "",
			pageSize: 8,
			currentPage: 1
		});
		const handleSearchWithTemplate = () => {
			searchParams.currentPage = 1;
			console.log("handleSearchWithTemplate", searchParams);
		};
		const handleLoadMoreWithTemplate = () => {
			searchParams.currentPage += 1;
			console.log("handleLoadMoreWithTemplate", searchParams);
		};
		//#endregion

		//#region 模板列表相关
		//  模板数据获取
		const listDataLoading = ref(true);
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
		setTimeout(() => {
			listDataLoading.value = false;
		}, 700);
		//  我的作品
		const listDataWithMineLoading = ref(true);
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
		setTimeout(() => {
			listDataWithMineLoading.value = false;
		}, 700);
		// 详情跳转事件注册
		const router = useRouter();
		const handleRouterGoDetail = (id: string | number) => {
			router.push(`/detail/${id}`);
		};
		//#endregion 模板列表相关

		return {
			searchParams,
			handleSearchWithTemplate,
			handleLoadMoreWithTemplate,
			ListData,
			listDataLoading,
			ListDataWithMine,
			listDataWithMineLoading,
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
	padding: 32px 120px;
	min-height: calc(100vh - 64px - 70px);
}

.search-wrapper {
	margin-bottom: 48px;
}

.search-wrapper .input-search-control {
	width: 360px;
}

.input-search-control /deep/ .ant-input-search-button {
	width: 68px;
}

.template-wrapper,
.my-works-wrapper {
	width: 100%;
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
