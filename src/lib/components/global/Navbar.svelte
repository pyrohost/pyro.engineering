<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { transition } from "$lib/constants";
	import { searchValue } from "$lib/store";
	import { onMount, tick } from "svelte";
	import RSSIcon from "virtual:icons/heroicons-solid/rss";
	import SearchIcon from "virtual:icons/heroicons-solid/search";
	import LogoWordmark from "../logos/LogoWordmark.svelte";
	import Noise from "../util/Noise.svelte";

	let searchOpen = $page.url.pathname.startsWith("/search/");
	let searchBtn: HTMLButtonElement;
	let searchInput: HTMLInputElement;

	const DURATION = 400;
	const TRANSITION = transition;

	$: if (!searchOpen) {
		clearSearch();
	}

	function clearSearch() {
		setTimeout(() => {
			$searchValue = "";
		}, 100);
	}

	function openSearch() {
		searchOpen = true;
		focusSearchInput();
	}

	async function focusSearchInput() {
		await tick();
		searchInput?.focus();
	}

	function closeSearch() {
		if ($searchValue.trim()) return;
		searchOpen = false;
	}

	async function handleSearch(e: KeyboardEvent) {
		if (e.key !== "Enter") return;

		await tick();
		const searchQuery = $searchValue.trim();
		const path = searchQuery ? `/search/${searchQuery}` : "/";

		goto(path, { keepFocus: true });
	}

	onMount(() => {
		if (searchOpen) {
			focusSearchInput();
		}
	});

	$: transitionStyle = `transition: all ${DURATION}ms ${TRANSITION};`;
</script>

<nav
	class="fixed z-50 flex h-24 w-screen items-center justify-center bg-black/75 px-8 backdrop-blur-lg"
>
	<div class="flex h-full w-full max-w-[1400px] items-center justify-center px-4">
		<div class="flex flex-grow items-center">
			<a class="flex cursor-pointer" href="/">
				<div class="mr-3.5 h-8">
					<LogoWordmark />
				</div>
				<div class="hidden items-center sm:flex">
					<div class="h-4 w-0.5 bg-white/75" />
					<div class="-mt-0.5 ml-4 select-none text-lg text-white">Engineering</div>
				</div>
			</a>
		</div>
		<div class="flex flex-shrink-0 items-center gap-6">
			<a
				class="btn !h-10 !w-10 !min-w-0 !px-0"
				href="/rss.xml"
				target="_blank"
				rel="noopener noreferrer"
			>
				<RSSIcon width="20" />
			</a>
			<button
				class="relative h-10 {searchOpen
					? 'w-72 cursor-default hover:!bg-[#191919] active:!bg-[#191919]'
					: 'w-28'}"
				style={transitionStyle}
				bind:this={searchBtn}
				on:click={openSearch}
			>
				<div
					class="absolute left-0 top-0 flex h-full w-full items-center justify-center {searchOpen
						? 'pointer-events-auto opacity-0'
						: 'pointer-events-none opacity-100'}"
					style={transitionStyle}
				>
					<SearchIcon class="mr-2" width="20" />
					<span class="text-sm">Search</span>
				</div>
				{#if browser}
					<div
						class="absolute top-0 flex h-full w-full items-center justify-center {searchOpen
							? 'pointer-events-auto opacity-100'
							: 'pointer-events-none opacity-0'}"
						style={transitionStyle}
					>
						<button
							tabindex={searchOpen ? 0 : -1}
							class="absolute right-4 h-fit w-fit min-w-0 border-none !bg-transparent p-0 text-black"
							on:click={closeSearch}
						>
							<SearchIcon width="20" class="text-white/50" />
						</button>
						<input
							bind:value={$searchValue}
							bind:this={searchInput}
							tabindex={searchOpen ? 0 : -1}
							on:blur={closeSearch}
							class="h-full w-full border-none bg-[#191919] px-4 pr-10 text-sm text-white outline-none selection:bg-black selection:text-white"
							type="text"
							placeholder="Search"
							on:keydown={handleSearch}
						/>
					</div>
				{/if}
			</button>
		</div>
		<div
			class="pointer-events-none absolute left-1/2 top-0 -z-10 mt-[1px] h-full w-full max-w-[1400px] -translate-x-1/2 border-b border-dashed border-neutral-800"
		>
			<Noise colour="#666" />
		</div>
	</div>
</nav>
