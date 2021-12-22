<template>
	<a-row class="mywork-container"> MyWork Container </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "MyWork",
	setup() {
		return {};
	},
	components: {}
});
</script>

<style scoped>
.mywork-container {
	padding: 8px 50px;
	min-height: calc(100vh - 64px - 70px);
}
</style>
