import { createStore } from "vuex";
import user, { UserProps } from "./user";
import templates, { TemplateProps } from "./templates";

export interface GlobalDataProps {
	user: UserProps;
	templates: {
		list: TemplateProps[];
		total: number;
	};
}

const store = createStore<GlobalDataProps>({
	modules: {
		user,
		templates
	}
});

export default store;
