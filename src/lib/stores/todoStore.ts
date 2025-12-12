import { writable } from 'svelte/store';
import type { Todo } from '$lib/types';

const STORAGE_KEY = 'svelte-todo-app-todos';

// localStorageからTodoを読み込む
function loadTodosFromStorage(): Todo[] {
	if (typeof window === 'undefined') return [];

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (error) {
		console.error('Failed to load todos from localStorage:', error);
	}

	return [];
}

// localStorageにTodoを保存する
function saveTodosToStorage(todos: Todo[]): void {
	if (typeof window === 'undefined') return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	} catch (error) {
		console.error('Failed to save todos to localStorage:', error);
	}
}

// 初期状態をlocalStorageから読み込む
const initialTodos = loadTodosFromStorage();

// writable storeを作成
function createTodoStore() {
	const { subscribe, set, update } = writable<Todo[]>(initialTodos);

	return {
		subscribe,
		// Todoを追加
		add: (text: string) => {
			const newTodo: Todo = {
				id: crypto.randomUUID(),
				text: text.trim(),
				completed: false,
				createdAt: Date.now()
			};

			update((todos) => {
				const newTodos = [...todos, newTodo];
				saveTodosToStorage(newTodos);
				return newTodos;
			});
		},
		// Todoの完了状態を切り替え
		toggle: (id: string) => {
			update((todos) => {
				const newTodos = todos.map((todo) =>
					todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: Date.now() } : todo
				);
				saveTodosToStorage(newTodos);
				return newTodos;
			});
		},
		// Todoを編集
		edit: (id: string, text: string) => {
			update((todos) => {
				const newTodos = todos.map((todo) =>
					todo.id === id ? { ...todo, text, updatedAt: Date.now() } : todo
				);
				saveTodosToStorage(newTodos);
				return newTodos;
			});
		},
		// Todoを削除
		remove: (id: string) => {
			update((todos) => {
				const newTodos = todos.filter((todo) => todo.id !== id);
				saveTodosToStorage(newTodos);
				return newTodos;
			});
		},
		// すべてのTodoを削除
		clear: () => {
			set([]);
			saveTodosToStorage([]);
		}
	};
}

export const todoStore = createTodoStore();
