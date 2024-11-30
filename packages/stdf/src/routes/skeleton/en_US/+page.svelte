<!-- Skeleton Demo -->
<script lang="ts">
	import { Skeleton } from '$lib/index.js';
</script>

<div class="p-2">
	<div class="m-4 text-lg font-bold">example 1</div>
	<div class="flex">
		<Skeleton width="16" height="16" radius="full" />
		<div class="grow">
			<Skeleton width="32" height="8" />
			<Skeleton type="p" />
		</div>
	</div>

	<div class="m-4 text-lg font-bold">example 2</div>
	<div class="flex justify-between">
		<Skeleton width="16" height="16" />
		<Skeleton width="16" height="16" />
		<Skeleton width="16" height="16" />
		<Skeleton width="16" height="16" />
	</div>
	<Skeleton width="32" height="8" />
	<Skeleton type="p" lines={5} />

	<div class="m-4 text-lg font-bold">example 3</div>
	<div class="flex">
		<Skeleton type="img" width="24" height="24" />
		<div class="grow">
			<Skeleton type="p" />
		</div>
	</div>

	<div class="m-4 text-lg font-bold">example 4</div>
	<div class="flex">
		<div class="grow">
			<Skeleton width="32" height="8" />
			<Skeleton type="p" />
		</div>
		<Skeleton type="video" width="32" height="32" />
	</div>

	<div class="m-4 text-lg font-bold">example 5</div>
	<div class="flex flex-col items-center">
		<Skeleton width="24" height="24" radius="full" />
		<Skeleton width="16" height="6" />
		<Skeleton width="32" height="4" />
		<Skeleton type="qrcode" width="64" height="64" />
	</div>

	<div class="m-4 text-lg font-bold">example 6</div>
	{#each [1, 1, 1] as item}
		<div class="flex items-center justify-between">
			<div class="flex">
				<div class="flex">
					<Skeleton width="12" height="12" radius="full" />
					<div class="flex flex-col justify-between">
						<Skeleton width="16" height="6" />
						<Skeleton width="32" height="4" />
					</div>
				</div>
			</div>
			<Skeleton width="16" height="8" radius="full" />
		</div>
		<Skeleton width="full" height="1" />
	{/each}
</div>
