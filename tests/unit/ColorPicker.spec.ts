import { mount, VueWrapper } from "@vue/test-utils";
import rgbHex from "rgb-hex";
import ColorPicker from "@/packages/ColorPicker.vue";

const defaultColors = [
	"#ffffff",
	"#f5222d",
	"#fa541c",
	"#fadb14",
	"#52c41a",
	"#1890ff",
	"#722ed1",
	"#8c8c8c",
	"#000000",
	""
];
let wrapper: VueWrapper<any>;

describe("测试 color-picker 组件", () => {
	beforeAll(() => {
		wrapper = mount(ColorPicker, {
			props: {
				value: "#ffffff"
			}
		});
	});

	it("初始渲染", () => {
		//  测试 input 渲染
		expect(wrapper.find("input").exists()).toBeTruthy();
		const inputEle = wrapper.find("input").element;
		expect(inputEle.type).toBe("color");
		expect(inputEle.value).toBe(defaultColors[0]);
		//  测试颜色列表渲染
		expect(wrapper.find("ul.color-wrapper").exists()).toBeTruthy();
		expect(wrapper.find("ul.color-wrapper li").exists()).toBeTruthy();
		expect(wrapper.findAll("ul.color-wrapper li").length).toBe(
			defaultColors.length
		);
		//  测试第一个色值是否正确, 最后一个li是否包含特殊类名 transparent-back
		const firstItem = wrapper.get("li:first-child div").element as HTMLElement;
		expect(`#${rgbHex(firstItem.style.backgroundColor)}`).toBe(
			defaultColors[0]
		);
		const lastItem = wrapper.get("li:last-child div").element as HTMLElement;
		expect(lastItem.classList.contains("transperent-back")).toBeTruthy();
	});

	it("测试 input 值变更行为", async () => {
		//  修改 input 是否发送对应事件和值
		const blackHex = "#000000";
		await wrapper.get("input").setValue(blackHex);
		expect(wrapper.emitted()).toHaveProperty("change");
		const events = wrapper.emitted("change");
		expect(events && events[0]).toEqual([blackHex]);
	});

	it("测试色值 list 事件行为", () => {
		const firstItem = wrapper.get("li:first-child div");
		firstItem.trigger("click");
		const events = wrapper.emitted("change");
		expect(events && events[1]).toEqual([defaultColors[0]]);
	});
});
