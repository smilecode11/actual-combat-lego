import { Module } from "vuex";
import { GlobalDataProps } from "./index";

export interface TemplateProps {
	id: string | number;
	title: string;
	cover: string;
	praise: number;
	collect: number;
	description?: string;
}

export interface TemplatesProps {
	list: TemplateProps[];
	total: number;
}

const testData = [
	{ id: 1, title: "first", cover: "", praise: 0, collect: 0 },
	{ id: 2, title: "second", cover: "", praise: 0, collect: 0 },
	{ id: 3, title: "third", cover: "", praise: 0, collect: 0 },
	{ id: 4, title: "444", cover: "", praise: 0, collect: 0 },
	{ id: 5, title: "555", cover: "", praise: 0, collect: 0 },
	{ id: 6, title: "666", cover: "", praise: 0, collect: 0 },
	{ id: 7, title: "777", cover: "", praise: 0, collect: 0 },
	{ id: 8, title: "888", cover: "", praise: 0, collect: 0 }
];

const templates: Module<TemplatesProps, GlobalDataProps> = {
	state: {
		list: testData,
		total: 12
	},
	getters: {
		// 根据 id 获取单个模板数据
		getTemplateById: (state, getters, rootState) => (id: number) => {
			console.log(getters, rootState);
			return state.list.find((template) => template.id === id);
		}
	}
};

export default templates;
