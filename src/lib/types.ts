/**
 * Todoアプリの型定義
 */

/**
 * Todoアイテムの型定義
 */
export interface Todo {
	id: string;
	text: string;
	completed: boolean;
	createdAt: number;
	updatedAt?: number;
}

/**
 * フィルターの種類
 */
export type FilterType = 'all' | 'completed' | 'active';
