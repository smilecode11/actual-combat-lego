<template>
	<Uploader action="http://123.57.138.48/api/upload" />
	<!-- <form
		method="post"
		enctype="multipart/form-data"
		action="http://123.57.138.48/api/upload"
	>
		<input type="file" name="file" @change="handleFileChange" />
		<input type="text" name="test" />
		<button type="submit">Submit</button>
	</form> -->
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Uploader from "@/packages/Uploader.vue";

export default defineComponent({
	name: "App",
	setup(props) {
		const handleFileChange = (e: Event) => {
			const target = e.target as HTMLInputElement;
			const files = target.files;
			if (files) {
				const uploadFile = files[0];
				const formData = new FormData();
				formData.append(uploadFile.name, uploadFile);
				axios
					.post("http://123.57.138.48/api/upload", formData, {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					})
					.then((resp) => {
						console.log(resp);
					});
			}
		};

		return {
			handleFileChange
		};
	},
	components: {
		Uploader
	}
});
</script>

<style scoped>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
