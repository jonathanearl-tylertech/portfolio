<script lang="ts">
	import '../app.css';
	import { HomeIcon } from 'svelte-feather-icons';

	const data = {
		links: [{ name: 'projects', href: '/', icon: 'HomeIcon' }]
	};
</script>

<div class="flex h-full relative">
	<section id="side-nav" class="flex flex-col w-[245px] px-[12px] border-black-200 border-r-[1px]">
		<div class="py-[30px] px-[12px] text-[29px]">Jonathan Earl</div>
		<nav class="flex flex-col flex-1 gap-2">
			{#each data.links as link}
				<a class="flex items-center capitalize p-[12px] my-[8px]" href={link.href}>
					{#if link.icon === 'HomeIcon'}
						<HomeIcon class="mr-[16px] text-[24px]" />
					{/if}
					<span class="leading-[24px] text-[16px]">{link.name}</span>
				</a>
			{/each}
		</nav>
		<button>Login</button>
	</section>
	<main class="w-full h-full">
		<slot />
	</main>
</div>
