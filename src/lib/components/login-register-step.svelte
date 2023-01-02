<script lang="ts">
  import { isCreateUser, isPassword, isUsername, PASSWORD_LEN_ERR, USERNAME_CHAR_ERR, USERNAME_LEN_ERR, USERNAME_USE_ERR } from '$lib/validation/registration';
	import { XIcon, CheckCircleIcon } from 'svelte-feather-icons';


	export let email: string;
	let username = '';
	let usernameError = '';
	let usernameVerified = false;
	let password = '';
	let passwordError = '';

  $: isValid = isCreateUser({ email, username, password }) === null;
  
	let timout: number;
	const debounce = (callback: Function) => {
		usernameVerified = false;
		clearTimeout(timout);
		timout = setTimeout(callback, 1000);
	};

	const verifyUsername = async () => {
		const errors = isUsername(username);
    console.log(errors);
    if (!errors) {
  		const res = await fetch(`/registration?username=${username}`);
      usernameError = res.status === 409 ? USERNAME_USE_ERR : '';
      return;
    }
    switch(errors[0].keyword) {
      case 'minLength':
      case 'maxLength':
        usernameError = USERNAME_LEN_ERR;
        return;
      case 'format':
        usernameError = USERNAME_CHAR_ERR;
        return;
    }
	};
  
	const verifyPassword = async () => {
		const errors = isPassword(password);
    if (!errors) {
      passwordError = '';
      return;
    }
    switch(errors[0].keyword) {
      case 'minLength':
      case 'maxLength':
        passwordError = PASSWORD_LEN_ERR;
        return;
    }
		// passwordError = errors.join(', ');
	};

	const createUser = async () => {
		const res = await fetch(`/registration`, {
			method: 'POST',
			body: JSON.stringify({ email, username, password })
		});
		if (res.status !== 200) {
			// const { message, usernameErrors, passwordErrors, emailErrors } =
			// 	(await res.json()) as RegistrationError;
			// usernameError = usernameErrors.join(', ');
			// passwordError = passwordErrors.join(', ');
			// console.error(message);
		}
	};

	$: disabled = !!usernameError || !!passwordError || !usernameVerified;
	$: buttonClass = `w-full rounded-full bold text-white font-semibold p-2 mb-8  ${
		isValid ? 'bg-blue-500' : 'bg-blue-200'
	}`;
</script>

<form class="flex flex-col w-full h-full px-16 py-[80px]">
	<h1 class="mb-8 text-xl text-slate-700">Create your username and password</h1>
	<div class="mb-16">
		Your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t
		change it.
	</div>
	<div class="flex flex-col mb-4">
		<div class="relative flex flex-col ">
			<input
				id="username"
				name="username"
				class={'py-2 px-8 bg-gray-100 rounded-full border-none ' +
					(usernameError ? 'focus-visible:outline-red-500' : 'focus-visible:outline-gray-500')}
				type="text"
				placeholder="Username"
				bind:value={username}
				on:keyup={() => debounce(verifyUsername)}
			/>
			{#if usernameVerified}
				<CheckCircleIcon class={'absolute right-[8px] top-[8px] text-green-500'} />
			{/if}
		</div>
		<div class={'ml-4 text-sm mt-1 text-red-500 ' + (usernameError ? 'block' : 'hidden')}>
			{usernameError}
		</div>
	</div>
	<div class="flex flex-col mb-8">
		<input
			id="password"
			name="password"
			class={'py-2 px-8 bg-gray-100 rounded-full border-none ' +
				(passwordError ? 'focus-visible:outline-red-500' : 'focus-visible:outline-gray-500')}
			type="password"
			placeholder="password"
			bind:value={password}
			on:keyup={() => debounce(verifyPassword)}
		/>
		<div class={'ml-4 text-sm mt-1 text-red-500 ' + (passwordError ? 'block' : 'hidden')}>
			{passwordError}
		</div>
	</div>

	<button class={buttonClass} on:click={createUser} >Continue</button>
	<div class="flex">
		<span class="text-black">Already a have an account?</span>
		<div class="ml-2 text-blue-500">Log in</div>
	</div>
</form>
