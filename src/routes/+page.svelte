<script lang="ts">
	import UserHeader from './UserHeader.svelte';
	import k8s from '$lib/images/k8s.png';
	const date = new Date('2023-01-08T00:18:47.343Z');
	const localDate = date.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	const project = {
		date: localDate,
		readLength: '8 min read',
		title: 'k8s',
    url: '/whattheearl/k8s',
    author: 'whattheearl',
		authorUrl: '/whatthearl',
	};
</script>

<UserHeader />
<main class="px-[24px]">
	{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6] as p}
		<article class="border-b border-gray-300">
			<a href={project.url}>
				<div class="pt-6 mb-3 text-gray-500 text-sm">{localDate}</div>
				<div class="flex justify-between">
					<h1 class="text-black-600 font-bold text-ellipsis h-12 overflow-hidden line-clamp-2">
						{project.title}
					</h1>
					<div class="flex shrink-0 bg-gray-200 ml-6">
						<img src={k8s} alt="kubernettes" class="object-cover h-14 w-20 ..." />
					</div>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-gray-500 text-sm py-4">{project.readLength}</span>
				</div>
			</a>
		</article>
	{/each}
</main>
