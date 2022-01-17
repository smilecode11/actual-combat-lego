import { shallowMount, VueWrapper } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import Uploader from "@/packages/Uploader.vue";
let wrapper: VueWrapper<any>;

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

const testFile = new File(["xyz"], "test.png", {
	type: "image/png"
});

describe("Uploader Component Test", () => {
	beforeAll(() => {
		wrapper = shallowMount(Uploader, {
			props: {
				action: "test.url"
			}
		});
	});

	it("初始化渲染用例", () => {
		expect(wrapper.find("button").exists()).toBeTruthy();
		expect(wrapper.get("button span").text()).toBe("点击上传");
		expect(wrapper.get("input").isVisible()).toBeFalsy();
	});

	it("正常上传流程", async () => {
		mockAxios.post.mockResolvedValueOnce({
			code: "0",
			status: "success",
			data: {}
		});
		const fileInput = wrapper.get("input.input-control")
			.element as HTMLInputElement;

		//  创建 file
		const files = [testFile] as any;
		Object.defineProperty(fileInput, "files", {
			value: files,
			writable: false
		});
		// fileInput.files = files;
		//  触发 change 需要事件对象
		await wrapper.get("input").trigger("change");
		expect(mockAxios.post).toBeCalledTimes(1);
		console.log(wrapper.get("button.upload-button span").text());
		expect(wrapper.get("button.upload-button span").text()).toBe("正在上传");
		await flushPromises();
		expect(wrapper.get("button.upload-button span").text()).toBe("上传成功");
	});

	it("测试上传失败流程", async () => {
		mockAxios.post.mockRejectedValueOnce({ status: "error" });
		await wrapper.get("input").trigger("change");
		expect(mockAxios.post).toBeCalledTimes(2);
		expect(wrapper.get("button.upload-button span").text()).toBe("正在上传");
		await flushPromises();
		expect(wrapper.get("button.upload-button span").text()).toBe("上传失败");
	});
});
