<script lang="ts">
	import PostPreview from "$lib/components/landing/PostPreview.svelte";
	import { searchValue } from "$lib/store";
	import clsx from "clsx";
	import type { PageData } from "./$types";

	export let data: PageData;

	$searchValue = data.query || "";
</script>

<h1 class="p-4 px-6 text-4xl font-bold">
	{data.query || "All posts"} ({data.posts.length})
</h1>

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
