<script lang="ts">
	import '../app.css';
	import { HomeIcon, UserIcon, SearchIcon, ChevronDownIcon } from 'svelte-feather-icons';
	const user = {
		name: 'Jonathan Earl'
	};
	const profileLinks = ['Projects', 'About'];
	const selectedLink = 'Projects';
	const selectedLinkClass = 'whitespace-nowrap pb-4 mr-8 border-b border-black z-10';
	const linkClass = 'whitespace-nowrap mr-8';
</script>

<nav class="flex w-full items-center justify-between px-[24px] py-[12px] border-b border-black-100">
	<div class="max-w-[700px] flex w-full items-center justify-between mx-auto">
		<div class="flex">
			<!-- <span>
				<HomeIcon />
			</span> -->
			<span class="ml-4">name of site</span>
		</div>
		<div class="flex text-slate-300">
			<!-- <span class="mr-[32px]">
				<SearchIcon />
			</span>
			<span>
				<UserIcon />
			</span>
			<span>
				<ChevronDownIcon />
			</span> -->
		</div>
	</div>
</nav>

<!-- <header class="px-6 my-6">
	<div class="flex items-center">
		<span class="flex w-12 h-12 bg-slate-100 rounded-full items-center justify-center mr-5">
			<UserIcon />
		</span>
		<div>
			<h1 class="text-black-700 text-xl font-bold">{user.name}</h1>
		</div>
	</div>
</header> -->
<!-- <nav class="relative">
  <div class="flex ml-6">
    {#each profileLinks as link}
      <div class={link === selectedLink ? selectedLinkClass : linkClass}>
        <a href="/whattheearl">
          <p>{link}</p>
        </a>
      </div>
    {/each}
  </div>
  <div class="absolute bottom-0 w-full h-[1px] bg-gray-300" />
</nav> -->
<div class="max-w-[700px] mx-auto">
	<slot />
</div>
