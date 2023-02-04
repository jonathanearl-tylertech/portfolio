<script lang="ts">
	import { UserIcon } from 'svelte-feather-icons';
  const user = {
    name: 'Jonathan Earl',
  }
	const profileLinks = ['Projects', 'About'];
  const selectedLink = 'Projects';
  const selectedLinkClass = "whitespace-nowrap pb-4 mr-8 border-b border-black z-10";
  const linkClass = "whitespace-nowrap mr-8";
</script>

<header class="px-6 my-6">
	<div class="flex items-center">
		<span class="flex w-12 h-12 bg-slate-100 rounded-full items-center justify-center mr-5">
			<UserIcon />
		</span>
		<div>
			<h1 class="text-black-700 text-xl font-bold">{user.name}</h1>
		</div>
	</div>
</header>
<nav class="relative">
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
</nav>
