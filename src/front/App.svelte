<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';
	import Home from './Home.svelte';
	import Integrations from './Integrations.svelte';
	import Analytics from './Analytics.svelte';
	import About from './About.svelte';
	
	//MOTOGP-API
	import MotoGpTable from './motogpAPI/MotoGpTable.svelte';
	import EditPilot from './motogpAPI/EditPilot.svelte';
	import GraphVicPod from './motogpAPI/analytics/analyticsVicPod.svelte';
	import GraphTitMun from './motogpAPI/analytics/titulosMundiales.svelte';
	import GraphExt1 from './motogpAPI/analytics/apiEXT1.svelte';
	import GraphExt2 from './motogpAPI/analytics/apiEXT2.svelte';
	import GraphG1 from './motogpAPI/analytics/apiG1.svelte';
	import GraphG2 from './motogpAPI/analytics/apiG2.svelte';
	import GraphG5 from './motogpAPI/analytics/apiG5.svelte';
	import GraphG7 from './motogpAPI/analytics/apiG7.svelte';
	import GraphG9 from './motogpAPI/analytics/apiG9.svelte';
	import GraphG22 from './motogpAPI/analytics/apiG22.svelte';


	//Electricity-produced-API
	import ElectricityTable from './ElectricityAPI/ElectricityTable.svelte';
	import EditStat from './ElectricityAPI/EditStat.svelte';
	import linearGraph from './ElectricityAPI/graficas/linearGraph.svelte';
	import barChartGraph from './ElectricityAPI/graficas/barCharGraph.svelte';
	import GraphGroup9 from './ElectricityAPI/Integraciones/GraphGroup9.svelte';
	import GraphGroup2 from './ElectricityAPI/Integraciones/GraphGroup2.svelte';
	import GraphGroup23 from './ElectricityAPI/Integraciones/GraphGroup23.svelte';
	import GraphGroup12 from './ElectricityAPI/Integraciones/GraphGroup12.svelte';
	import GraphGroup06 from './ElectricityAPI/Integraciones/GraphGroup06.svelte';
	import GraphGroup24 from './ElectricityAPI/Integraciones/GraphGroup24.svelte';
	import GraphGroup01 from './ElectricityAPI/Integraciones/GraphGroup01.svelte';
	import GraphExtApi1 from './ElectricityAPI/Integraciones/GraphExt1.svelte';
	import GraphExtApi2 from './ElectricityAPI/Integraciones/GraphExt2.svelte';
	//Ucl_stats_api
	import UclTable from './UclAPI/UclTable.svelte';
	import EditTeam from './UclAPI/EditTeam.svelte';
	import GraphTitPais from './UclAPI/graphic/prueba.svelte';
	import GraphTitTemp from './UclAPI/graphic/prueba2.svelte';
	import grupo1 from './UclAPI/graphic/integrationG1.svelte';
	import grupo2 from './UclAPI/graphic/integrationG2.svelte';
	import grupo6 from './UclAPI/graphic/integrationG6.svelte';
	import grupo26 from './UclAPI/graphic/integrationG26.svelte';
	import extBike from './UclAPI/graphic/integrationExtBike.svelte';
	import extCars from './UclAPI/graphic/integrationExtCars.svelte';
	import extEuro from './UclAPI/graphic/integrationExtEuro.svelte';
	
	

	const routes = {
		
		"/": Home,

		"/motogp-statistics": MotoGpTable,
		"/motogp-statistics/:pilot": EditPilot,
		"/motogp-graph/graphHC": GraphVicPod,
		"/motogp-graph/graphAS": GraphTitMun,
		"/motogp-graph/graphExt1": GraphExt1,
		"/motogp-graph/graphExt2": GraphExt2,
		"/motogp-graph/graphG1": GraphG1,
		"/motogp-graph/graphG2": GraphG2,
		"/motogp-graph/graphG5": GraphG5,
		"/motogp-graph/graphG7": GraphG7,
		"/motogp-graph/graphG9": GraphG9,
		"/motogp-graph/graphG22": GraphG22,

		//Angel
		"/electricity-produced-stats" : ElectricityTable,
		"/electricity-produced-stats/:country/:state" : EditStat,
		"/electricity-graph/graph": linearGraph,
		"/electricity-graph/awesomeGraph": barChartGraph,
		"/electricity-graph/graficaGrupo9" : GraphGroup9,
		"/electricity-graph/graficaGrupo2" : GraphGroup2,
		"/electricity-graph/graficaGrupo23" : GraphGroup23,
		"/electricity-graph/graficaGrupo12" : GraphGroup12,
		"/electricity-graph/graficaGrupo06" : GraphGroup06,
		"/electricity-graph/graficaGrupo24" : GraphGroup24,
		"/electricity-graph/graficaGrupo01" : GraphGroup01,
		"/electricity-graph/graficaExt1" : GraphExtApi1,
		"/electricity-graph/graficaExt2" : GraphExtApi2,


		"/ucl_stats/" : UclTable,
		"/ucl_stats/:uclCountry/:uclTeam": EditTeam,
		"/ucl-graphic/graphHC": GraphTitPais,
		"/ucl-graphic/graphAS": GraphTitTemp,
		"/ucl-graphic/grupo2": grupo2,
		"/ucl-graphic/grupo1": grupo1,
		"/ucl-graphic/grupo6": grupo6,
		"/ucl-graphic/grupo26": grupo26,
		"/ucl-graphic/extBike": extBike,
		"/ucl-graphic/extCars": extCars,
		"/ucl-graphic/extEuro": extEuro,



		"/integrations": Integrations,
		"/analytics": Analytics,	
		"/about": About,	
		"*" : NotFound

	};

</script>


<main>
	
	<Router {routes}></Router>
</main>
