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
const testFile2 = new File(["abc"], "test2.png", {
	type: "image/png"
});
const testFile3 = new File(["efg"], "test3.png", {
	type: "image/png"
});

const mockComponent = {
	template: "<div><slot></slot></div>"
};
const mockComponents = {
	LoadingOutlined: mockComponent,
	DeleteOutlined: mockComponent,
	FileOutlined: mockComponent
};

describe("Uploader Component Test", () => {
	beforeAll(() => {
		wrapper = shallowMount(Uploader as any, {
			props: {
				action: "test.url"
			},
			global: {
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

	it("测试上传文件列表", async () => {});

	afterEach(() => {});
});
