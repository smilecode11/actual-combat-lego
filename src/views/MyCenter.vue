<template>
	<a-row class="my-center-container"> My Center Container </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "MyCenter",
	setup() {
		return {};
	},
	components: {}
});
</script>

<style scoped>
.my-center-container {
	padding: 8px 50px;
	min-height: calc(100vh - 64px - 70px);
}
</style>
