<script lang="ts">
	let { highlightedCode = '' } = $props();
</script>

<article class={`prose max-w-none text-sm dark:prose-invert`}>
	<pre><code class="hljs">{@html highlightedCode}</code></pre>
</article>
