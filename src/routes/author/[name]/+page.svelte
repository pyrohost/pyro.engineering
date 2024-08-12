<script lang="ts">
	import clsx from "clsx";
	import type { PageData } from "./$types";
	import PostPreview from "$lib/components/landing/PostPreview.svelte";
	import ExclamationIcon from "virtual:icons/heroicons-solid/exclamation-triangle";

	export let data: PageData;
</script>

{#if data.posts.length > 0 && data.realAuthorName}
	<h1 class="p-4 px-6 text-4xl font-bold">
		Posts by {data.realAuthorName} ({data.posts.length})
	</h1>
{:else}
	<div class="flex h-[50vh] w-full flex-col items-center justify-center gap-3">
		<ExclamationIcon class="text-4xl text-neutral-500/80" />
		<p class="ml-2 font-bold text-neutral-500">
			...no posts found from "{data.providedName}". Check back later!
		</p>
	</div>
{/if}

{#each data.posts as post, i}
	<div
		class={clsx("w-full border-dashed border-neutral-800", {
			"border-b": i !== data.posts.length - 1,
			"border-t": i === 0,
		})}
	>
		<PostPreview half={false} large={false} post={post.metadata} />
	</div>
{/each}
