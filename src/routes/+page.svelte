<script lang="ts">
	import opengraphBg from "$lib/assets/opengraph_image__2_.png";
	import ferosBg from "$lib/assets/feros-bg.png";
	import PostsPreview from "$lib/components/landing/PostPreviews.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Pyro Engineering</title>
	<meta
		name="description"
		content="Pyro develops gaming’s most advanced software. We're makers at heart, and this is our story."
	/>
	<meta property="og:title" content="Pyro // Engineering" />
	<meta
		property="og:description"
		content="Pyro develops gaming’s most advanced software. We're makers at heart, and this is our story."
	/>
	<meta property="og:image" content={opengraphBg} />
	<meta property="og:url" content="https://pyro.engineering" />
	<meta property="og:type" content="website" />
	<meta name="theme-color" content="#ff4438" />
</svelte:head>

<div
	style="background-image: url({ferosBg}); background-size: cover; background-position: center;"
	class="hidden h-fit w-full flex-col items-center border-b border-dashed border-neutral-800 px-8 py-7 text-white xl:flex xl:flex-row [&>*]:leading-normal"
>
	<h1
		class="mb-4 w-full flex-shrink-0 flex-grow text-left text-2xl font-bold xl:max-w-[calc(50%-2px)] xl:pr-32 xl:text-3xl"
	>
		Pyro develops gaming’s most advanced software.
	</h1>
	<div class="hidden h-16 w-0.5 flex-shrink-0 bg-white/30 xl:block" />
	<h1
		class="w-full flex-shrink-0 flex-grow text-right text-2xl font-bold xl:max-w-[calc(50%-2px)] xl:pl-32 xl:text-3xl"
	>
		We're makers at heart, and this is our story.
	</h1>
</div>

<PostsPreview posts={data.posts.map((p) => p.metadata)} />
