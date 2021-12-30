<template>
	<a-row class="editor-header">
		<a-button type="text" @click="handleGoBack">
			<template #icon><LeftOutlined /></template>
			返回
		</a-button>
	</a-row>
	<a-row class="editor-content">
		<!-- 左侧预设组件模块 -->
		<a-col :span="6" class="component-container">
			<h2>component-list</h2>
			<component-list
				:list="textTemplatesList"
				@onItemClick="addComponent"
			></component-list>
		</a-col>

		<!-- 画布模块 -->
		<a-col :span="12" class="canvas-container">
			画布区域 {{ editorId }}
			<div class="control-wrapper">
				<edit-wrapper
					v-for="elem in elements"
					:key="elem.id"
					:id="elem.id"
					:active="elem.id === currentElement"
					@setActive="setCurrentElement"
				>
					<component :is="elem.name" v-bind="elem.props"></component>
				</edit-wrapper>
			</div>
		</a-col>

		<!-- 右侧元素属性设置模块 -->
		<a-col :span="6" class="attr-container">
			<!-- 元素属性渲染表单 -->
			<PropsTable
				v-if="activeElement && activeElement.props"
				:props="activeElement.props"
				@change="handleElementChange"
			></PropsTable>
			<!-- 元素操作 -->
			<a-button v-if="currentElement" @click="handleDelElement">移除</a-button>
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { Button as AButton } from "ant-design-vue";
import { LeftOutlined } from "@ant-design/icons-vue";

import { GlobalDataProps } from "@/store/index";
import { ElementData } from "@/store/editor";

import LText from "@/packages/LText.vue";

import ComponentList from "@/components/ComponentList.vue";
import EditWrapper from "@/components/EditWrapper.vue";
// import PropsTable from "@/components/PropsTable.vue";
import PropsTable from "@/components/PropsTable";
import { defaultTextTemplates } from "@/packages/defaultTemplates";

export default defineComponent({
	name: "Editor",
	setup() {
		const store = useStore<GlobalDataProps>();
		const elements = computed(() => store.state.editor.elements);

		//#region 获取路由信息, 请求展示数据
		const router = useRoute();
		const editorId = router.params.id;
		//#endregion 获取路由信息, 请求展示数据

		//#region 左侧组件渲染及相关事件
		const textTemplatesList = defaultTextTemplates;
		const addComponent = (props: any) => {
			store.commit("addElement", props);
		};
		//#endregion 左侧组件及相关事件

		//#region 中间画布相关
		//	当前选择的画布元素 id
		const currentElement = computed(() => store.state.editor.currentElement);
		//	设置当前选中画布元素, 渲染元素属性
		const setCurrentElement = (id: string) => {
			store.commit("setCurrentElement", id);
		};
		//#endregion 画布相关

		//#region 右侧属性设置相关
		const activeElement = computed<ElementData>(
			() => store.getters.getCurrentElement
		);
		const handleDelElement = () => {
			store.commit("removeElement", activeElement.value);
		};
		const handleElementChange = (e: any) => {
			store.commit("updateElement", e);
		};
		//#endregion 右侧属性设置相关

		//#region 其他模块相关
		const route = useRouter();
		const handleGoBack = () => {
			route.back();
		};
		//#endregion 其他模块相关

		return {
			editorId,
			handleGoBack,
			elements,
			textTemplatesList,
			addComponent,
			setCurrentElement,
			currentElement,
			activeElement,
			handleDelElement,
			handleElementChange
		};
	},
	components: {
		AButton,
		LeftOutlined,
		LText,
		ComponentList,
		EditWrapper,
		PropsTable
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
	background: floralwhite;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
}

.canvas-container {
	background: cornsilk;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
}

.canvas-container .control-wrapper {
	width: 80%;
	min-height: 360px;
	background: chocolate;
}

.attr-container {
	padding: 8px 12px;
	background: burlywood;
}

.l-text-component {
	position: relative !important;
}
</style>
