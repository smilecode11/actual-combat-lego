import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

//  按需手动引入|使用 ant-design-vue
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

//  引入|使用 vue-router
import router from "@/router/index";
app.use(router);

//  引入|使用 vuex
import store from "@/store/index";
app.use(store);

app.mount("#app");
