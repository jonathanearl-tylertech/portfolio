<script lang="ts">
	/** @type {import('./$types').ActionData} */
	export let form: {
		title: string;
		username: string;
		password: string;
	};
</script>

<div class="flex flex-col h-screen items-center bg-[rgb(250,250,250)]">
	<div class="w-[708px] border-b mb-4 mt-8 border-slate-300">
		<h1 class="py-2 text-xl text-slate-700">Create post</h1>
	</div>
	<form class="flex flex-col w-[708px] p-4 bg-white border" method="POST" action="?/register">
		<div class="flex flex-col mb-8">
			<div class="relative flex flex-col ">
				<input
					name="title"
					class={'py-2 px-6 bg-gray-100 rounded border focus-visible:outline-gray-500'}
					type="text"
					placeholder="title"
					value={form?.title ?? ''}
				/>
			</div>
		</div>

		<div class="flex flex-col mb-8">
			<div class="relative flex flex-col ">
				<textarea
					name="content"
					class={'py-2 px-6 bg-gray-100 rounded border focus-visible:outline-gray-500 h-[122px]'}
					placeholder="text (optional)"
					value={form?.username ?? ''}
				/>
			</div>
		</div>
		
    <div class="flex justify-end">
			<button
				class={'rounded-full bold bg-blue-500 text-white font-semibold py-2 px-4 mb-8 bg-inherit text-blue-500'}
			>
				Save draft
			</button>
			<button
				class={'ml-2 rounded-full bold bg-blue-500 text-white font-semibold py-2 px-4 mb-8'}
			>
				Post
			</button>
		</div>
	</form>
</div>
