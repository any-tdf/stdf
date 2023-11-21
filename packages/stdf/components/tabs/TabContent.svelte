<script>
	/**
	 * 是否显示
	 * whether to show
	 * @type {boolean}
	 * @default true
	 */
	export let show = true;
</script>

<div class:hidden={!show} class="flex-1">
	<slot />
</div>
