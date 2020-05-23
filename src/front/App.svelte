<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';
	import Home from './Home.svelte';
	import Integrations from './Integrations.svelte';
	import About from './About.svelte';
	
	//MOTOGP-API

	import MotoGpTable from './motogpAPI/MotoGpTable.svelte';
	import EditPilot from './motogpAPI/EditPilot.svelte';
	import GraphVicPod from './motogpAPI/analytics/analyticsVicPod.svelte';

	//Electricity-produced-API
	import ElectricityTable from './ElectricityAPI/ElectricityTable.svelte';
	import EditStat from './ElectricityAPI/EditStat.svelte';
	import linearGraph from './ElectricityAPI/graficas/linearGraph.svelte';

	//Ucl_stats_api
	import UclTable from './UclAPI/UclTable.svelte';
	import EditTeam from './UclAPI/EditTeam.svelte';
	import advanceSearch from './UclAPI/advanceSearch.svelte';
	

	const routes = {
		
		"/": Home,

		"/motogp-statistics": MotoGpTable,
		"/motogp-statistics/:pilot": EditPilot,
		"/motogp-graph/graph": GraphVicPod,

		"/electricity-produced-stats" : ElectricityTable,
		"/electricity-produced-stats/:country/:state" : EditStat,
		"/electricity-graph/graph": linearGraph,


		"/ucl_stats/" : UclTable,
		"/ucl_stats/:uclCountry/:uclTeam": EditTeam,


		"/integrations": Integrations,	
		"/about": About,	
		"*" : NotFound

	};

</script>


<main>
	
	<Router {routes}></Router>
</main>
