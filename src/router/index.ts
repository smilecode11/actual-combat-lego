// import { defineAsyncComponent } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import DefaultLayout from "../layout/Default.vue";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";
import Login from "../views/Login.vue";
import Page404 from "../views/Page404.vue";

const routes = [
	{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/home",
		component: DefaultLayout,
		name: "Home",
		children: [
			{
				path: "",
				component: Home
			}
		]
	},
	{
		path: "/detail",
		name: "Detail",
		component: DefaultLayout,
		children: [
			{
				path: ":id",
				component: Detail
			}
		]
	},
	{
		path: "/login",
		name: "Login",
		component: Login
	},
	{
		path: "/editor/:id",
		// component: defineAsyncComponent(() => import("../views/Editor.vue")),
		component: () => import("../views/Editor.vue"),
		name: "Editor"
	},
	{
		path: "/404",
		component: DefaultLayout,
		name: "404",
		children: [
			{
				path: "",
				component: Page404
			}
		]
	},
	//  兜底路由设置
	{
		path: "/:w+",
		name: "*",
		redirect: "/404"
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

/* router.beforeEach((form, to, next) => {
	next();
}); */

export default router;
