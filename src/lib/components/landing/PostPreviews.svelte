<script lang="ts">
	import clsx from "clsx";
	import PostPreview from "./PostPreview.svelte";
	import ExclamationIcon from "virtual:icons/heroicons-solid/exclamation-triangle";

	export let posts: {
		title: string;
		date: Date;
		authors: {
			name: string;
			image: string;
		}[];
		image: string;
	}[];
</script>

<div class="h-fit w-full">
	{#if posts.length > 0}
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
	{:else}
		<div class="flex h-[50vh] w-full flex-col items-center justify-center gap-3">
			<ExclamationIcon class="text-4xl text-neutral-500/80" />
			<p class="ml-2 font-bold text-neutral-500">...nobody's posted yet. Check back later!</p>
		</div>
	{/if}
</div>
