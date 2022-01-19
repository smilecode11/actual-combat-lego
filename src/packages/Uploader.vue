<template>
	<div class="upload-component">
		<button
			class="upload-button"
			@click="triggerUpload"
			:disabled="isUploading"
		>
			<span v-if="isUploading">正在上传</span>
			<span v-else>点击上传</span>
		</button>
		<input
			class="input-control"
			ref="inputRef"
			type="file"
			@change="handleUpload"
			:style="{ display: 'none' }"
		/>
		<ul class="upload-list">
			<li
				:class="`upload-item upload-${file.status}`"
				v-for="(file, key) in uploadFiles"
				:key="key"
			>
				<span v-if="file.status === 'loading'" class="file-icon">
					<LoadingOutlined />
				</span>
				<span v-else class="file-icon"><FileOutlined /></span>
				<div class="filename">{{ file.name }}</div>
				<div class="delete-icon" @click="handleDelete(file.uid)">
					<DeleteOutlined />
				</div>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import {
	LoadingOutlined,
	DeleteOutlined,
	FileOutlined
} from "@ant-design/icons-vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

type UploadStatus = "read" | "loading" | "success" | "error";
export interface UploadFile {
	uid: string;
	name: string;
	size: number;
	raw: File;
	status: UploadStatus;
}

export default defineComponent({
	props: {
		action: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const inputRef = ref<HTMLInputElement | null>(null);
		const uploadFiles = ref<UploadFile[]>([]);
		const isUploading = computed(() => {
			return uploadFiles.value.some((file) => file.status === "loading");
		});

		/** trigger input 事件*/
		const triggerUpload = () => {
			if (inputRef.value) {
				inputRef.value.click();
			}
		};

		/** 上传*/
		const handleUpload = (e: Event) => {
			const files = (e.target as HTMLInputElement).files;
			if (files) {
				const uploadFile = files[0];
				const formData = new FormData();
				formData.append(uploadFile.name, uploadFile);

				const uploadObj = reactive<UploadFile>({
					uid: uuidv4(),
					name: uploadFile.name,
					size: uploadFile.size,
					raw: uploadFile,
					status: "loading"
				});
				uploadFiles.value.push(uploadObj);

				axios
					.post(props.action, formData, {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					})
					.then((resp) => {
						uploadObj.status = "success";
					})
					.catch((err) => {
						uploadObj.status = "error";
					})
					.finally(() => {
						// 清除 input 元素值, 确保 change 事件正常触发
						if (inputRef.value) inputRef.value.value = "";
					});
			}
		};

		const handleDelete = (fileId: string) => {
			uploadFiles.value = uploadFiles.value.filter(
				(file) => file.uid !== fileId
			);
		};

		return {
			inputRef,
			triggerUpload,
			handleUpload,
			isUploading,
			uploadFiles,
			handleDelete
		};
	},
	components: {
		LoadingOutlined,
		DeleteOutlined,
		FileOutlined
	}
});
</script>

<style scoped>
.upload-success {
	color: green;
}

.upload-loading {
	color: yellowgreen;
}

.upload-error {
	color: red;
}

.upload-item {
	display: flex;
	align-items: center;
}

.delete-icon {
	cursor: pointer;
}
</style>
