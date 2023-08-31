<script>
	export let show = true; //是否显示
</script>

<div class:hidden={!show} class="flex-1">
	<slot />
</div>
