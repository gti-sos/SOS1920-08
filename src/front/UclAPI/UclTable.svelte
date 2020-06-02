<script>
	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let ucls = [];
	let newUcl = {
		country: "",
		team: "",
		last_title: "",
		title: "",
		season: "",
		match: "",
		victory: ""
	};

	let pag = 0;
	let numero;
	let limit = 10;

	let country_S = "";
	let team_S = "";
	let last_title_S = "";
	let from_S, to_S = "";
	let title_max_S = "";
	let title_min_S = "";
	let season_max_S = "";
	let season_min_S = "";
	let match_max_S = "";
	let match_min_S = "";
	let victory_max_S = "";
	let victory_min_S = "";

	let exitoMsg = "";

	onMount(getUcls);
	async function loadInitialData() {
		console.log("Cargando datos...");
		const res = await fetch("/api/v1/ucl_stats/loadInitialData", {
			method: "GET"
		}).then(function (res) {
			getUcls();
		});
	}


	async function getUcls() {
		console.log("Recogiendo datos...");
		const res = await fetch("/api/v1/ucl_stats?offset=" + pag + "&limit=" + limit);
		if (res.ok) {
			console.log("OK:");
			const json = await res.json();
			ucls = json;
			console.log("Received " + ucls.length + " ucl_stats.");
		} else {
			console.log("ERROR!");
		}
	}


	async function insertUcl() {
		console.log("Insertando datos..." + JSON.stringify(newUcl));
		const res = await fetch("/api/v1/ucl_stats", {
			method: "POST",
			body: JSON.stringify(newUcl),
			headers: {
				"Content-Type": "application/json"
			}

		}).then(function (res) {
			getUcls();
		});
	}

	async function deleteTeam(team) {
		const res = await fetch("/api/v1/ucl_stats/" + team, {
			method: "DELETE",
		}).then(function (res) {
			getUcls();
			window.alert("Dato borrado con exito");
		});
	}

	async function deleteTeams() {
		const res = await fetch("/api/v1/ucl_stats/", {
			method: "DELETE",
		}).then(function (res) {
			getUcls();
			window.alert("Datos borrados con exito");
		});
	}

	async function paginacion(country_S, team_S, last_title_S, title_min_S, title_max_S, season_min_S, season_max_S, match_min_S, match_max_S, victory_min_S, victory_max_S, num) {
		numero = num;
		if (typeof country_S == 'undefined') {
			country_S = "";
		}
		if (typeof team_S == 'undefined') {
			team_S = "";
		}
		if (typeof last_title_S == 'undefined') {
			last_title_S = "";
		}
		if (typeof title_max_S == 'undefined') {
			title_max_S = "";
		}
		if (typeof title_min_S == 'undefined') {
			title_min_S = "";
		}
		if (typeof season_max_S == 'undefined') {
			season_max_S = "";
		}
		if (typeof season_min_S == 'undefined') {
			season_min_S = "";
		}
		if (typeof match_max_S == 'undefined') {
			match_max_S = "";
		}

		if (typeof match_min_S == 'undefined') {
			match_min_S = "";
		}

		if (typeof victory_max_S == 'undefined') {
			victory_max_S = "";
		}
		if (typeof victory_min_S == 'undefined') {
			victory_min_S = "";
		}
		if (num == 1) {
			pag = pag - limit;
			if (pag < 0) {
				pag = 0;
				const res = await fetch("/api/v1/ucl_stats?country=" + country_S + "&team=" + team_S + "&last_title=" + last_title_S + "&title_max=" + title_max_S +
					"&title_min=" + title_min_S + "&season_max=" + season_max_S + "&season_min=" + season_min_S + "&match_max=" + match_max_S + "&match_min=" + match_min_S + "&victory_max=" + victory_max_S + "&victory_min=" + victory_min_S + "&limit=" + limit + "&offset=" + pag)
				if (res.ok) {
					const json = await res.json();
					ucls = json;
					numero = num;

				}
			} else {
				const res = await fetch("/api/v1/ucl_stats?country=" + country_S + "&team=" + team_S + "&last_title=" + last_title_S + "&title_max=" + title_max_S +
					"&title_min=" + title_min_S + "&season_max=" + season_max_S + "&season_min=" + season_min_S + "&match_max=" + match_max_S + "&match_min=" + match_min_S + "&victory_max=" + victory_max_S + "&victory_min=" + victory_min_S + "&limit=" + limit + "&offset=" + pag)
				if (res.ok) {
					const json = await res.json();
					ucls = json;
					numero = num;

				}
			}
		} else {
			pag = pag + limit;
			const res = await fetch("/api/v1/ucl_stats?country=" + country_S + "&team=" + team_S + "&last_title=" + last_title_S + "&title_max=" + title_max_S +
				"&title_min=" + title_min_S + "&season_max=" + season_max_S + "&season_min=" + season_min_S + "&match_max=" + match_max_S + "&match_min=" + match_min_S + "&victory_max=" + victory_max_S + "&victory_min=" + victory_min_S + "&limit=" + limit + "&offset=" + pag)
			if (res.ok) {
				const json = await res.json();
				ucls = json;
				numero = num;

			} else if (res.status == 404) {
				window.alert("No hay más equipos");
			}
		}
	}

	async function search(country_S, team_S, from_S, to_S, last_title_S, title_min_S, title_max_S, season_min_S, season_max_S, match_min_S, match_max_S, victory_min_S, victory_max_S) {
		if (typeof country_S == 'undefined') {
			country_S = "";
		}
		if (typeof team_S == 'undefined') {
			team_S = "";
		}
		if (typeof last_title_S == 'undefined') {
			last_title_S = "";
		}
		if (typeof from_S == 'undefined') {
			from_S = "";
		}
		if (typeof to_S == 'undefined') {
			to_S = "";
		}
		if (typeof title_max_S == 'undefined') {
			title_max_S = "";
		}
		if (typeof title_min_S == 'undefined') {
			title_min_S = "";
		}
		if (typeof season_max_S == 'undefined') {
			season_max_S = "";
		}
		if (typeof season_min_S == 'undefined') {
			season_min_S = "";
		}
		if (typeof match_max_S == 'undefined') {
			match_max_S = "";
		}

		if (typeof match_min_S == 'undefined') {
			match_min_S = "";
		}

		if (typeof victory_max_S == 'undefined') {
			victory_max_S = "";
		}
		if (typeof victory_min_S == 'undefined') {
			victory_min_S = "";
		}

		const res = await fetch("/api/v1/ucl_stats?country=" + country_S + "&team=" + team_S + "&last_title=" + last_title_S + "&from=" + from_S + "&to=" + to_S + "&title_max=" + title_max_S +
			"&title_min=" + title_min_S + "&season_max=" + season_max_S + "&season_min=" + season_min_S + "&match_max=" + match_max_S + "&match_min=" + match_min_S + "&victory_max=" + victory_max_S + "&victory_min=" + victory_min_S)

		if (res.ok) {
			const json = await res.json();
			ucls = json;
			console.log("Found " + ucls.length + "team");

			if (ucls.length == 1) {
				exitoMsg = "Se ha encontrado " + ucls.length + " equipos";
			} else {
				exitoMsg = "Se han encontrado " + ucls.length + " equipos";
			}

		} else if (res.status == 404) {
			window.alert("No hay datos con los parámetros introducidos");
			console.log("ERROR");
		}
	}

</script>

<main>
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<div>
		<h3>Ucl API</h3>
	</div>
	<div class="w3-show-inline-block">
		<div class="w3-bar">
			<Button class="w3-button w3-pale-blue" onclick="location.href='#/'">Inicio</Button>
			<Button class="w3-button w3-pale-green" on:click={loadInitialData}>Cargar Datos Iniciales</Button>
			<Button class="w3-button w3-pale-red" on:click={deleteTeams} onclick="location.reload()">Borrar Todo</Button>
		</div>
	</div>
	<div class="w3-card-4">
		<div class="w3-container w3-green">
		  <h2>Formulario de busqueda</h2>
		</div>
		<label>Pais: <input class="w3-input" type="text" bind:value="{country_S}"></label>
		<label>Equipo: <input class="w3-input" type="text" bind:value="{team_S}"></label>
		<br>
		<label>Último Titulo (Desde): <input class="w3-input" type="text" bind:value="{from_S}"></label>
		<label>Último Titulo (Hasta): <input class="w3-input" type="text" bind:value="{to_S}"></label>
		<br>
		<label>Número minimo de titulos: <input class="w3-input" type="text" bind:value="{title_max_S}"></label>
		<label>Número maximo de titilos: <input class="w3-input" type="text" bind:value="{title_min_S}"></label>
		<br>
		<label>Participación minima(en temporadas): <input class="w3-input" type="text" bind:value="{season_max_S}"></label>
		<label>Participación maxima(en temporadas): <input class="w3-input" type="text" bind:value="{season_min_S}"></label>
		<br>
		<label>Número minimo de partidos jugados: <input bind:value="{match_max_S}"></label>
		<label>Número maximo de partidos jugados: <input bind:value="{match_min_S}"></label>
		<br>
		<label>Minimo de victorias: <input class="w3-input" type="text" bind:value="{victory_max_S}"></label>
		<label>Maximo de victorias: <input class="w3-input" type="text" bind:value="{victory_min_S}"></label>
		<br>
		<Button class="w3-button w3-black w3-padding-large" on:click="{search (country_S,team_S,last_title_S,from_S,to_S,title_max_S,title_min_S,
			season_max_S,season_min_S,match_max_S,match_min_S,victory_max_S,victory_min_S)}">Buscar</Button>

	</div>

	{#await ucls}
		Loading ucls...
	{:then ucls}	
	<Table bordered class="w3-table w3-bordered w3-striped">
		<thead>
			<tr class="w3-teal">
				<th>País</th>
				<th>Equipo</th>
				<th>Ultimo titulo</th>
				<th>Número de titulos</th>
				<th>Temporadas</th>
				<th>Partidos</th>
				<th>Victorias</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newUcl.country}"></td>
				<td><input bind:value="{newUcl.team}"></td>
				<td><input bind:value="{newUcl.last_title}"></td>
				<td><input bind:value="{newUcl.title}"></td>
				<td><input bind:value="{newUcl.season}"></td>
				<td><input bind:value="{newUcl.match}"></td>
				<td><input bind:value="{newUcl.victory}"></td>
				<td> <Button outline color="primary" on:click={insertUcl}>Añadir</Button></td>
			</tr>
			{#each ucls as ucl}
			<tr>
				<td>{ucl.country}</td>
				<td>
					<a href="#/ucl_stats/{ucl.country}/{ucl.team}">{ucl.team}</a>
				</td>
				<td>{ucl.last_title}</td>
				<td>{ucl.title}</td>
				<td>{ucl.season}</td>
				<td>{ucl.match}</td>
				<td>{ucl.victory}</td>
				<td><Button outline color="danger" on:click="{deleteTeam(ucl.team)}">Borrar</Button></td>
			</tr>
			{/each}
		</tbody>
	</Table>
	{/await}
	{#if pag==0}
		<Button outline color="primary" on:click="{paginacion(country_S,team_S,last_title_S,title_max_S,title_min_S,season_max_S,season_min_S,match_max_S,match_min_S,victory_max_S,victory_min_S, 2)}">&gt;</Button>
	{/if}
	{#if pag>0}
		<Button outline color="primary" on:click="{paginacion(country_S,team_S,last_title_S,title_max_S,
			title_min_S,season_max_S,season_min_S,match_max_S,match_min_S,victory_max_S,victory_min_S, 1)}">&lt;</Button>
		<Button outline color="primary" on:click="{paginacion(country_S,team_S,last_title_S,title_max_S,
			title_min_S,season_max_S,season_min_S,match_max_S,match_min_S,victory_max_S,victory_min_S, 2)}">&gt;</Button>
	{/if}

	
</main>
<style>
	h3{
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
	}
	</style>
	