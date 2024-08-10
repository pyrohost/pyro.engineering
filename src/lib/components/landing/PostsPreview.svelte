<script lang="ts">
	import { titleToSlug } from "$lib/util";
	import clsx from "clsx";

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
				{@const formattedDate = formatDate(post.date)}
				<div
					class="flex h-fit w-full flex-col gap-6 border-b border-dashed border-neutral-800 p-8"
				>
					<img src={post.image} alt="Post" class="h-[300px] w-full object-cover" />
					<a
						href="/posts/{titleToSlug(post.title)}"
						class="w-1/2 text-4xl font-bold leading-tight hover:underline"
						>{post.title}</a
					>
					<div class="flex items-center gap-6">
						<div class="flex items-center gap-2">
							{#if post.authors.length === 1}
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
							{:else}
								{#each post.authors as author, i}
									<img
										src={author.image}
										alt={author.name}
										title={author.name}
										class="h-8 w-8 rounded-full border-4 border-black object-cover"
										style="margin-left: {i > 0 ? -22 : 0}px"
									/>
								{/each}
							{/if}
						</div>
						<div class="h-5 w-[1px] bg-neutral-500" />
						<div class="whitespace-nowrap uppercase text-neutral-500">
							{formattedDate}
						</div>
					</div>
				</div>
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
						{@const formattedDate = formatDate(leftPost.date)}
						<div
							class={clsx(
								{
									"w-full": !!!rightPost,
									"w-1/2 border-r border-dashed border-neutral-800": !!rightPost,
								},
								"flex flex-1 gap-8 p-14",
							)}
						>
							<img src={leftPost.image} alt="Post" class="w-1/2 object-cover" />
							<div class="flex h-full w-1/2 flex-col justify-center gap-6">
								<a
									href="/posts/{titleToSlug(leftPost.title)}"
									class="text-2xl font-bold hover:underline">{leftPost.title}</a
								>
								<div class="flex items-center gap-6">
									<div class="flex items-center gap-2">
										{#if leftPost.authors.length === 1}
											<img
												src={leftPost.authors[0].image}
												alt={leftPost.authors[0].name}
												class="h-6 w-6 rounded-full object-cover"
											/>
											<div
												class="overflow-hidden text-ellipsis whitespace-nowrap text-neutral-500"
											>
												{leftPost.authors[0].name}
											</div>
										{:else}
											{#each leftPost.authors as author, i}
												<img
													src={author.image}
													alt={author.name}
													title={author.name}
													class="h-8 w-8 rounded-full border-4 border-black object-cover"
													style="margin-left: {i > 0 ? -22 : 0}px"
												/>
											{/each}
										{/if}
									</div>
									<div class="h-5 w-[1px] bg-neutral-500" />
									<div class="whitespace-nowrap uppercase text-neutral-500">
										{formattedDate}
									</div>
								</div>
							</div>
						</div>
					{/if}
					{#if rightPost}
						{@const formattedDate = formatDate(rightPost.date)}
						<div class="flex w-1/2 flex-1 gap-8 p-14">
							<img src={rightPost.image} alt="Post" class="w-1/2 object-cover" />
							<div class="flex h-full w-1/2 flex-col justify-center gap-6">
								<a
									href="/posts/{titleToSlug(rightPost.title)}"
									class="text-2xl font-bold hover:underline">{rightPost.title}</a
								>
								<div class="flex items-center gap-6">
									<div class="flex items-center gap-2">
										{#if rightPost.authors.length === 1}
											<img
												src={rightPost.authors[0].image}
												alt={rightPost.authors[0].name}
												class="h-6 w-6 rounded-full object-cover"
											/>
											<div
												class="overflow-hidden text-ellipsis whitespace-nowrap text-neutral-500"
											>
												{rightPost.authors[0].name}
											</div>
										{:else}
											{#each rightPost.authors as author, i}
												<img
													src={author.image}
													alt={author.name}
													title={author.name}
													class="h-8 w-8 rounded-full border-4 border-black object-cover"
													style="margin-left: {i > 0 ? -22 : 0}px"
												/>
											{/each}
										{/if}
									</div>
									<div
										class="h-5 w-[1px] overflow-hidden text-ellipsis whitespace-nowrap bg-neutral-500"
									/>
									<div class="whitespace-nowrap uppercase text-neutral-500">
										{formattedDate}
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	{/each}
</div>
