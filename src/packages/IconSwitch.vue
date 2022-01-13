<template>
	<div class="icon-switch">
		<a-tooltip placement="top">
			<template #title>
				<span>{{ promptText }}</span>
			</template>
			<div
				@click="onChange"
				class="control"
				:class="[value !== 'normal' ? 'actived' : '']"
			>
				{{ text }}
			</div>
		</a-tooltip>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	props: {
		value: {
			type: String,
			default: "normal"
		},
		text: {
			type: String,
			default: "默认"
		},
		promptText: {
			type: String,
			default: "默认提示"
		}
	},
	emits: ["change"],
	setup(props, context) {
		const onChange = () => {
			const value = props.value === "normal" ? "actived" : "normal";
			context.emit("change", value);
		};
		return { onChange };
	}
});
</script>

<style scoped>
.icon-switch {
	border-radius: 50%;
	width: 36px;
	height: 36px;
	overflow: hidden;
}
.icon-switch .control {
	width: 100%;
	height: 100%;
	font-weight: bold;
	background: #ffffff;
	display: flex;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
.icon-switch .control.actived {
	background: #659fff;
}
</style>
