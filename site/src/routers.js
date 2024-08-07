// @ts-ignore
import Home from './pages/Home.svelte';
// @ts-ignore
import Guide from './pages/guide/Guide.svelte';
// @ts-ignore
import Components from './pages/components/Components.svelte';

const routes = {
	'/': Home,
	'/guide/*': Guide,
	'/guide': Guide,
	'/components': Components,
	'*': Home,
};

export default routes;
