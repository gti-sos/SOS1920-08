<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';
	import Home from './Home.svelte';
	
	//MOTOGP-API

	import MotoGpTable from './motogpAPI/MotoGpTable.svelte';
	import EditPilot from './motogpAPI/EditPilot.svelte';
	

	const routes = {
		
		"/": Home,

		"/motogp-statistics": MotoGpTable,
		"/motogp-statistics/:pilot": EditPilot,
		
		"*" : NotFound

	};

</script>


<main>
	
	<Router {routes}></Router>
</main>
