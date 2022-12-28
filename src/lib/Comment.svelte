<script lang="ts">
	import { convertDateTime } from '$lib/utils/time';
	import verificationBadge from '$lib/icons/verification-badge.svg';
	import profileIcon from '$lib/icons/favicon.svg';
	import type { IProject } from '$lib/utils/projects';
  export let project: IProject;
</script>

<header class="border-b-[1px]  py-[14px] pl-[16px] flex items-center">
	<img class="w-[32px]" src={profileIcon} alt="ninja" />
	<span class="ml-[14px] text-sm font-semibold">{project.author.name}</span>
	<img class="h-[12px] ml-[4px]" src={verificationBadge} alt="verification badge" />
</header>
{#each project.comments as c}
	<div class="py-[14px] pl-[16px] text-sm flex items-start">
		<img class="w-[32px]" src={profileIcon} alt="ninja" />
		<div class="ml-[14px]">
			<div class="flex items-center">
				<span class="font-semibold">{c.author}</span>
				{#if c.verified === true}
					<img class="h-[12px] ml-[4px]" src={verificationBadge} alt="verification badge" />
				{/if}
				<span class="ml-[4px]">{c.comment}</span>
			</div>
			<div class="mt-[8px] mb-[4px] text-[12px] text-[rgb(142,142,142)]">
				{convertDateTime(c.createdAt)}
			</div>
		</div>
	</div>
{/each}
