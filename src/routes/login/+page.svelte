<script lang="ts">
	import '../../app.css';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex w-screen h-screen justify-center items-center bg-[rgb(250,250,250)]">
	<form
		class="absolute flex flex-col w-[400px] px-16 py-[80px] bg-white border"
		method="POST"
		action="?/login"
	>
		<h1 class="mb-8 text-4xl text-slate-700">Log in</h1>
		<div class="mb-16">You can comment on any post by creating an account.</div>
		<div class="flex flex-col mb-8">
			<div class="relative flex flex-col ">
				<input
					name="username"
					class={'py-2 px-8 bg-gray-100 rounded border focus-visible:outline-gray-500'}
					type="text"
					placeholder="Username"
					value={form?.username ?? ''}
				/>
				{#each form?.errors?.username || [] as errorMessage}
					<div>{errorMessage}</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col mb-8">
			<div class="relative flex flex-col ">
				<input
					name="password"
					class={'py-2 px-8 bg-gray-100 rounded border focus-visible:outline-gray-500'}
					type="password"
					placeholder="Password"
				/>
			</div>
			{#each form?.errors?.password || [] as errorMessage}
				<div>{errorMessage}</div>
			{/each}
		</div>

		<button
			class={'w-full rounded-full bold bg-blue-500 text-white font-semibold p-2 mb-8 uppercase'}
		>
			Log in
		</button>
		<div class="flex">
			<span class="text-black">New user?</span>
			<a class="ml-2 text-blue-500 uppercase text-semibold" href="/register">Sign up</a>
		</div>
	</form>
</div>
