<template>
	<div class="upload-component">
		<button class="upload-button" @click="triggerUpload">
			<span v-if="uploadStatus === 'read'">点击上传</span>
			<span v-else-if="uploadStatus === 'uploading'">正在上传</span>
			<span v-else-if="uploadStatus === 'success'"> 上传成功</span>
			<span v-else-if="uploadStatus === 'error'"> 上传失败</span>
			<span v-else>点击上传</span>
		</button>
		<input
			class="input-control"
			ref="inputRef"
			type="file"
			@change="handleUpload"
			:style="{ display: 'none' }"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

type UploadStatus = "read" | "uploading" | "success" | "error";

export default defineComponent({
	props: {
		action: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const inputRef = ref<HTMLInputElement | null>(null);
		const uploadStatus = ref<UploadStatus>("read");

		/** trigger input 事件*/
		const triggerUpload = () => {
			if (inputRef.value) {
				inputRef.value.click();
			}
		};

		const handleUpload = (e: Event) => {
			const files = (e.target as HTMLInputElement).files;
			if (files) {
				uploadStatus.value = "uploading";

				const uploadFile = files[0];
				const formData = new FormData();
				formData.append(uploadFile.name, uploadFile);

				axios
					.post(props.action, formData, {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					})
					.then((resp) => {
						console.log("success", resp);
						uploadStatus.value = "success";
					})
					.catch((err) => {
						// console.log("err", err);
						uploadStatus.value = "error";
					});
			}
		};

		return {
			inputRef,
			uploadStatus,
			triggerUpload,
			handleUpload
		};
	}
});
</script>
