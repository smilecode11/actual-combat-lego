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
			<TemplateList
				:list-data="ListData.list"
				:list-data-loading="listDataLoading"
			/>
			<div class="opera-wrap">
				<a-button @click="handleLoadMoreWithTemplate">查看更多...</a-button>
			</div>
		</div>

		<!-- 我的作品 -->
		<div class="my-works-wrapper" v-if="userStore.isLogin">
			<div class="title-wrapper">
				<h2>我的作品</h2>
				<router-link to="/mywork">查看我全部作品 <RightOutlined /></router-link>
			</div>
			<TemplateList
				:list-data="ListDataWithMine.list"
				:list-data-loading="listDataWithMineLoading"
			/>
		</div>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { Button as AButton } from "ant-design-vue";
import { RightOutlined } from "@ant-design/icons-vue";
import TemplateList from "@/components/TemplateList.vue";

import { nanoid } from "nanoid";

import { GlobalDataProps } from "@/store/index";
import { TemplatesProps } from "@/store/templates";
export default defineComponent({
	name: "Home",
	setup() {
		const store = useStore<GlobalDataProps>();

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
		const ListData = computed(() => store.state.templates);
		setTimeout(() => {
			listDataLoading.value = false;
		}, 700);

		//  我的作品
		const userStore = computed(() => store.state.user);
		const listDataWithMineLoading = ref(true);

		const ListDataWithMine: TemplatesProps = {
			list: [
				{
					id: 10000,
					title: nanoid(),
					description: "",
					cover: "",
					praise: 0,
					collect: 0
				},
				{
					id: 9999,
					title: nanoid(),
					description: "",
					cover: "",
					praise: 0,
					collect: 0
				},
				{
					id: 9998,
					title: nanoid(),
					description: "",
					cover: "",
					praise: 0,
					collect: 0
				},
				{
					id: 9997,
					title: nanoid(),
					description: "",
					cover: "",
					praise: 0,
					collect: 0
				}
			],
			total: 12
		};
		setTimeout(() => {
			listDataWithMineLoading.value = false;
		}, 700);
		//#endregion 模板列表相关

		return {
			searchParams,
			handleSearchWithTemplate,
			handleLoadMoreWithTemplate,
			ListData,
			listDataLoading,
			ListDataWithMine,
			listDataWithMineLoading,
			userStore
		};
	},
	components: {
		AButton,
		TemplateList,
		RightOutlined
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

.title-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.opera-wrap {
	margin-bottom: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
