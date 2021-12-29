<template>
	<component
		:is="tag"
		class="l-text-component"
		:style="styleProps"
		@click="handleClick"
	>
		{{ text }}
	</component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
	transformToComponentProps,
	textDefaultProps,
	textStylePropsNames
} from "@/packages/defaultProps";
import useComponentCommon from "@/packages/hooks/useComponentCommon";

//	text props 数组集合
const textProps = transformToComponentProps(textDefaultProps);

export default defineComponent({
	props: {
		tag: {
			type: String,
			default: "div"
		},
		...textProps
	},
	setup(props: any) {
		//	获取样式数据和点击事件
		const { styleProps, handleClick } = useComponentCommon(
			props,
			textStylePropsNames
		);

		return {
			styleProps,
			handleClick
		};
	}
});
</script>
