<script>
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { onMount } from "svelte";

	let pilots = [];
	let newPilot = {
		country: "",
		pilot: "",
		last_title: "",
		world_title: "",
		victory: "",
		podium: ""
	};

	//VARIABLES PARA PAGINACION
	let pag = 0;
	let numero;
	let limit = 4;
	

	//VARIABLES PARA BUSQUEDA
	let Fcountry = "";
	let Fpilot = "";
	let Flast_title = "";
	let Ffrom = "";
	let Fto = "";
	let Fworld_titleMin = "";
	let Fworld_titleMax = "";
	let FvictoryMin = "";
	let FvictoryMax = "";
	let FpodiumMin = "";
	let FpodiumMax = "";




	onMount(getPilots);

	async function getPilots(){
		console.log("Fetching pilots....");
		const res = await fetch("/api/v1/motogp-statistics?offset="+pag+"&limit="+limit);

		if(res.ok){
			console.log("Ok:");
			const json = await res.json();
			pilots = json;
			console.log("Received "+pilots.length+" pilots.");
		}else{
			console.log("ERROR");
		}
	}

	async function insertPilot(){
		console.log("Inserting pilots....");
		const res = await fetch("/api/v1/motogp-statistics",{
			method: "POST",
			body: JSON.stringify(newPilot),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
			getPilots();
		});

	}

	async function deletePilot(pilot){
		const res = await fetch("/api/v1/motogp-statistics/" + pilot, {
			method: "DELETE"
		}).then(function (res) {
			getPilots();
		});
	}

	async function deleteAllPilots() {
		const res = await fetch("/api/v1/motogp-statistics", {
			method:"DELETE"
		}).then(function (res) {
			getPilots();
		});
	}

	async function loadInitialData() {
		const res = await fetch("/api/v1/motogp-statistics/loadInitialData", {
			method: "GET"
		}).then(function (res) {
			getPilots();
		});
	}

	async function busqueda (Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin){
		if(typeof Fcountry=='undefined'){
			Fcountry="";
		}
		if(typeof Fpilot=='undefined'){
			Fpilot="";
		}
		if(typeof Ffrom=='undefined'){
			Ffrom="";
		}
		if(typeof Fto=='undefined'){
			Fto="";
		}
		if(typeof Fworld_titleMax=='undefined'){
			Fworld_titleMax="";
		}
		if(typeof Fworld_titleMin=='undefined'){
			Fworld_titleMin="";
		}
		if(typeof FvictoryMax=='undefined'){
			FvictoryMax="";
		}
		if(typeof FvictoryMin=='undefined'){
			FvictoryMin="";
		}
		if(typeof FpodiumMax=='undefined'){
			FpodiumMax="";
		}
		if(typeof FpodiumMin=='undefined'){
			FpodiumMin="";
		}
		const res = await fetch("/api/v1/motogp-statistics?country="+Fcountry+"&pilot="+Fpilot+"&from="+Ffrom+"&to="+Fto+"&world_titleMax="+Fworld_titleMax+
		"&world_titleMin="+Fworld_titleMin+"&victoryMax="+FvictoryMax+"&victoryMin="+FvictoryMin+"&podiumMax="+FpodiumMax+"&podiumMin="+FpodiumMin)

		if (res.ok){
			const json = await res.json();
			pilots = json;
			console.log("Found "+ pilots.length + "pilots");

		}else{
			console.log("ERROR");
		}
	}

	async function paginacion(Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin, num){
		numero = num;
		if(typeof Fcountry=='undefined'){
			Fcountry="";
		}
		if(typeof Fpilot=='undefined'){
			Fpilot="";
		}
		if(typeof Ffrom=='undefined'){
			Ffrom="";
		}
		if(typeof Fto=='undefined'){
			Fto="";
		}
		if(typeof Fworld_titleMax=='undefined'){
			Fworld_titleMax="";
		}
		if(typeof Fworld_titleMin=='undefined'){
			Fworld_titleMin="";
		}
		if(typeof FvictoryMax=='undefined'){
			FvictoryMax="";
		}
		if(typeof FvictoryMin=='undefined'){
			FvictoryMin="";
		}
		if(typeof FpodiumMax=='undefined'){
			FpodiumMax="";
		}
		if(typeof FpodiumMin=='undefined'){
			FpodiumMin="";
		}
		if(num==1){
			pag=pag-limit;
			if(pag<0){
				pag=0;
				const res = await fetch("/api/v1/motogp-statistics?country="+Fcountry+"&pilot="+Fpilot+"&from="+Ffrom+"&to="+Fto+"&world_titleMax="+Fworld_titleMax+
				"&world_titleMin="+Fworld_titleMin+"&victoryMax="+FvictoryMax+"&victoryMin="+FvictoryMin+"&podiumMax="+FpodiumMax+"&podiumMin="+FpodiumMin+"&limit="+limit+"&offset="+pag)
				if (res.ok){
					const json = await res.json();
					pilots = json;
					numero=num;
					
				}
			}else{
				const res = await fetch("/api/v1/motogp-statistics?country="+Fcountry+"&pilot="+Fpilot+"&from="+Ffrom+"&to="+Fto+"&world_titleMax="+Fworld_titleMax+
				"&world_titleMin="+Fworld_titleMin+"&victoryMax="+FvictoryMax+"&victoryMin="+FvictoryMin+"&podiumMax="+FpodiumMax+"&podiumMin="+FpodiumMin+"&limit="+limit+"&offset="+pag)
				if (res.ok){
					const json = await res.json();
					pilots = json;
					numero=num;
					
				}
			}
		}else{
			pag = pag+limit;
			const res = await fetch("/api/v1/motogp-statistics?country="+Fcountry+"&pilot="+Fpilot+"&from="+Ffrom+"&to="+Fto+"&world_titleMax="+Fworld_titleMax+
			"&world_titleMin="+Fworld_titleMin+"&victoryMax="+FvictoryMax+"&victoryMin="+FvictoryMin+"&podiumMax="+FpodiumMax+"&podiumMin="+FpodiumMin+"&limit="+limit+"&offset="+pag)
			if (res.ok){
					const json = await res.json();
					pilots = json;
					numero=num;
					
			}
		}
	}

</script>



<main>
	<div>
		<h3>API MOTOGP</h3>
	</div>

	<div>
		<Button outline color="primary" on:click={loadInitialData}>Cargar Datos Iniciales</Button>
		<Button outline color="danger" on:click={deleteAllPilots}>Borrar Todo</Button>
	</div>
	<tr>
		<td><label>Pais: <input bind:value="{Fcountry}"></label></td>
		<td><label>Último Titulo (Desde): <input bind:value="{Ffrom}"></label></td>
		<td><label>Mín Nº de Titulos: <input bind:value="{Fworld_titleMin}"></label></td>
		<td><label>Mín Nº de Victorias: <input bind:value="{FvictoryMin}"></label></td>
		<td><label>Mín Nº de Podiums: <input bind:value="{FpodiumMin}"></label></td>
	</tr>
	<tr>
		<td><label>Piloto: <input bind:value="{Fpilot}"></label></td>
		<td><label>Último Titulo (Hasta): <input bind:value="{Fto}"></label></td>
		<td><label>Máx Nº de Titulos: <input bind:value="{Fworld_titleMax}"></label></td>
		<td><label>Máx Nº de Victorias: <input bind:value="{FvictoryMax}"></label></td>
		<td><label>Máx Nº de Podiums: <input bind:value="{FpodiumMax}"></label></td>
	</tr>

	<Button outline color="primary" on:click="{busqueda (Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin)}">Buscar</Button>

	
	{#await pilots}
		Loadind pilots...
	{:then pilots}
		<Table bordered>
			<thead>
				<tr>
					<th>Country</th>
					<th>Pilot</th>
					<th>Last Title</th>
					<th>World Title</th>
					<th>Victory</th>
					<th>Podium</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value="{newPilot.country}"></td>
					<td><input bind:value="{newPilot.pilot}"></td>
					<td><input bind:value="{newPilot.last_title}"></td>
					<td><input bind:value="{newPilot.world_title}"></td>
					<td><input bind:value="{newPilot.victory}"></td>
					<td><input bind:value="{newPilot.podium}"></td>
					<td><Button outline color="primary" on:click={insertPilot}>Insertar</Button></td>
				</tr>

				{#each pilots as pilot}
					<tr>
						
						<td>{pilot.country}</td>
						<td>
							<a href="#/motogp-statistics/{pilot.pilot}">{pilot.pilot}</a>
						</td>
						<td>{pilot.last_title}</td>
						<td>{pilot.world_title}</td>
						<td>{pilot.victory}</td>
						<td>{pilot.podium}</td>
						<td><Button outline color="danger" on:click="{deletePilot(pilot.pilot)}">Borrar</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	{#if pag==0}
		<Button outline color="primary" on:click="{paginacion(Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin, 2)}">&gt;</Button>
	{/if}
	{#if pag>0}
		<Button outline color="primary" on:click="{paginacion(Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin, 1)}">&lt;</Button>
		<Button outline color="primary" on:click="{paginacion(Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin, 2)}">&gt;</Button>
	{/if}
		

</main>
