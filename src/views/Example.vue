<template>
	<div class="example-wrapper">
		<HelloWorld :message="message" @changeMsg="onChangeMsg" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
	name: "Example",
	setup() {
		const message = ref("hello world");
		const onChangeMsg = (value: string) => {
			message.value = value;
		};
		return {
			message,
			onChangeMsg
		};
	},
	components: {
		HelloWorld
	}
});
</script>
