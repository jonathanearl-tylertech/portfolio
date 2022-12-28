<script lang="ts">
	import { ArrowLeftIcon, ArrowRightIcon, XIcon } from 'svelte-feather-icons';
	import { listProjects } from '$lib/utils/projects';
	import type { IProject } from '$lib/utils/projects';
	import Comment from '$lib/Comment.svelte';
	import { onMount } from 'svelte';

	const projList: IProject[] = listProjects();
	let proj: IProject | null = null;

	const setProj = (project: IProject) => {
		proj = project;
	};
	const unsetProj = () => {
		proj = null;
	};
	const prevProject = (project: IProject | null) => {
		if (!project) return;
		setProj(projList[projList.indexOf(project) - 1]);
	};
	const nextProject = (project: IProject | null) => {
		if (!project) return;
		setProj(projList[projList.indexOf(project) + 1]);
	};

	const handleKeyUp = (e: KeyboardEvent) => {
		if (!proj) return;
		switch (e.key) {
			case 'ArrowLeft':
				prevProject(proj);
				break;
			case 'ArrowRight':
				nextProject(proj);
				break;
			case 'Escape':
				unsetProj();
				break;
		}
	};

	const handleClickOff = (e: MouseEvent) => {
		const modal = document.querySelector('#modal');
		if (e.target instanceof HTMLImageElement) return;
		if (e.target instanceof SVGElement || e.target instanceof HTMLButtonElement) return;
		if (modal && e.composedPath().includes(modal)) return;
		unsetProj();
	};

	onMount(() => {
		document.addEventListener('keyup', handleKeyUp);
		return () => document.removeEventListener('keyup', handleKeyUp);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="mx-auto" on:click={handleClickOff}>
	{#if proj}
		<div
			class="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black opacity-90"
		/>
		<div class="absolute flex justify-center items-center w-screen h-screen left-0 top-0">
			<div id="modal" class="flex bg-white">
				<div class="markdown-body p-[24px] max-w-[764px] h-[764px]">
					<span>{@html proj?.content}</span>
				</div>
				<div class="w-[500px] border-l-[1px]">
					<Comment project={proj} />
				</div>
			</div>
		</div>

		<button
			class="absolute top-[24px] right-[24px] bg-white rounded-full cursor-pointer p-2"
			on:click={() => unsetProj()}
		>
			<XIcon />
		</button>

		{#if projList.indexOf(proj) !== 0}
			<button
				id="prev-button"
				class="absolute left-[24px] top-1/2 translate-y-1/2  bg-white rounded-full p-2 cursor-pointer z-50"
				on:click={() => prevProject(proj)}
			>
				<ArrowLeftIcon />
			</button>
		{/if}

		{#if projList.indexOf(proj) !== projList.length - 1}
			<button
				id="next-button"
				class="absolute right-[24px] top-1/2 translate-y-1/2 bg-white rounded-full p-2 cursor-pointer z-50"
				on:click={() => nextProject(proj)}
			>
				<ArrowRightIcon />
			</button>
		{/if}
	{/if}
	<div class="text-[18px] leading-[24px] font-bold mt-[16px] mb-[24px] px-[20px]">Projects</div>
	<div class="px-[20px] w-[935px] grid grid-cols-3 gap-[28px]">
		{#each projList as p}
			<img
				class="project h-[293px] w-[293px] object-cover cursor-pointer"
				draggable="false"
				src={p.media}
				alt={p.name}
				on:click={() => setProj(p)}
				on:keydown={() => setProj(p)}
			/>
		{/each}
	</div>
</div>
