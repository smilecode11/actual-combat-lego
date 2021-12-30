import { computed } from "vue";
import { pick } from "lodash-es";
import { TextComponentProps } from "@/packages/defaultProps";

const useComponentCommon = (
	props: Readonly<Partial<TextComponentProps>>,
	picks: string[]
) => {
	//  style props 获取
	const styleProps = computed(() => pick(props, picks));

	//  click event 注册
	const handleClick = (ev: any) => {
		if (props.actionType === "url" && props.url) {
			//	画布中的元素点击事件失效
			const canvasControlDom =
				document.getElementsByClassName("canvas-container")[0];
			if (ev.path.find((element: Element) => element === canvasControlDom))
				return;

			window.location.href = props.url;
		}
	};

	return {
		styleProps,
		handleClick
	};
};

export default useComponentCommon;
