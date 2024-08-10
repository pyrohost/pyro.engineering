<script lang="ts">
	import { titleToSlug } from "$lib/util";
	import clsx from "clsx";
	import PostPreview from "./PostPreview.svelte";

	export let posts: {
		title: string;
		date: Date;
		authors: {
			name: string;
			image: string;
		}[];
		image: string;
	}[];

	const formatDate = (date: Date) => {
		// format the date so its like:
		// "Sep. 8 2024"
		// "Jan. 28 2022"
		const month = date.toLocaleString("default", { month: "short" });
		const day = date.getDate();
		const year = date.getFullYear();
		return `${month}. ${day} ${year}`;
	};
</script>

<div class="h-fit w-full">
	{#each Array.from({ length: Math.ceil(posts.length / 3) }) as _, i (i)}
		{@const bigIndex = i * 3}
		{@const leftSmallIndex = bigIndex + 1}
		{@const rightSmallIndex = bigIndex + 2}
		<div class="h-full w-full">
			{#if posts[bigIndex]}
				{@const post = posts[bigIndex]}
				<PostPreview half={false} large={true} {post} />
			{/if}
			{#if posts[leftSmallIndex] || posts[rightSmallIndex]}
				{@const leftPost = posts[leftSmallIndex]}
				{@const rightPost = posts[rightSmallIndex]}
				<div
					class={clsx("flex", {
						// if we're the last element, don't have border-b border-dashed border-neutral-800
						"border-b border-dashed border-neutral-800":
							i < Math.ceil(posts.length / 3) - 1,
					})}
				>
					{#if leftPost}
						<PostPreview half={!!rightPost} large={false} post={leftPost} />
					{/if}
					{#if rightPost}
						<PostPreview half={true} large={false} post={rightPost} />
					{/if}
				</div>
			{/if}
		</div>
	{/each}
</div>
