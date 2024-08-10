<script lang="ts">
	import "../app.css";
	import "@fontsource/ibm-plex-mono";
	import LogoWordmark from "$lib/components/logos/LogoWordmark.svelte";
	import Noise from "$lib/components/util/Noise.svelte";
	import Navbar from "$lib/components/global/Navbar.svelte";
	import "iconify-icon";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Navbar isFirefox={(data.ua || "").toLowerCase().includes("firefox")} />

<div class="flex w-screen justify-center pb-16">
	<div
		class="mt-24 h-fit w-screen max-w-[1400px] overflow-hidden border border-dashed border-neutral-800"
	>
		<slot />
	</div>
</div>
