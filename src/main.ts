import { createApp } from "vue";
import App from "./App.vue";

//  按需手动引入 antd
import {
	Layout,
	Row,
	Col,
	Card,
	Input,
	Dropdown,
	Menu,
	Button,
	Form
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

//  引入 vueRouter
import router from "./router/index";

const app = createApp(App);
//  使用 antd
app
	.use(Layout)
	.use(Row)
	.use(Col)
	.use(Card)
	.use(Input)
	.use(Dropdown)
	.use(Menu)
	.use(Button)
	.use(Form);

//  使用 router
app.use(router);

app.mount("#app");
