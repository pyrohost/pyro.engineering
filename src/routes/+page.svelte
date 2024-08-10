<script lang="ts">
	import ferosBg from "$lib/assets/feros-bg.png";
	import PostsPreview from "$lib/components/landing/PostsPreview.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Pyro Engineering</title>
</svelte:head>

<div
	style="background-image: url({ferosBg}); background-size: cover; background-position: center;"
	class="flex h-fit w-full items-center border-b border-dashed border-neutral-800 px-8 py-7 text-white [&>*]:leading-normal"
>
	<h1 class="max-w-[calc(50%-2px)] flex-shrink-0 flex-grow pr-32 text-left text-4xl font-bold">
		Pyro develops gaming’s most advanced software.
	</h1>
	<div class="h-16 w-0.5 flex-shrink-0 bg-white/30" />
	<h1 class="max-w-[calc(50%-2px)] flex-shrink-0 flex-grow pl-32 text-right text-4xl font-bold">
		We're makers at heart, and this is our story.
	</h1>
</div>

<PostsPreview posts={data.posts.map((p) => p.metadata)} />
