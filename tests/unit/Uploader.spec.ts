import { shallowMount, mount, VueWrapper } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import Uploader from "@/packages/Uploader.vue";
let wrapper: VueWrapper<any>;

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

const testFile = new File(["xyz"], "test.png", {
	type: "image/png"
});

const mockComponent = {
	template: "<div><slot></slot></div>"
};
const mockComponents = {
	DeleteOutlined: mockComponent,
	LoadingOutlined: mockComponent,
	FileOutlined: mockComponent
};

const setInputValue = (elem: HTMLInputElement) => {
	const files = [testFile] as any;
	Object.defineProperty(elem, "files", {
		value: files,
		writable: false
	});
};

describe("Uploader Component Test", () => {
	beforeAll(() => {
		wrapper = shallowMount(Uploader as any, {
			props: {
				action: "test.url"
			},
			global: {
				// 局部引入组件 mock
				stubs: mockComponents
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
			status: "success"
		});
		const fileInput = wrapper.get("input.input-control")
			.element as HTMLInputElement;

		//  创建 file 对象
		setInputValue(fileInput);
		// fileInput.files = files;
		//  触发 change 需要事件对象
		await wrapper.get("input").trigger("change");
		expect(mockAxios.post).toBeCalledTimes(1);
		console.log(wrapper.get("button.upload-button span").text());
		expect(wrapper.get("button.upload-button span").text()).toBe("正在上传");
		//	测试 button 是 disabled
		expect(wrapper.get("button.upload-button").attributes()).toHaveProperty(
			"disabled"
		);
		//	列表长度修改, 有正确的 class  <li class="upload-item upload-loading"><span>{{filename}}</span></li>
		expect(wrapper.findAll("li.upload-item").length).toBe(1);
		const firstItem = wrapper.get("li.upload-item:first-child");
		expect(firstItem.classes()).toContain("upload-loading");
		await flushPromises();
		expect(wrapper.get("button.upload-button span").text()).toBe("点击上传");
		//	测试正确的 class, 文件名称对应 <li class="upload-item upload-success"><span>{{filename}}</span></li>
		expect(firstItem.classes()).toContain("upload-success");
		expect(firstItem.get(".filename").text()).toBe(testFile.name);
	});

	it("测试上传失败流程", async () => {
		mockAxios.post.mockRejectedValueOnce({ status: "error" });
		await wrapper.get("input").trigger("change");
		expect(mockAxios.post).toBeCalledTimes(2);
		expect(wrapper.get("button.upload-button span").text()).toBe("正在上传");
		await flushPromises();
		expect(wrapper.get("button.upload-button span").text()).toBe("点击上传");
		//	列表增加, 列表最后一项具备正确 class
		expect(wrapper.findAll("li.upload-item").length).toBe(2);
		const lastItem = wrapper.get("li.upload-item:last-child");
		expect(lastItem.classes()).toContain("upload-error");
		// 	触发删除操作, 检查长度
		await lastItem.get(".delete-icon").trigger("click");
		expect(wrapper.findAll("li.upload-item").length).toBe(1);
	});

	it.only("测试上传组件自定义模板", async () => {
		mockAxios.post.mockResolvedValueOnce({ data: { url: "dummy.url" } });
		const wrapper = mount(Uploader, {
			props: {
				action: "test.url"
			},
			slots: {
				default: "<button>Custom button</button>",
				loading: "<button class='loading'>Custom loading</button>",
				uploaded: `<template #uploaded='{ uploadedData }'>
					<div class='custom-loaded'>{{ uploadedData.url }}</div>
				</template>`
			},
			global: {
				stubs: mockComponents
			}
		});
		expect(wrapper.get("button").text()).toBe("Custom button");
		const fileInput = wrapper.get("input").element as HTMLInputElement;
		setInputValue(fileInput);
		await wrapper.get("input").trigger("change");
		expect(wrapper.get(".loading").text()).toBe("Custom loading");
		await flushPromises();
		expect(wrapper.get(".custom-loaded").text()).toBe("dummy.url");
	});

	afterEach(() => {});
});
