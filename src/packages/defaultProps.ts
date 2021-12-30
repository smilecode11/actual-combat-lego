import { mapValues, without } from "lodash-es";

export interface CommonComponentProps {
	actionType: string;
	url: string;
	height: string;
	width: string;
	paddingLeft: string;
	paddingRight: string;
	paddingTop: string;
	paddingBottom: string;
	borderStyle: string;
	borderColor: string;
	borderWidth: string;
	borderRadius: string;
	boxShadow: string;
	opacity: string;
	position: string;
	left: string;
	top: string;
	right: string;
}

export interface TextComponentProps extends CommonComponentProps {
	text: string;
	display: string;
	fontSize: string;
	fontFamily: string;
	fontWeight: string;
	fontStyle: string;
	textDecoration: string;
	lineHeight: string;
	textAlign: string;
	color: string;
	backgroundColor: string;
}

/** 公共默认属性*/
export const commonDefaultProps: CommonComponentProps = {
	// actions
	actionType: "",
	url: "",
	//  size
	height: "",
	width: "100%",
	paddingLeft: "0px",
	paddingRight: "0px",
	paddingTop: "0px",
	paddingBottom: "0px",
	//  border
	borderStyle: "none",
	borderColor: "#000",
	borderWidth: "0",
	borderRadius: "0",
	//  shadow & opacity
	boxShadow: "0 0 0 #000000",
	opacity: "1",
	//  position & x,y
	position: "absolute",
	left: "0",
	top: "",
	right: ""
};

/** TEXT 的默认属性*/
export const textDefaultProps: TextComponentProps = {
	text: "正文内容",
	display: "block",
	fontSize: "14px",
	fontFamily: "",
	fontWeight: "normal",
	fontStyle: "normal",
	textDecoration: "none",
	lineHeight: "1",
	textAlign: "left",
	color: "#000000",
	backgroundColor: "",
	...commonDefaultProps
};

/** 获得组件 props 定义集合*/
export const transformToComponentProps = (props: TextComponentProps) => {
	return mapValues(props, (item) => {
		return {
			type: item.constructor as StringConstructor,
			default: item
		};
	});
};

/** 获得 text stylePropsName 集合*/
export const textStylePropsNames = without(
	Object.keys(textDefaultProps),
	"actionType",
	"url",
	"text"
);
