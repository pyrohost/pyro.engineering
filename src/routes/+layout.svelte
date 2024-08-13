<script lang="ts">
	import Navbar from "$lib/components/global/Navbar.svelte";
	import LogoWordmark from "$lib/components/logos/LogoWordmark.svelte";
	import "@fontsource/ibm-plex-mono";
	import "../app.css";
	import type { PageData } from "./$types";

	export let data: PageData;

	const messages = [
		"Thank you for reading.",
		"What's come before is prologue.",
		"Find your flow.",
		"Stay awhile and listen.",
		"Welcome to the future.",
		"Shine bright."
    ];

    $: randomMessage = messages[Math.floor(Math.random() * messages.length)];
</script>

<Navbar isFirefox={data.ua?.toLowerCase().includes("firefox")} />

<div class="flex w-screen justify-center pb-72">
	<div
		class="mt-24 h-fit w-full max-w-[1400px] overflow-hidden border border-dashed border-neutral-800 bg-black relative z-10"
	>
		<slot />
	</div>
</div>
<footer class="mx-auto text-opacity-50 text-white left-0 right-0 max-w-[1400px] w-full fixed bottom-0 py-32 px-2">
	<div class="mx-auto w-fit text-sm">
		{randomMessage}
	</div>
	<div class="mx-auto w-fit text-sm">
		Copyright © {new Date().getFullYear()} Pyro Host Inc.
	</div>
</footer>
