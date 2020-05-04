<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";

    export let params = {}
    let pilot = {};
    
    let updateCountry = "";
    let updatePilot = "";
    let updateLastTitle = "";
    let updateWorldTitle = 0;
    let updateVictory = 0;
    let updatePodium = 0;

    let erroMsg = "";

    
	onMount(getPilot);

async function getPilot(){
    console.log("Fetching pilot....");
    const res = await fetch("/api/v1/motogp-statistics/" + params.pilot);

    if(res.ok){
        console.log("Ok:");
        const json = await res.json();
        pilot = json;
        updateCountry = pilot.country;
        updatePilot = params.pilot;
        updateLastTitle = pilot.last_title;
        updateWorldTitle = pilot.world_title;
        updateVictory = pilot.victory;
        updatePodium = pilot.podium;

        console.log("Received pilot.");
    }else{
        erroMsg = res.status + ": " + res.statusText;
        console.log("ERROR" + erroMsg);
    }
}

async function actualizaPilot(){
		console.log("Updating pilots...." + JSON.stringify(params.pilotName));
		const res = await fetch("/api/v1/motogp-statistics/" + params.pilot,{
			method: "PUT",
			body: JSON.stringify({
                country : updateCountry,
                pilot : params.pilot,
                last_title : updateLastTitle,
                world_title : updateWorldTitle,
                victory : updateVictory,
                podium : updatePodium
            }),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
			getPilots();
		});

	}
</script>

<main>
    <h3>Edit Pilot <strong>{params.pilot}</strong></h3>
    {#await pilot}
		Loadind pilots...
    {:then pilot}
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
					<td><input bind:value="{updateCountry}"></td>
					<td>{params.pilot}</td>
					<td><input bind:value="{updateLastTitle}"></td>
					<td><input bind:value="{updateWorldTitle}"></td>
					<td><input bind:value="{updateVictory}"></td>
					<td><input bind:value="{updatePodium}"></td>
					<td><Button outline color="primary" on:click={actualizaPilot}>Editar</Button></td>
				</tr>
			</tbody>
		</Table>
    {/await}
    {#if erroMsg}
        <p style="color: red">ERROR: {erroMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Back</Button>
</main>