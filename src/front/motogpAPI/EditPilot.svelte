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
    }else if(res.status==404){      
        erroMsg="No existe ese piloto";
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
            getPilot();
            
            if(res.status==200){
                window.alert("El piloto se ha modificado correctamente");

            }
		});

	}
</script>

<main>
    <div>
		<h3>API MOTOGP</h3>
	</div>
    <h3>Editar Piloto:  <strong>{params.pilot}</strong></h3>
    {#await pilot}
		Loadind pilots...
    {:then pilot}
		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Piloto</th>
					<th>Último Titulo</th>
					<th>Titulos Mundiales</th>
					<th>Victorias</th>
					<th>Podiums</th>
					<th>Acción</th>
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
					<td><Button outline color="primary" on:click={actualizaPilot} onclick="location.href='#/motogp-statistics'">Editar</Button></td>
				</tr>
			</tbody>
		</Table>
    {/await}
    {#if erroMsg}
        <p style="color: red">{erroMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
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
background-color: #f7f6b9
}
</style>