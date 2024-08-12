<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	const convertDate = (date: Date) => {
		// "Thu, August 1, 2024"
		const day = date.toLocaleString("default", { weekday: "short" });
		const month = date.toLocaleString("default", { month: "long" });
		const dayNum = date.getDate();
		const year = date.getFullYear();
		return `${day}, ${month} ${dayNum}, ${year}`;
	};
</script>

<svelte:head>
	<title
		>{data.post
			? `${data.post.metadata.title} // Pyro Engineering`
			: "Not found // Pyro Engineering"}</title
	>
</svelte:head>

<div>
	{#if data.post}
		{@const formattedDate = convertDate(new Date(data.post.metadata.date))}
		<h1 class="w-4/5 px-6 py-4 text-5xl font-bold leading-snug">{data.post.metadata.title}</h1>
		<div class="my-6 mt-4 w-full border-b border-dashed border-neutral-800" />
		<div class="flex items-center gap-6 px-6">
			<time class="font-bold text-neutral-500">{formattedDate}</time>
			<div class="h-4 w-[2px] bg-neutral-700" />
			<div class="flex h-8 items-center gap-2">
				{#if data.post.metadata.authors.length === 1}
					<img
						src={data.post.metadata.authors[0].image}
						alt={data.post.metadata.authors[0].name}
						class="h-6 w-6 rounded-full object-cover"
						width="24"
						height="24"
					/>
					<div
						class="overflow-hidden text-ellipsis whitespace-nowrap border-4 border-black text-neutral-500"
					>
						{data.post.metadata.authors[0].name}
					</div>
				{:else}
					{#each data.post.metadata.authors as author, i}
						<img
							src={author.image}
							alt={author.name}
							title={author.name}
							class="h-8 w-8 rounded-full border-4 border-black bg-black object-cover"
							style="margin-left: {i > 0 ? -22 : 0}px"
							width="24"
							height="24"
						/>
					{/each}
				{/if}
			</div>
		</div>
		<div class="mt-6 w-full border-b border-dashed border-neutral-800" />
		<img src={data.post.metadata.image} alt="Post" class="max-h-96 w-full object-cover p-4" />
		<div class="w-full border-b border-dashed border-neutral-800" />
		<article id="article">
			<svelte:component this={data.post.default} />
		</article>
	{/if}
</div>

<style>
	#article {
		@apply flex flex-col items-center pb-8 pt-4;
	}
	:global(
			#article p,
			#article li,
			#article h1,
			#article h2,
			#article h3,
			#article h4,
			#article h5,
			#article h6,
			#article ol,
			#article ul,
			#article table,
			#article pre
		) {
		@apply w-full max-w-[800px] px-4 py-2 leading-loose;
	}

	:global(#article table) {
		@apply border border-dashed border-neutral-800 bg-neutral-950;
		background-image: url("$lib/assets/noise.png");
		background-size: 100%;
		background-repeat: repeat;
	}

	:global(#article th, #article td) {
		@apply border border-dashed border-neutral-800 px-4 py-2;
	}

	:global(#article p) {
		@apply tracking-tight;
	}

	:global(#article hr) {
		@apply my-2 w-full max-w-[768px] border-t border-dashed border-neutral-800 bg-neutral-950;
	}

	:global(#article h1) {
		@apply my-2 text-2xl font-bold text-neutral-400;
	}

	:global(#article h2, #article h3, #article h4, #article h5, #article h6) {
		@apply my-2 font-bold text-neutral-400;
	}

	:global(#article ol) {
		@apply list-inside list-decimal;
	}

	:global(#article li) {
		@apply marker:text-white/35;
	}

	:global(#article .task-list-item) {
		@apply flex items-center gap-3;
	}

	:global(#article .task-list-item input) {
		@apply relative h-4 w-4 appearance-none border border-neutral-700 bg-black checked:bg-neutral-300;
	}

	:global(#article .task-list-item input:checked:before) {
		@apply absolute left-0 top-0 h-[5px] w-0.5 bg-neutral-800 content-[""];
		transform: translate(2.5px, 7px) rotate(-45deg);
	}

	:global(#article .task-list-item input:checked:after) {
		@apply absolute left-0 top-0 h-1 w-0.5 bg-neutral-800 content-[""];
		transform: translate(7px, 5px) rotate(45deg) scaleY(3);
	}

	:global(#article ol, #article ul) {
		@apply my-2 border border-dashed border-neutral-800 bg-neutral-950 px-2;
		background-image: url("$lib/assets/noise.png");
		background-size: 100%;
		background-repeat: repeat;
	}
</style>
