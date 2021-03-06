import { h, VNode } from "vue";
import { TextComponentProps } from "@/packages/defaultProps";

export interface PropsToForm {
	isLineBlock?: boolean;
	component: string;
	text: string;
	extraProps?: { [key: string]: any }; //  拓展属性
	subComponent?: string; //	子组件
	options?: { value: any; text: string | VNode }[]; //	子组件扩展属性
	initTransform?: (v: string) => any; //	取值的修改值
	afterTransform?: (v: any) => any; //	提交时修改值
	valueProps?: string; //	取值使用的 key
	eventName?: string; //	事件名
}

export type PropsToForms = {
	[P in keyof TextComponentProps]?: PropsToForm;
};

const familyArray = [
	{
		text: "微软雅黑",
		value: "Microsoft Yahei"
	},
	{
		text: "楷体",
		value: "楷体"
	},
	{
		text: "黑体",
		value: "Heiti SC"
	},
	{
		text: "宋体",
		value: "宋体"
	},
	{
		text: "Arial",
		value: "Arial"
	}
];

const familyOptions = familyArray.map((familyItem) => {
	return {
		value: familyItem.value,
		// text: h("span", { style: { fontFamily: familyItem.value } }, familyItem.text)
		text: <span style={{ fontFamily: familyItem.value }}>{familyItem.text}</span> as VNode
	};
});

/** 属性渲染模板 */
export const mapPropsToForms: PropsToForms = {
	text: {
		text: "文本",
		component: "a-textarea",
		extraProps: {
			rows: 3
		},
		afterTransform: (v: any) => v.target.value
	},
	fontSize: {
		text: "字号",
		component: "a-input-number",
		initTransform: (v: string) => parseInt(v),
		afterTransform: (v: string) => `${v}px`
	},
	lineHeight: {
		text: "行高",
		component: "a-slider",
		extraProps: {
			min: 1,
			max: 3,
			step: 0.1
		},
		initTransform: (v: string) => parseFloat(v),
		afterTransform: (v: number) => String(v)
	},
	textAlign: {
		text: "对齐",
		component: "a-radio-group",
		subComponent: "a-radio-button",
		options: [
			{
				text: "左",
				value: "left"
			},
			{
				text: "中",
				value: "center"
			},
			{
				text: "右",
				value: "right"
			}
		],
		afterTransform: (v: any) => v.target.value
	},
	fontFamily: {
		text: "字体",
		component: "a-select",
		subComponent: "a-select-option",
		options: [
			{ text: "无", value: "" },
			...familyOptions
		]
	},
	opacity: {
		text: "透明度",
		component: "a-slider",
		extraProps: {
			min: 0,
			max: 100,
			step: 1,
			'tip-formatter': (v: any) => `${(100 - v)}%`,
			reverse: true,
		},
		initTransform: (v: string) => (parseFloat(v)) * 100,
		afterTransform: (v: number) => String((v) / 100)
	},
	color: {
		text: "字体颜色",
		component: 'color-picker'
	},
	fontWeight: {
		isLineBlock: true,
		text: "B", // bold normal
		component: 'icon-switch',
		extraProps: {
			promptText: "加粗",
		},
		initTransform: (v: string) => v !== 'normal' ? 'actived' : 'normal',
		afterTransform: (v: string) => v !== 'normal' ? 'bold' : 'normal',
	},
	fontStyle: {
		isLineBlock: true,
		text: "/",	//	italic normal
		component: "icon-switch",
		extraProps: {
			promptText: "斜体",
		},
		initTransform: (v: string) => v !== 'normal' ? 'actived' : 'normal',
		afterTransform: (v: string) => v !== 'normal' ? 'italic' : 'normal',
	},
	textDecoration: {
		isLineBlock: true,
		text: "_",	//	underline none
		component: "icon-switch",
		extraProps: {
			promptText: "下划线",
		},
		initTransform: (v: string) => v !== 'none' ? 'actived' : 'normal',
		afterTransform: (v: string) => v !== 'normal' ? 'underline' : 'none',
	}
};
