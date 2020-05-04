<script>
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import { onMount } from "svelte";

	let pilots = [];
	let newPilot = {
		country: "",
		pilot: "",
		last_title: 0,
		world_title: 0,
		victory: 0,
		podium: 0
	};

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
		});

	}

	async function deletePilot(pilot){
		const res = await fetch("/api/v1/motogp-statistics/" + pilot, {
			method: "DELETE"
		}).then(function (res) {
			getPilots();
		});
	}

</script>



<main>
	
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

</main>
