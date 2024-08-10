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
						alt="Poster"
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
							alt="Poster"
							class="h-8 w-8 rounded-full border-4 border-black object-cover"
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
		@apply flex flex-col items-center pb-6 pt-2;
	}
	:global(#article *:not(hr)) {
		@apply w-full max-w-[800px] px-4 py-2 leading-loose;
	}

	:global(#article p) {
		@apply tracking-tight;
	}

	:global(#article hr) {
		@apply w-full border-t border-dashed border-neutral-800;
	}

	:global(#article h1, #article h2, #article h3, #article h4, #article h5, #article h6) {
		@apply my-2 text-2xl font-bold text-neutral-400;
	}
</style>
