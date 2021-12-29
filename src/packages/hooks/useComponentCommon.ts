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
	const handleClick = () => {
		if (props.actionType === "url" && props.url) {
			// window.location.href = props.url;
		}
	};

	return {
		styleProps,
		handleClick
	};
};

export default useComponentCommon;
