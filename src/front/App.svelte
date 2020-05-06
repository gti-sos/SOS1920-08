<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';
	import Home from './Home.svelte';
	
	//MOTOGP-API

	import MotoGpTable from './motogpAPI/MotoGpTable.svelte';
	import EditPilot from './motogpAPI/EditPilot.svelte';

	//Electricity-produced-API
	import ElectricityTable from './ElectricityAPI/ElectricityTable.svelte';
	import EditStat from './ElectricityAPI/EditStat.svelte';
	

	const routes = {
		
		"/": Home,

		"/motogp-statistics": MotoGpTable,
		"/motogp-statistics/:pilot": EditPilot,
		"/electricity-produced-stats" : ElectricityTable,
		"/electricity-produced-stats/:country/:state" : EditStat,
		
		"*" : NotFound

	};

</script>


<main>
	
	<Router {routes}></Router>
</main>
