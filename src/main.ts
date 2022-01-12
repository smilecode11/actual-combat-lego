import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "@/router/index";
import store from "@/store/index";

const app = createApp(App);
app.use(Antd);

app.use(router);

app.use(store);

app.mount("#app");

//  按需手动引入|使用 ant-design-vue
// import {
// 	Layout,
// 	Row,
// 	Col,
// 	Card,
// 	Input,
// 	InputNumber,
// 	Dropdown,
// 	Menu,
// 	Button,
// 	Form,
// 	Slider,
// 	Radio,
// 	Select,
// 	message
// } from "ant-design-vue";
// app
// 	.use(Layout)
// 	.use(Row)
// 	.use(Col)
// 	.use(Card)
// 	.use(Input)
// 	.use(InputNumber)
// 	.use(Dropdown)
// 	.use(Menu)
// 	.use(Button)
// 	.use(Form)
// 	.use(Slider)
// 	.use(Radio)
// 	.use(Select);

// 全局属性挂载 message
// app.config.globalProperties.message = message;
