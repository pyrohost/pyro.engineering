<script lang="ts">
	import { page } from "$app/stores";
	import ExclamationIcon from "virtual:icons/heroicons-solid/exclamation-triangle";

	let error = $page.error;
	let is404 = error?.message.toLowerCase().includes("not found");
</script>

<div class="mx-auto max-w-4xl px-4 py-8">
	<div class="mb-6 text-4xl font-bold md:text-5xl md:leading-[120%]">
		{#if is404}
			<span class="text-red-500">404</span> Not Found
		{:else}
			<div class="flex w-full flex-row items-center justify-center gap-2">
				<ExclamationIcon class="text-red-500/80"/>
				<p class="ml-2 font-bold text-neutral-500">We've hit a snag.</p>
			</div>
		{/if}
	</div>
	<div class="my-6 border-b border-neutral-700"></div>
	<p class="text-lg">
		{#if is404}
			The page you were looking for could not be found. It might have been removed, renamed,
			or never existed. You can try going back to the previous page or visiting the{" "}
			<a href="/" class="underline duration-200 hover:text-blue-400">home page</a>.
		{:else}
			We've hit a snag and can't show you this page right now. Please try again later. If the
			problem persists, you can try going back to the previous page or visiting the{" "}
			<a href="/" class="underline duration-200 hover:text-blue-400">home page</a>.
		{/if}
	</p>

	{#if !is404}
		<p class="mt-6 text-lg text-neutral-500">
			If you are reporting this issue, please include the following details:
		</p>
		<p class="mt-2 rounded-md bg-neutral-800 p-4 text-neutral-100">
			Target Route: {$page.route.id} <br />
			Error: {error?.message ?? "Unknown Error"} ({$page.status ?? "Unknown Status"}) <br />
			UA: {$page.data?.ua}
		</p>
	{/if}
</div>
