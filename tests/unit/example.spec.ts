import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";

import HelloWorld from "@/components/HelloWorld.vue";
import Hello from "@/components/Hello";

jest.mock("axios");
// 设置 mockAxios 集成 jest mock 方法
const mockAxios = axios as jest.Mocked<typeof axios>;
// mockAxios.get.mockImplementation

const msg = "new message";
let wrapper: VueWrapper<any>;
beforeAll(() => {
	wrapper = shallowMount(HelloWorld, {
		props: { message: msg }
	});
});

describe("HelloWorld.vue", () => {
	it("测试 props 传递值是否正确, Hello 组件是否被挂载", () => {
		// console.log(wrapper.props()); //   { message: new message }
		console.log(wrapper.findComponent(Hello).exists()); //  true
	});

	it("测试 count 相关事件, 以及 count 值的变化", async () => {
		//  trigger 是是一个异步的过程, 使用 await 来实现流程的通过
		await wrapper.get("button").trigger("click");
		expect(wrapper.get(".count-wrapper").text()).toBe("1");
	});

	it("测试 todos 数据变更相关", async () => {
		const todoContent = "new todo";
		wrapper = shallowMount(HelloWorld, {
			props: { message: "hello, todo list" }
		});
		await wrapper.get(".todo-input").setValue(todoContent);
		await wrapper.get(".todo-button").trigger("click");
		expect(wrapper.get(".todo-button").text()).toBe("新增 Todo");
		expect((wrapper.get(".todo-input").element as any).value).toBe(todoContent);
		await wrapper.get(".todo-input").setValue(todoContent + 2);
		await wrapper.get(".todo-button").trigger("click");
		expect(wrapper.findAll(".todo-item")).toHaveLength(2); //  todo-item 长度
		expect(wrapper.findAll(".todo-item").length).toBe(2);
		wrapper.emitted(); //  获取emit事件集合
		// console.log(wrapper.emitted());
		expect(wrapper.emitted()).toHaveProperty("changeMsg"); //  是否存在属性 changeMsg
		const events = wrapper.emitted("changeMsg") || [];
		expect(events.length).toBe(2);
		expect(events[0]).toEqual(["new todo"]);
	});

	it("测试异步函数调用", async () => {
		wrapper = shallowMount(HelloWorld, {
			props: { message: "hello, mock request" }
		});
		mockAxios.get.mockResolvedValueOnce({
			data: {
				username: "Chen xin"
			}
		});
		await wrapper.get(".load-user-button").trigger("click");
		expect(mockAxios.get).toBeCalled(); //  检测方法是否被调用
		expect(wrapper.find(".request-pending").exists()).toBeTruthy();
		expect(wrapper.get(".request-pending").text()).toBe("loading");
		expect(wrapper.find(".request-body").exists()).toBeFalsy();
		expect(wrapper.find(".request-error").exists()).toBeFalsy();
		// 将所有请求置为完成状态
		await flushPromises();
		//  界面更新完成
		expect(wrapper.find(".request-pending").exists()).toBeFalsy();
		expect(wrapper.find(".request-body").exists()).toBeTruthy();
		expect(wrapper.find(".request-error").exists()).toBeFalsy();
	});

	it.skip("测试异步请求调用失败", async () => {
		wrapper = shallowMount(HelloWorld, {
			props: { message: "hello, mock request" }
		});
		mockAxios.get.mockRejectedValueOnce("error");
		await wrapper.get(".load-user-button").trigger("click");
		expect(mockAxios.get).toBeCalled();
		expect(mockAxios.get).toBeCalledTimes(1);
		expect(wrapper.get(".request-pending").text()).toBe("loading");
		expect(wrapper.find(".request-body").exists()).toBeFalsy();
		expect(wrapper.find(".request-error").exists()).toBeTruthy();

		await flushPromises();
		//  界面更新完成
		expect(wrapper.find(".request-pending").exists()).toBeFalsy();
		expect(wrapper.find(".request-body").exists()).toBeTruthy();
		expect(wrapper.find(".request-error").exists()).toBeTruthy();
	});

	afterEach(() => {
		mockAxios.get.mockReset();
	});
});
