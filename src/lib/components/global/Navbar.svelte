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
			<a href="https://pyro.host">
				<svg
					class="size-8"
					width="512"
					height="512"
					viewBox="0 0 512 512"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M214.015 391.852C214.015 384.205 214.015 380.38 214.655 377.201C217.286 364.142 227.626 353.935 240.852 351.338C244.074 350.705 247.947 350.705 255.694 350.705C263.441 350.705 267.314 350.705 270.534 351.338C283.762 353.935 294.102 364.142 296.732 377.201C297.373 380.38 297.373 384.205 297.373 391.852V405.568C297.373 415.822 297.373 420.95 295.139 424.769C293.676 427.272 291.571 429.349 289.037 430.794C285.168 432.999 279.975 432.999 269.586 432.999H241.801C231.413 432.999 226.219 432.999 222.351 430.794C219.816 429.349 217.712 427.272 216.248 424.769C214.015 420.95 214.015 415.822 214.015 405.568V391.852Z"
						fill="white"
					/>
					<path
						d="M151.57 432.999H180.132C183.366 432.999 184.983 432.999 185.817 431.984C186.651 430.97 186.302 429.333 185.603 426.06C158.099 297.217 285.284 326.182 303.698 237.038C313.096 191.542 286.344 130.476 287.924 88.0451C288.121 82.7268 288.22 80.0677 286.764 79.2435C285.307 78.4193 283.203 79.7417 278.995 82.3863C219.545 119.744 176.221 191.157 192.054 234.972C194.475 241.671 195.685 245.019 194.154 246.242C192.624 247.466 190.034 245.888 184.854 242.735C176.431 237.609 166.422 229.215 159.463 215.99C157.422 212.11 156.401 210.17 154.903 210.024C153.405 209.877 152.119 211.459 149.545 214.621C74.7421 306.535 105.055 398.323 148.258 431.894C148.948 432.429 149.292 432.698 149.734 432.849C150.176 432.999 150.641 432.999 151.57 432.999Z"
						fill="white"
					/>
					<path
						d="M337.915 224.025C341.744 266.252 316.007 295.136 286.61 315.144C281.477 318.637 278.911 320.384 279.133 322.047C279.355 323.711 282.422 324.789 288.556 326.944C327.753 340.716 329.534 380.192 326.288 427.099C326.097 429.872 326 431.259 326.825 432.129C327.648 433 329.049 433 331.849 433H356.333C357.075 433 357.446 433 357.805 432.903C358.165 432.806 358.483 432.621 359.12 432.25C446.892 381.14 399.768 259.05 346.221 218.749C342.318 215.811 340.366 214.343 338.779 215.207C337.194 216.072 337.434 218.723 337.915 224.025Z"
						fill="white"
					/>
				</svg>
			</a>
			<a class="flex cursor-pointer" href="/">
				<svg class="opacity-50" height="32" role="separator" viewBox="0 0 32 32" width="32">
					<path
						d="M22 5L9 28"
						stroke="white"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
					</path>
				</svg>
				<svg
					class="size-8"
					width="512"
					height="512"
					viewBox="0 0 512 512"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M223.402 353.8H419.002V419H223.402V353.8Z" fill="white" />
					<path
						d="M125.6 419C143.604 419 158.2 404.404 158.2 386.4C158.2 368.395 143.604 353.8 125.6 353.8C107.596 353.8 93 368.395 93 386.4C93 404.404 107.596 419 125.6 419Z"
						fill="white"
					/>
					<path
						d="M386.403 288.6C404.407 288.6 419.003 274.004 419.003 256C419.003 237.995 404.407 223.4 386.403 223.4C368.398 223.4 353.803 237.995 353.803 256C353.803 274.004 368.398 288.6 386.403 288.6Z"
						fill="white"
					/>
					<path d="M288.6 288.6H92.9997V223.4L288.6 223.4V288.6Z" fill="white" />
					<path d="M223.402 93H419.002V158.2H223.402V93Z" fill="white" />
					<path
						d="M125.6 158.2C143.604 158.2 158.2 143.604 158.2 125.6C158.2 107.596 143.604 93 125.6 93C107.596 93 93 107.596 93 125.6C93 143.604 107.596 158.2 125.6 158.2Z"
						fill="white"
					/>
				</svg>
				<div class="hidden items-center sm:flex">
					<div class="-mt-0.5 ml-4 select-none text-lg font-bold text-white">
						Engineering
					</div>
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
