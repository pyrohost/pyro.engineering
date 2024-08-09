<script lang="ts">
	import { onMount } from "svelte";
	import LogoWordmark from "../logos/LogoWordmark.svelte";
	import Noise from "../util/Noise.svelte";
	import clsx from "clsx";

	let searchOpen = false;
	let jsRun = false;
	let searchBtn: HTMLButtonElement;

	const openSearch = () => {
		searchOpen = true;
		setTimeout(() => {
			searchBtn.querySelector("input")?.focus();
		}, 20);
	};

	const closeSearch = () => {
		const input = searchBtn.querySelector("input")!;
		if (input.value) return;
		searchOpen = false;
	};

	onMount(() => {
		jsRun = true;
	});
</script>

<div
	class="absolute left-1/2 flex h-24 w-full max-w-[1400px] -translate-x-1/2 items-center border border-t-0 border-dashed border-neutral-700 bg-[#0e0e0e] px-8 shadow-xl shadow-black/75"
>
	<div class="flex flex-grow items-center">
		<div class="h-full opacity-60">
			<LogoWordmark />
		</div>
		<div class="ml-3.5 h-8 w-0.5 bg-white/30" />
		<div class="ml-4 text-xl text-white/50">Engineering</div>
	</div>
	<div class="flex flex-shrink-0 items-center gap-6">
		<button
			class={clsx("relative h-12", {
				"w-72 cursor-default hover:!bg-[#191919] active:!bg-[#191919]": searchOpen,
				"w-12": !searchOpen,
			})}
			style="transition: width 200ms ease-out;"
			bind:this={searchBtn}
			on:mousedown={openSearch}
		>
			<div
				class={clsx(
					"absolute top-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-out",
					{
						"pointer-events-auto opacity-0": searchOpen,
						"pointer-events-none opacity-100": !searchOpen,
					},
				)}
			>
				Search
			</div>
			<!-- this is a really bad way of ensuring there's no layout shift -->
			{#if jsRun}
				<div
					class={clsx(
						"absolute top-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-out",
						{
							"pointer-events-none opacity-0": !searchOpen,
							"pointer-events-auto opacity-100": searchOpen,
						},
					)}
				>
					<button
						class="absolute right-4 h-fit w-fit min-w-0 border-none !bg-transparent p-0"
						on:click={closeSearch}
					>
						<iconify-icon icon="heroicons-solid:search" class="text-white/50" />
					</button>
					<input
						on:blur={closeSearch}
						class="h-full w-full px-4"
						type="text"
						placeholder="Search"
					/>
				</div>
			{/if}
		</button>
		<a class="btn h-12" href="##">All posts</a>
	</div>
	<div class="pointer-events-none absolute left-0 top-0 h-full w-full">
		<Noise colour="#1a1a1a" />
	</div>
</div>
