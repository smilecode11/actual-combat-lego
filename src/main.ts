import { createApp } from "vue";
import App from "./App.vue";

//  按需手动引入 antd
import { Layout, Row, Col } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

//  引入 vueRouter
import router from "./router/index";

const app = createApp(App);
//  使用 antd
app.use(Layout).use(Row).use(Col);
//  使用 router
app.use(router);

app.mount("#app");
