import { mount, VueWrapper } from "@vue/test-utils";
import IconSwitch from "@/packages/IconSwitch.vue";

let wrapper: VueWrapper<any>;

const globalComponents = {
	"a-tooltip": {
		template: `<div><slot></slot><slot name='title'></slot></div>`
	}
};

describe("IconSwitch 组件测试", () => {
	beforeAll(() => {
		wrapper = mount(IconSwitch, {
			props: {
				text: "__",
				promptText: "加粗",
				value: "normal"
			},
			global: {
				components: globalComponents
			}
		});
	});

	it("测试初始渲染", () => {
		expect(wrapper.find("div.control").exists()).toBeTruthy();
		expect(wrapper.get("div.control").text()).toBe("__");
	});

	it("测试行为", async () => {
		await wrapper.get("div.control").trigger("click");
		await wrapper.setProps({
			text: "__",
			promptText: "加粗",
			value: "actived"
		});
		expect(wrapper.emitted()).toHaveProperty("change");
		const events = wrapper.emitted("change");
		expect(events && events[0]).toEqual(["actived"]);
		const controlElement = wrapper.get("div.control").element as HTMLElement;
		expect(controlElement.classList.contains("actived")).toBeTruthy();
	});
});
