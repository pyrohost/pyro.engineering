<script lang="ts">
	import { onMount } from "svelte";
	import LogoWordmark from "../logos/LogoWordmark.svelte";
	import Noise from "../util/Noise.svelte";
	import clsx from "clsx";
	import { goto, onNavigate } from "$app/navigation";
	import { page } from "$app/stores";
	import { searchValue } from "$lib/store";
	import { transition } from "$lib/constants";
	import { browser } from "$app/environment";

	let searchOpen = $page.url.pathname.startsWith("/search/");
	let jsRun = false;
	let searchBtn: HTMLButtonElement;

	const duration = "400ms";

	let onSearchToggle = () => {};

	export let isFirefox = false;

	$: if (!searchOpen) setTimeout(() => ($searchValue = ""), 100);

	$: {
		searchOpen;
		if (browser) {
			onSearchToggle();
		}
	}

	const openSearch = () => {
		searchOpen = true;
		setTimeout(() => {
			searchBtn.querySelector("input")?.focus();
		}, 50);
	};

	const closeSearch = () => {
		const input = searchBtn.querySelector("input")!;
		if (input.value) return;
		searchOpen = false;
	};

	const search = (e: KeyboardEvent) => {
		setTimeout(
			() => {
				const input = searchBtn.querySelector("input")!;
				if (input.value.trim() === "") {
					goto("/", {
						keepFocus: true,
					});
				} else {
					goto(`/search/${input.value}`, {
						keepFocus: true,
					});
				}
			},
			isFirefox ? 50 : undefined, // fixes a bug where the input is one key behind
		);
	};

	onMount(() => {
		jsRun = true;
	});

	onNavigate((e) => {
		// if the input is focused, don't close the search
		const input = searchBtn.querySelector("input")!;
		if (input === document.activeElement) return;
		searchOpen = e.to?.url.pathname.startsWith("/search/") || false;
	});
</script>

<div
	class="fixed z-50 flex h-24 w-screen items-center justify-center bg-black/75 px-8 backdrop-blur-lg"
>
	<div class="flex h-full w-full max-w-[1400px] items-center justify-center px-4">
		<div class="flex flex-grow items-center">
			<a class="flex cursor-pointer" href="/">
				<div class="mr-3.5 h-full">
					<LogoWordmark />
				</div>
				<div class="hidden items-center sm:flex">
					<div class="h-6 w-0.5 bg-white/75" />
					<div class="-mt-0.5 ml-4 select-none text-2xl text-white">Engineering</div>
				</div>
			</a>
		</div>
		<div class="flex flex-shrink-0 items-center gap-6">
			<a class="btn !h-12 !w-12 !min-w-0 !px-0" href="##">
				<iconify-icon icon="heroicons-solid:rss" class="text-xl" />
			</a>
			<button
				class={clsx("relative h-12", {
					"w-72 cursor-default hover:!bg-[#191919] active:!bg-[#191919]": searchOpen,
					"w-32": !searchOpen,
				})}
				style="transition: width {duration} {transition};"
				bind:this={searchBtn}
				on:click={openSearch}
			>
				<div
					class={clsx("absolute top-0 flex h-full w-full items-center justify-center", {
						"pointer-events-auto opacity-0": searchOpen,
						"pointer-events-none opacity-100": !searchOpen,
					})}
					style="transition: opacity {duration} {transition};"
				>
					<iconify-icon icon="heroicons-solid:search" class="mr-2 text-xl" />
					<span>Search</span>
				</div>
				<!-- this is a really bad way of ensuring there's no layout shift -->
				{#if jsRun}
					<div
						class={clsx(
							"absolute top-0 flex h-full w-full items-center justify-center",
							{
								"pointer-events-none opacity-0": !searchOpen,
								"pointer-events-auto opacity-100": searchOpen,
							},
						)}
						style="transition: opacity {duration} {transition};"
					>
						<button
							tabindex={searchOpen ? 0 : -1}
							class="absolute right-4 h-fit w-fit min-w-0 border-none !bg-transparent p-0"
							on:click={closeSearch}
						>
							<iconify-icon icon="heroicons-solid:search" class="text-white/50" />
						</button>
						<input
							bind:value={$searchValue}
							tabindex={searchOpen ? 0 : -1}
							on:blur={closeSearch}
							class="h-full w-full px-4 pr-10"
							type="text"
							placeholder="Search"
							on:keydown={search}
						/>
					</div>
				{/if}
			</button>
		</div>
		<div
			class="pointer-events-none absolute left-1/2 top-0 -z-10 mt-[1px] h-full w-full max-w-[1400px] -translate-x-1/2 border-b border-dashed border-neutral-800"
		>
			<Noise colour={isFirefox ? "#222" : "#666"} />
		</div>
	</div>
</div>
