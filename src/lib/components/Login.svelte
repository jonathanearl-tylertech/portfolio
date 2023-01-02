<script lang="ts">
	import { XIcon } from 'svelte-feather-icons';
	import LoginEmailStep from './Login-email-step.svelte';
	import LoginRegisterStep from './login-register-step.svelte';

	let email = '';
</script>

<div class="absolute left-0 top-0 w-screen h-screen bg-black opacity-50" />
<div class="absolute left-0 top-0 w-screen h-screen flex justify-center items-center ">
	<div class="rounded bg-white opacity-100 w-[400px] min-h-[600px]">
		{#if !email}
			<LoginEmailStep bind:email={email} />
		{/if}
		{#if email}
			<LoginRegisterStep {email} />
		{/if}
	</div>
</div>
<button class="absolute round bg-white rounded-full p-2 right-[24px] top-[24px]">
	<XIcon />
</button>
