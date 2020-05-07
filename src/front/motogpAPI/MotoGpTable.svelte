<script>
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import { onMount } from "svelte";
	import { pop } from "svelte-spa-router";

	let pilots = [];
	let newPilot = {
		country: "",
		pilot: "",
		last_title: "",
		world_title: "",
		victory: "",
		podium: ""
	};

	let exitoMsg="";

	//VARIABLES PARA PAGINACION
	let pag = 0;
	let numero;
	let limit = 10;
	

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
		const res = await fetch("/api/v1/motogp-statistics");

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

			if(res.status==409){
				window.alert("El piloto con ese nombre ya existe");
			}else if(res.status==400){
				window.alert("Como mínimo debe introducir los campos Pais y Piloto");
			}else if(res.status==201){
				exitoMsg = "Piloto creado con éxito";
			}
		});

	}

	async function deletePilot(pilot){
		const res = await fetch("/api/v1/motogp-statistics/" + pilot, {
			method: "DELETE"
		}).then(function (res) {
			getPilots();
			exitoMsg = "Piloto eliminado con éxito";
		});
	}

	async function deleteAllPilots() {
		const res = await fetch("/api/v1/motogp-statistics/", {
			method:"DELETE"
		}).then(function (res) {
			getPilots();
			window.alert("Todos los pilotos borrados con éxito");
		});
	}

	async function loadInitialData() {
		const res = await fetch("/api/v1/motogp-statistics/loadInitialData", {
			method: "GET"
		}).then(function (res) {
			getPilots();
			exitoMsg = "Pilotos iniciales cargados con éxito";

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
			
			if(pilots.length==1){
				exitoMsg = "Se ha encontrado " + pilots.length + " piloto";
			}else{
				exitoMsg = "Se han encontrado " + pilots.length + " pilotos";
			}

		}else if (res.status==404){
			window.alert("No hay pilotos con los parámetros introducidos");
			console.log("ERROR");
		}
	}

	async function paginacion(Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin, num){
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
				}
			}else{
				const res = await fetch("/api/v1/motogp-statistics?country="+Fcountry+"&pilot="+Fpilot+"&from="+Ffrom+"&to="+Fto+"&world_titleMax="+Fworld_titleMax+
				"&world_titleMin="+Fworld_titleMin+"&victoryMax="+FvictoryMax+"&victoryMin="+FvictoryMin+"&podiumMax="+FpodiumMax+"&podiumMin="+FpodiumMin+"&limit="+limit+"&offset="+pag)
				if (res.ok){
					const json = await res.json();
					pilots = json;			
				}
			}
		}else{
			pag = pag+limit;
			const res = await fetch("/api/v1/motogp-statistics?country="+Fcountry+"&pilot="+Fpilot+"&from="+Ffrom+"&to="+Fto+"&world_titleMax="+Fworld_titleMax+
			"&world_titleMin="+Fworld_titleMin+"&victoryMax="+FvictoryMax+"&victoryMin="+FvictoryMin+"&podiumMax="+FpodiumMax+"&podiumMin="+FpodiumMin+"&limit="+limit+"&offset="+pag)
			if (res.ok){
					const json = await res.json();
					pilots = json;					
			}else if(res.status==404){
			window.alert("No hay más pilotos, vuelta a la página anterior");
			}
		}
	}

</script>



<main >
	<div>
		<h2>API MOTOGP</h2>
	</div>

	<div style="text-align:center;padding-bottom: 1%">
		<Button outline color="primary" onclick="location.href='#/'">Inicio</Button>
	</div>
	<div style="text-align:center;padding-bottom: 1%">
		<Button outline color="primary" on:click={loadInitialData}>Cargar Datos Iniciales</Button>
		<Button outline color="danger" on:click={deleteAllPilots} onclick="location.reload()">Borrar Todo</Button>
	</div>
	<Table borderless responsive>
		<tr>
			<td style="padding-bottom: 1%"><strong><label>Pais: <input bind:value="{Fcountry}"></label></strong></td>
			<td><strong><label>Último Titulo (Desde): <input bind:value="{Ffrom}"></label></strong></td>
			<td><strong><label>Mín Nº de Titulos: <input bind:value="{Fworld_titleMin}"></label></strong></td>
			<td><strong><label>Mín Nº de Victorias: <input bind:value="{FvictoryMin}"></label></strong></td>
			<td><strong><label>Mín Nº de Podiums: <input bind:value="{FpodiumMin}"></label></strong></td>
		</tr>
		<tr>
			<td><strong><label>Piloto: <input bind:value="{Fpilot}"></label></strong></td>
			<td><strong><label>Último Titulo (Hasta): <input bind:value="{Fto}"></label></strong></td>
			<td><strong><label>Máx Nº de Titulos: <input bind:value="{Fworld_titleMax}"></label></strong></td>
			<td><strong><label>Máx Nº de Victorias: <input bind:value="{FvictoryMax}"></label></strong></td>
			<td><strong><label>Máx Nº de Podiums: <input bind:value="{FpodiumMax}"></label></strong></td>
		</tr>
	</Table>

	<div style="text-align:center;padding-bottom: 1%">
	<Button outline color="primary" on:click="{busqueda (Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin)}">Buscar</Button>
	</div>
	<div class="table-responsive">
	{#await pilots}
		Loadind pilots...
	{:then pilots}
		<Table class="table table-sm" bordered>
			<thead class="thead-dark">
				<tr>
					<th>Pais</th>
					<th>Piloto</th>
					<th>Último Titulo</th>
					<th>Titulos Mundiales</th>
					<th>Victorias</th>
					<th>Podiums</th>
					<th>Acciones</th>
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
	</div>
		{#if exitoMsg}
			<p style="color: forestgreen;">{exitoMsg}</p>
		{/if}
		{#if pag==0}
			<Button outline color="primary" on:click="{paginacion(Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin, 2)}">&gt;</Button>
		{/if}
		{#if pag>0}
			<Button outline color="primary" on:click="{paginacion(Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin, 1)}">&lt;</Button>
			<Button outline color="primary" on:click="{paginacion(Fcountry, Fpilot, Ffrom, Fto, Fworld_titleMax, Fworld_titleMin, FvictoryMax, FvictoryMin, FpodiumMax, FpodiumMin, 2)}">&gt;</Button>
		{/if}	

</main>


<style>
h2{
	text-align: center;
}
tbody{
	text-align: center;
}
thead{
	text-align: center;
}
main {
	font-family: Georgia, "Times New Roman", Times, serif;
	color: black;
	background-color: #fcfa90
}
</style>
