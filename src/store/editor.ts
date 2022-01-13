import { Module } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { GlobalDataProps } from "./index";
import { TextComponentProps } from "@/packages/defaultProps";
export interface EditorProps {
	elements: ElementData[];
	currentElement: string | null; //  当前选择元素
}

export interface ElementData {
	//  元素属性
	props: { [P in keyof TextComponentProps]?: any };
	// uuid v4
	id: string;
	//  l-text | l-image | ...
	name: string;
}

export const testElements: ElementData[] = [
	{
		id: uuidv4(),
		props: {
			text: "hello",
			color: "#000000",
			fontSize: "22px",
			textAlign: "left",
			fontFamily: "宋体",
			opacity: "1"
		},
		name: "l-text"
	},
	{
		id: uuidv4(),
		props: {
			text: "hello world",
			fontSize: "18px",
			lineHeight: "1.7",
			textAlign: "center",
			fontFamily: "黑体",
			opacity: "0.4"
		},
		name: "l-text"
	},
	{
		id: uuidv4(),
		props: {
			text: "hello3",
			fontSize: "12px",
			textDecoration: "underline",
			actionType: "url",
			url: "https://www.baidu.com"
		},
		name: "l-text"
	}
];

const editor: Module<EditorProps, GlobalDataProps> = {
	state: {
		elements: testElements,
		currentElement: null
	},
	mutations: {
		/** 添加 element */
		addElement(state, props: Partial<TextComponentProps>) {
			const newElement: ElementData = {
				id: uuidv4(),
				name: "l-text",
				props
			};
			state.elements.push(newElement);
		},
		/** 设置当前操作的画布元素*/
		setCurrentElement(state, currentElementId) {
			state.currentElement = currentElementId;
		},
		/** 更新 element */
		updateElement(state, { key, value }) {
			const updateElement = state.elements.find(
				(element) => element.id === state.currentElement
			);
			if (updateElement) {
				updateElement.props[key as keyof TextComponentProps] = value;
			}
		},
		/** 移除 element */
		removeElement(state, delElement: ElementData) {
			const delElementIndex = state.elements.findIndex(
				(element) => element.id === delElement.id
			);
			if (delElementIndex !== -1) {
				state.elements.splice(delElementIndex, 1);
				state.currentElement = null;
			}
		}
	},
	getters: {
		/** 当前被选中的画布元素*/
		getCurrentElement: (state) =>
			state.elements.find((element) => element.id === state.currentElement)
	}
};

export default editor;
