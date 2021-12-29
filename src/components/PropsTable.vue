<template>
	<div class="props-table">
		<div class="prop-item" v-for="(item, index) in finallyProps" :key="index">
			<span class="label" v-if="item">{{ item.text }}</span>
			<component
				class="value"
				:is="item.component"
				:[item.valueProps]="item.value"
				v-bind="item.extraProps"
				v-on="item.events"
			>
				<template v-if="item.subComponent">
					<component
						:is="item.subComponent"
						v-for="(option, k) in item.options"
						:key="k"
						:value="option.value"
					>
						<RenderVNode :vNode="option.text"></RenderVNode>
					</component>
				</template>
			</component>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, VNode } from "vue";
import { reduce } from "lodash-es";
import { mapPropsToForms } from "@/packages/mapProps";
import { TextComponentProps } from "@/packages/defaultProps";

import RenderVNode from "@/components/RenderVNode";

interface FormProps {
	component: string;
	subComponent?: string; //	子组件
	value?: string;
	extraProps?: { [key: string]: any }; //  拓展属性
	text: string;
	options?: { value: any; text: string | VNode }[]; //	子组件扩展属性
	valueProps: string; //	取值使用的 key
	eventName: string;
	events: { [key: string]: (e: any) => void }; //	事件
}

export default defineComponent({
	props: {
		props: {
			type: Object as PropType<Partial<TextComponentProps>>,
			required: true
		}
	},
	setup(props, context) {
		const finallyProps = computed(() => {
			return reduce(
				props.props,
				(result, value: any, key) => {
					const newKey = key as keyof TextComponentProps;
					const item = mapPropsToForms[newKey];
					if (item) {
						const {
							valueProps = "value",
							eventName = "change",
							initTransform,
							afterTransform
						} = item;
						const newItem: FormProps = {
							...item,
							value: initTransform ? initTransform(value) : value,
							eventName,
							valueProps,
							events: {
								[eventName]: (e: any) => {
									context.emit("change", {
										key,
										value: afterTransform ? afterTransform(e) : e
									});
								}
							}
						};
						result[newKey] = newItem;
					}
					return result;
				},
				{} as { [key: string]: FormProps }
			);
		});

		return {
			finallyProps
		};
	},
	components: {
		RenderVNode
	}
});
</script>

<style scoped>
.prop-item {
	margin: 12px 0;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.prop-item .label {
	flex: 0 0 64px;
}
.prop-item .value {
	flex: 1;
}
</style>
