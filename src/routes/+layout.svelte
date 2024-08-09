<script>
	import "../app.css";
	import "@fontsource/ibm-plex-mono";
	import LogoWordmark from "$lib/components/logos/LogoWordmark.svelte";
	import Noise from "$lib/components/util/Noise.svelte";
</script>

<!-- TODO: split into another file -->
<div
	class="absolute left-1/2 flex h-24 w-full max-w-[1400px] -translate-x-1/2 items-center border border-t-0 border-dashed border-neutral-700 bg-[#0e0e0e] px-8 shadow-xl shadow-black/75"
>
	<div class="flex flex-grow items-center opacity-60">
		<div class="h-full">
			<LogoWordmark />
		</div>
		<div class="ml-3.5 h-8 w-0.5 bg-white opacity-30" />
		<div class="ml-4 text-xl opacity-50">Engineering</div>
	</div>
	<div class="pointer-events-none absolute left-0 top-0 h-full w-full">
		<Noise colour="#1a1a1a" />
	</div>
</div>

<slot></slot>
