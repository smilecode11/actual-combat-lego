<template>
	<div>hello world</div>
	<div>{{ propsMsg }}</div>
	<button @click="handleCountAdd">count button change</button>
	<div class="count-wrapper">{{ count }}</div>
	<hr />
	<input class="todo-input" type="text" v-model="todo" /> &nbsp;
	<button class="todo-button" @click="handleAddTodo">新增 Todo</button>
	<li class="todo-item" v-for="(item, index) in todos" :key="index">
		{{ item }}
	</li>
	<hr />
	<Hello></Hello>
	<hr />
	<!-- 请求测试 -->
	<div class="request-wrapper">
		<button class="load-user-button" @click="loadUser">加载 user</button>
		<div class="request-pending" v-if="user.loading">loading</div>
		<div class="request-body" v-else>
			{{ user.data && user.data.username }}
		</div>
		<div class="request-error" v-if="user.error">{{ user.error }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from "vue";
import axios from "axios";
import Hello from "@/components/Hello";
export default defineComponent({
	props: ["message"],
	emits: ["changeMsg"],
	setup(props, context) {
		const propsMsg = computed(() => props.message);
		//	count
		const count = ref(0);
		const handleCountAdd = () => {
			count.value++;
		};

		//	todo
		const todo = ref("");
		const todos: any = reactive([]);
		const handleAddTodo = () => {
			if (todo.value) {
				todos.push(todo.value);
				context.emit("changeMsg", todo.value);
			}
		};

		//	async
		const user = reactive({
			data: null as any,
			loading: false,
			error: ""
		});

		const loadUser = () => {
			user.loading = true;
			axios
				.get(`/api/users/1`)
				.then((resp) => {
					user.data = resp.data;
				})
				.catch((e) => {
					user.error = e;
				})
				.finally(() => {
					user.loading = false;
				});
		};

		return {
			propsMsg,
			count,
			handleCountAdd,
			todo,
			todos,
			handleAddTodo,
			user,
			loadUser
		};
	},
	components: {
		Hello
	}
});
</script>
