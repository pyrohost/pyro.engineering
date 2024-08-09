<script lang="ts">
	import { browser } from "$app/environment";
	import ferosBg from "$lib/assets/feros-bg.png";
	import { onMount } from "svelte";

	let parallax: HTMLImageElement;

	let scroll = browser ? window.scrollY : 0;

	onMount(() => {
		const anim = (_: number, skipCheck?: boolean) => {
			if (scroll === window.scrollY && !skipCheck) return requestAnimationFrame(anim);
			scroll = window.scrollY;
			parallax.style.transform = `translateY(${scroll * 0.6}px)`;
			requestAnimationFrame(anim);
		};

		const handle = requestAnimationFrame(() => anim(0, true));
		return () => cancelAnimationFrame(handle);
	});
</script>

<img
	aria-hidden
	src={ferosBg}
	bind:this={parallax}
	alt="Background mountains"
	class="pointer-events-none absolute left-0 top-0 -z-50 h-screen w-screen select-none object-cover"
/>

<div class="h-[calc(100vh*2)] w-screen">
	<div class="flex h-screen w-screen items-center justify-center overflow-hidden px-16 pb-32">
		<div class="max-w-[1400px]">
			<h1
				style="text-shadow: 0 0 40px rgba(255,255,255,0.75); animation: hero-in-right 1.5s cubic-bezier(0.19, 1, 0.22, 1);"
				class="w-full text-center text-5xl !leading-snug duration-0 lg:text-right lg:text-6xl"
			>
				How is the best software in the industry made?
			</h1>
			<h2
				class="mt-16 w-full text-center text-2xl !leading-snug text-white/30 lg:w-1/3 lg:text-left lg:text-3xl"
				style="animation: hero-in-left 1.5s 0.75s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0;"
			>
				Spoiler alert: it's all talent.
			</h2>
		</div>
	</div>
</div>
