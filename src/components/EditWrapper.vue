<template>
	<div
		class="editor-wrapper"
		@click="onItemClick(id)"
		:class="{ actived: active }"
	>
		<slot></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	props: {
		id: {
			type: String,
			default: ""
		},
		active: {
			type: Boolean,
			default: false
		}
	},
	emits: ["set-active"],
	setup(props, context) {
		const onItemClick = (id: string) => {
			context.emit("set-active", id);
		};
		return {
			onItemClick
		};
	}
});
</script>

<style scoped>
.editor-wrapper {
	border: 1px solid transparent;
}
.editor-wrapper:hover {
	border: 1px solid #f2f2f2;
}
.editor-wrapper.actived {
	border: 1px solid rgb(0, 255, 242);
}
</style>
