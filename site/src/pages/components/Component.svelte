<script>
	export let highlightedCode = '';
</script>

<article class={`prose dark:prose-invert max-w-none text-sm`}>
	<pre><code class="hljs">{@html highlightedCode}</code></pre>
</article>
