<script lang="ts">
	export let authors: { name: string; image: string }[];
</script>

<div class="flex items-center">
	{#each authors as author, i}
		<div class="group relative -ml-3 first:ml-0">
			<img
				src={author.image}
				alt={`Avatar of ${author.name}`}
				class="relative h-8 w-8 rounded-full border-2 border-black bg-black object-cover transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110"
				style="z-index: {authors.length - i};"
			/>
			<div
				class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 scale-95 transform opacity-0 transition-all duration-200 group-hover:-translate-y-2 group-hover:scale-100 group-hover:opacity-100"
			>
				<div class="whitespace-nowrap rounded bg-neutral-800 px-2 py-1 text-xs text-white">
					{author.name}
				</div>
				<div
					class="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-neutral-800"
				></div>
			</div>
		</div>
	{/each}
</div>
