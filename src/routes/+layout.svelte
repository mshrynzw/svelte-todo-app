<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
	<title>Svelte Todo App</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
	<div class="container mx-auto px-4 py-8 max-w-2xl">
		<header class="text-center mb-8">
			<h1
				class="text-4xl sm:text-5xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
			>
				Svelte Todo App
			</h1>
			<p class="text-gray-600 text-lg">ハンズオン形式でSvelteを学ぶ</p>
		</header>
		<main>
			{@render children()}
		</main>
	</div>
</div>
