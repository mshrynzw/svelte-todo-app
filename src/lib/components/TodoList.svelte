<script lang="ts">
	import { todoStore } from '$lib/stores/todoStore';
	import TodoItem from './TodoItem.svelte';
	import type { Writable } from 'svelte/store';
	import type { FilterType } from '$lib/types';
	import type { Todo } from '$lib/types';

	interface Props {
		filter: Writable<FilterType>;
	}

	let { filter }: Props = $props();

	// Todoリストをリアクティブに購読
	let todos = $state<Todo[]>([]);
	let currentFilter = $state<FilterType>('all');

	// storeの変更を監視
	$effect(() => {
		const unsubscribeTodos = todoStore.subscribe((value) => {
			todos = value;
		});
		const unsubscribeFilter = filter.subscribe((value) => {
			currentFilter = value;
		});

		return () => {
			unsubscribeTodos();
			unsubscribeFilter();
		};
	});

	// フィルターに基づいてTodoをフィルタリング
	let filteredTodos = $derived(
		todos.filter((todo) => {
			if (currentFilter === 'completed') return todo.completed;
			if (currentFilter === 'active') return !todo.completed;
			return true; // 'all'
		})
	);
</script>

<div class="mt-4">
	{#if filteredTodos.length === 0}
		<div class="text-center py-12 text-gray-500">
			<div class="text-6xl mb-4">📝</div>
			{#if currentFilter === 'all'}
				<p class="text-lg">Todoがありません</p>
				<p class="text-sm mt-2">新しいTodoを追加してください</p>
			{:else if currentFilter === 'completed'}
				<p class="text-lg">完了したTodoがありません</p>
			{:else}
				<p class="text-lg">未完了のTodoがありません</p>
			{/if}
		</div>
	{:else}
		<div class="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
			{#each filteredTodos as todo (todo.id)}
				<TodoItem {todo} />
			{/each}
		</div>
	{/if}
</div>
