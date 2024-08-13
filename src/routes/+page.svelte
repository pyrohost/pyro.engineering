<script lang="ts">
	import ferosBg from "$lib/assets/feros-bg.png";
	import PostsPreview from "$lib/components/landing/PostPreviews.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Pyro Engineering</title>
</svelte:head>

<div
	style="background-image: url({ferosBg}); background-size: cover; background-position: center;"
	class="hidden xl:flex flex-col xl:flex-row h-fit w-full items-center border-b border-dashed border-neutral-800 px-8 py-7 text-white [&>*]:leading-normal"
>
	<h1 class="w-full xl:max-w-[calc(50%-2px)] flex-shrink-0 flex-grow xl:pr-32 text-left text-2xl xl:text-3xl font-bold mb-4">
		Pyro develops gaming’s most advanced software.
	</h1>
	<div class="hidden xl:block h-16 w-0.5 flex-shrink-0 bg-white/30" />
	<h1 class="w-full xl:max-w-[calc(50%-2px)] flex-shrink-0 flex-grow xl:pl-32 text-right text-2xl xl:text-3xl font-bold">
		We're makers at heart, and this is our story.
	</h1>
</div>

<PostsPreview posts={data.posts.map((p) => p.metadata)} />
