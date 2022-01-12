import { clone, last } from "lodash-es";
import { testElements, ElementData } from "@/store/editor";
import { TextComponentProps } from "@/packages/defaultProps";
import { testData } from "@/store/templates";
import store from "@/store";

const cloneComponents = clone(testElements);

describe("test vuex module", () => {
	it("测试需要的三个模块", () => {
		expect(store.state).toHaveProperty("user");
		expect(store.state).toHaveProperty("templates");
		expect(store.state).toHaveProperty("editor");
	});

	describe("test user module", () => {
		it("测试登录", () => {
			store.commit("login", { user: "尘 心" });
			expect(store.state.user.isLogin).toBeTruthy();
		});
		it("测试登出", () => {
			store.commit("logout");
			expect(store.state.user.isLogin).toBeFalsy();
		});
	});

	describe("test templates module", () => {
		it("测试默认渲染的模板", () => {
			expect(store.state.templates.list).toHaveLength(testData.length);
		});
		it("测试根据 id 获取模板", () => {
			const selectTemplate = store.getters.getTemplateById(1);
			expect(selectTemplate).toEqual({
				id: 1,
				title: "first",
				cover: "",
				praise: 99,
				collect: 0
			});
		});
	});

	describe("test editor module", () => {
		it("测试默认数据", () => {
			expect(store.state.editor.elements).toHaveLength(cloneComponents.length);
		});
		it("测试画布中当前选择的元素节点", () => {
			store.commit("setCurrentElement", cloneComponents[0].id);
			expect(store.state.editor.currentElement).toBe(cloneComponents[0].id);
			const currentElement = store.getters.getCurrentElement;
			expect(currentElement.id).toBe(cloneComponents[0].id);
		});
		it("测试画布中元素新增", () => {
			const payload: Partial<TextComponentProps> = {
				text: "test1"
			};
			store.commit("addElement", payload);
			expect(store.state.editor.elements).toHaveLength(
				cloneComponents.length + 1
			);
			const lastItem = last(store.state.editor.elements);
			expect(lastItem?.props.text).toBe("test1");
		});
		it("测试画布中元素属性更新", () => {
			const newProps = {
				key: "text",
				value: "update value"
			};
			store.commit("updateElement", newProps);
			const currentElement: ElementData = store.getters.getCurrentElement;
			expect(currentElement.props.text).toBe("update value");
		});
	});
});
