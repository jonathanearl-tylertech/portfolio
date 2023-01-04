<script lang="ts">
  import { isEmail } from '$lib/validation/email';
	import { CheckCircleIcon } from 'svelte-feather-icons';
	export let email = '';
	let emailValue = '';
	let emailError = '';
	let isSuccessVisible = false;

	const handleValidation = () => {
		const errors = isEmail(emailValue);
		if (errors && errors.email.length > 0) {
      emailError = errors.email.join(', ');
    }
		else {
      emailError = '';
      isSuccessVisible = true;
    }
	};

	let timout: any;
	const handleOnChange = () => {
		isSuccessVisible = false;
		clearTimeout(timout);
		timout = setTimeout(handleValidation, 1000);
	};

	const handleSubmit = () => {
		email = emailValue;
	};
</script>

<form class="flex flex-col w-full h-full px-16 py-[80px]">
	<h1 class="mb-8 text-5xl text-slate-700">Hi! 👋</h1>
	<div class="mb-16">You can comment on any post by creating an account.</div>
	<div class="flex flex-col mb-8">
		<div class="relative flex flex-col ">
			<input
				id="email"
				name="email"
				class={'py-2 px-8 bg-gray-100 rounded-full border-none ' +
					(emailError ? 'focus-visible:outline-red-500' : 'focus-visible:outline-gray-500')}
				type="text"
				placeholder="Email"
				bind:value={emailValue}
				on:keyup={handleOnChange}
			/>
      {#if isSuccessVisible}
			  <CheckCircleIcon class={'absolute right-[8px] top-[8px] text-green-500'} />
      {/if}
		</div>
		{#if emailError}
			<div class={'ml-4 text-sm mt-1 text-red-500'}>
				{emailError}
			</div>
		{/if}
	</div>

	<button
		class={`w-full rounded-full bold bg-blue-500 text-white font-semibold p-2 mb-8
      ${!isSuccessVisible && 'bg-blue-100'}`}
		on:click|preventDefault={handleSubmit}
		disabled={!isSuccessVisible}>Continue</button
	>
	<div class="flex">
		<span class="text-black">Already a have an account?</span>
		<div class="ml-2 text-blue-500">Log in</div>
	</div>
</form>
