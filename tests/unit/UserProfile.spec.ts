import { VueWrapper, mount } from "@vue/test-utils";
import { message } from "ant-design-vue";
import UserProfile from "@/layout/components/UserProfile.vue";
import store from "@/store/index";

let wrapper: VueWrapper<any>;
//  模拟 antdV message 对象
jest.mock("ant-design-vue", () => ({
	message: {
		success: jest.fn(),
		error: jest.fn()
	}
}));

const mockedRoutes: string[] = [];
// 模拟 vue-router: useRouter() -> push()
jest.mock("vue-router", () => ({
	useRouter: () => ({
		push: (url: string) => mockedRoutes.push(url)
	})
}));

// jest.mock("vuex");

jest.useFakeTimers();

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
			global: {
				//  使用全局组件
				components: globalComponents,
				//  可挂载真实的数据
				provide: {
					store
				}
			}
		});
	});

	it("测试未登录状态当前组件渲染", async () => {
		expect(wrapper.get("div").attributes().type).toBe("primary");
		expect(wrapper.get("div").text()).toBe("登录");
		expect(wrapper.find(".user-profile-dropdown").exists()).toBeFalsy();
	});

	it("测试登录状态当前组件渲染", async () => {
		// 修改 wrapper.props
		await wrapper.setProps({
			user: { isLogin: true, userName: "尘 心" }
		});
		expect(wrapper.get(".user-profile-component").html()).toContain("尘 心");
		expect(wrapper.find(".user-profile-dropdown").exists()).toBeTruthy();
		expect(wrapper.find(".logout-btn").exists()).toBeTruthy();
		expect(wrapper.find(".login-btn").exists()).toBeFalsy();
	});

	//  测试行为, 登出按钮点击
	it("测试登录状态登出按钮相关行为", async () => {
		await expect(wrapper.get(".logout-btn").trigger("click"));
		expect(store.state.user.isLogin).toBeFalsy();
		expect(message.success).toBeCalled();
		expect(message.success).toBeCalledTimes(1); //  测试 message.success 调用次数
		jest.runAllTimers(); //  运行所有 timer
		expect(mockedRoutes).toEqual(["/"]);
	});

	afterEach(() => {
		//  每个 case 调用完成执行 message.success 方法重置
		(message as jest.Mocked<typeof message>).success.mockReset();
	});
});
