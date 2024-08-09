<script lang="ts">
	import { searchValue } from "$lib/store";
	import type { PageData } from "./$types";

	export let data: PageData;

	$searchValue = data.query;
</script>

<div class="px-8 pt-28">
	<h1 class="text-4xl font-bold">
		{data.query}
	</h1>
</div>
