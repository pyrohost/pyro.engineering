<script lang="ts">
	import { titleToSlug as toSlug } from "$lib/util";
	import clsx from "clsx";
	import AuthorAvatars from "../AuthorAvatars.svelte";

	export let post: {
		title: string;
		date: Date;
		authors: {
			name: string;
			image: string;
		}[];
		image: string;
	};

	export let half: boolean;
	export let large: boolean;

	$: formattedDate = formatDate(post.date);

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

<div
	class={clsx("border-dashed border-neutral-800", {
		"w-full": !half || large,
		"flex-col": large,
		"w-1/2": !large && !half,
		"flex w-1/2 flex-1 gap-8 border-r p-14": !large,
		"flex h-fit gap-6 border-b p-8": large,
	})}
>
	<img
		src={post.image}
		alt="Post"
		class={clsx("object-cover", {
			"h-[500px] w-full": large,
			"max-h-48 w-1/2": !large,
		})}
	/>
	<div
		class={clsx({
			"flex w-1/2 items-center": !large,
			"w-full": large,
		})}
	>
		<div
			class={clsx("flex h-full w-full flex-col gap-6", {
				"justify-center": !large,
			})}
		>
			<a
				href="/posts/{toSlug(post.title)}"
				class={clsx("font-bold hover:underline", {
					"w-1/2 text-4xl leading-tight": large,
					"text-2xl": !large,
				})}>{post.title}</a
			>
			<div class="flex items-center gap-6">
				<div class="flex items-center gap-2">
					{#if post.authors.length === 1}
						<!-- "/authors/{toSlug(post.authors[0].name)}" -->
						<a href={"##"} class="flex items-center gap-3 [&:hover>div]:underline">
							<img
								src={post.authors[0].image}
								alt={post.authors[0].name}
								class="h-6 w-6 rounded-full object-cover"
							/>
							<div
								class="overflow-hidden text-ellipsis whitespace-nowrap text-neutral-500"
							>
								{post.authors[0].name}
							</div>
						</a>
					{:else}
						<AuthorAvatars authors={post.authors} />
					{/if}
				</div>
				<div class="h-5 w-[1px] bg-neutral-500" />
				<div class="whitespace-nowrap uppercase text-neutral-500">
					{formattedDate}
				</div>
			</div>
		</div>
	</div>
</div>
