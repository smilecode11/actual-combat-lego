import { VueWrapper, mount } from "@vue/test-utils";
import UserProfile from "@/layout/components/UserProfile.vue";

let wrapper: VueWrapper<any>;

jest.mock("ant-design-vue");
jest.mock("vue-router");
jest.mock("vuex");

const mockComponent = {
	template: "<div><slot></slot></div>"
};
const mockComponent2 = {
	template: "<div><slot></slot><slot name='overlay'></slot></div>"
};
// 模拟组件
const globalComponents = {
	"a-menu-item": mockComponent,
	"a-menu": mockComponent,
	"a-dropdown-button": mockComponent2,
	"a-button": mockComponent
};

describe("UserProfile component", () => {
	beforeAll(() => {
		wrapper = mount(UserProfile, {
			props: {
				user: { isLogin: false, userName: "" }
			},
			// 全局属性
			global: {
				components: globalComponents
			}
		});
	});

	it("测试未登录状态当前组件渲染", () => {
		expect(wrapper.get("div").attributes().type).toBe("primary");
		expect(wrapper.get("div").text()).toBe("登录");
	});

	it("测试登录状态当前组件渲染", async () => {
		// 修改 wrapper.props
		await wrapper.setProps({
			user: { isLogin: true, userName: "尘 心" }
		});
		expect(wrapper.get(".user-profile-component").html()).toContain("尘 心");
		expect(wrapper.find(".user-profile-dropdown").exists()).toBeTruthy();
	});

	afterAll(() => {});
});
