<script lang="ts">
	import type { Todo } from '$lib/types';
	import { todoStore } from '$lib/stores/todoStore';

	interface Props {
		todo: Todo;
	}

	let { todo }: Props = $props();
	let isEditing = $state(false);
	let editText = $state('');
	let editInput: HTMLInputElement | undefined = $state();

	// todo.textが変更されたときにeditTextを更新（編集モードでない場合のみ）
	$effect(() => {
		if (!isEditing) {
			editText = todo.text;
		}
	});

	// 編集モードに入ったときにフォーカスを設定
	$effect(() => {
		if (isEditing && editInput) {
			editInput.focus();
		}
	});

	function handleToggle() {
		todoStore.toggle(todo.id);
	}

	function handleEdit() {
		isEditing = true;
		editText = todo.text;
	}

	function handleSave() {
		if (editText.trim()) {
			todoStore.edit(todo.id, editText.trim());
			isEditing = false;
		}
	}

	function handleCancel() {
		editText = todo.text;
		isEditing = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSave();
		} else if (event.key === 'Escape') {
			handleCancel();
		}
	}

	function handleDelete() {
		todoStore.remove(todo.id);
	}

	// 日付フォーマット関数
	function formatDateTime(timestamp: number): string {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
		const weekday = weekdays[date.getDay()];

		return `${year}-${month}-${day} (${weekday}) ${hours}:${minutes}`;
	}
</script>

<div
	class="flex gap-3 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-all duration-200"
>
	<div class="flex flex-col items-start gap-2 flex-1">
		<div class="flex items-center gap-3 w-full">
			<input
				type="checkbox"
				checked={todo.completed}
				onchange={handleToggle}
				class="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer transition-all"
			/>
			{#if isEditing}
				<input
					type="text"
					bind:value={editText}
					bind:this={editInput}
					onkeydown={handleKeydown}
					class="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
				/>
				<button
					onclick={handleSave}
					class="px-3 py-1.5 text-sm font-medium text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					aria-label="保存"
				>
					保存
				</button>
				<button
					onclick={handleCancel}
					class="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-white hover:bg-gray-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					aria-label="キャンセル"
				>
					キャンセル
				</button>
			{:else}
				<span
					class="flex-1 text-gray-800 transition-all duration-200 {todo.completed
						? 'line-through text-gray-500'
						: ''}"
				>
					{todo.text}
				</span>
				<button
					onclick={handleEdit}
					class="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					aria-label="編集"
				>
					<i class="fas fa-edit text-gray-600 hover:text-indigo-600 transition-all"></i>
					編集
				</button>
			{/if}
			<button
				onclick={handleDelete}
				class="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
				aria-label="削除"
			>
				削除
			</button>
		</div>
		<div class="ml-8 text-xs text-gray-500">
			作成日時：{formatDateTime(todo.createdAt)}
			{todo.updatedAt ? ` ・更新日時：${formatDateTime(todo.updatedAt)}` : ''}
		</div>
	</div>
</div>
