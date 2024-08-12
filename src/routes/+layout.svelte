<script lang="ts">
	import Navbar from "$lib/components/global/Navbar.svelte";
	import "@fontsource/ibm-plex-mono";
	import "../app.css";
</script>

<Navbar />

<div class="flex w-screen justify-center pb-16">
	<div
		class="mt-24 h-fit w-screen max-w-[1400px] overflow-hidden border border-dashed border-neutral-800"
	>
		<slot />
	</div>
</div>
