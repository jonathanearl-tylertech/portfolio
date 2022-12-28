<script lang="ts">
	import { XIcon } from 'svelte-feather-icons';

	let hasError = false;
	let isSuccessVisible = false;

	const validateEmail = () => {
		console.log('validateemai');
		const elem = document.querySelector('#email') as HTMLInputElement;
		const email = elem.value;
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (email.match(mailformat)) {
			console.log('succes');
			isSuccessVisible = true;
			hasError = false;
		} else {
			console.log('fail');
			hasError = true;
		}
	};

	let timout: any;
	const handleOnChange = () => {
		console.log('debounce trigger');
		clearTimeout(timout);
		timout = setTimeout(validateEmail, 1000);
	};
</script>

<div class="absolute left-0 top-0 w-screen h-screen bg-black opacity-50" />
<div class="absolute left-0 top-0 w-screen h-screen flex justify-center items-center ">
	<div class="rounded bg-white opacity-100">
		<form class="flex flex-col w-[400px] px-16 py-[80px]">
			<h1 class="mb-8 text-5xl text-slate-700">Hi! 👋</h1>
			<div class="mb-16">You can comment on any post by creating an account.</div>
			<!-- <div class="flex items-center text-slate-400 font-semibold py-[28px]">
				<span class="flex grow h-[1px] bg-slate-400" />
				<span class="uppercase p-2">or</span>
				<span class="flex grow h-[1px] bg-slate-400" />
			</div> -->
			<!-- class={"py-2 px-8 bg-gray-100 rounded-full border border-grey mb-8"} -->

			<div class="flex flex-col mb-8">
				<input
					id="email"
					name="email"
					class={'py-2 px-8 bg-gray-100 rounded-full border-none ' +
						(hasError ? 'focus-visible:outline-red-500' : 'focus-visible:outline-gray-500')}
					type="text"
					placeholder="Email"
					on:keyup={handleOnChange}
				/>
				<div class={'ml-4 text-sm mt-1 text-red-500 ' + (hasError ? 'block' : 'hidden')}>
					Not a valid email address
				</div>
			</div>

			<button
				class={`w-full rounded-full bold bg-blue-500 text-white font-semibold p-2 mb-8
					${!isSuccessVisible && 'bg-blue-100'}`}
				disabled={!isSuccessVisible}>Continue</button
			>
			<div class="flex">
				<span class="text-black">Already a have an account?</span>
				<div class="ml-2 text-blue-500">Log in</div>
			</div>
		</form>
	</div>
</div>
<button class="absolute round bg-white rounded-full p-2 right-[24px] top-[24px]">
	<XIcon />
</button>
