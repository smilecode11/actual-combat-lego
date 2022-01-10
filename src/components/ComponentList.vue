<template>
	<div
		class="component-item"
		v-for="(item, index) in list"
		:key="index"
		@click="templateItemClick(item)"
	>
		<LText v-bind="item"></LText>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { cloneDeep } from "lodash-es";
import LText from "@/packages/LText.vue";

export default defineComponent({
	name: "component-list",
	props: {
		list: {
			type: Array as PropType<{}[]>,
			default: () => []
		}
	},
	emits: ["onItemClick"],
	setup(props, context) {
		// 组件点击事件
		const templateItemClick = (item: any) => {
			context.emit("onItemClick", cloneDeep(item));
		};
		return {
			templateItemClick
		};
	},
	components: {
		LText
	}
});
</script>

<style scoped>
.l-text-component {
	position: relative !important;
}
</style>
