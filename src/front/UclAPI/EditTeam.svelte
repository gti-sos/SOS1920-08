<script>
    import {
		onMount
	} from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let ucl_stats ={};
    let updatedCountry = "";
    let updatedTeam = "";
    let updatedLastTitle = 0;
    let updatedTitle= 0;
    let updatedSeason = 0;
    let updatedMatch = 0;
    let updatedVictory = 0;

    let errorMsg ="";

    onMount(getUcl);

    async function getUcl(){
        console.log("Fetching ucl...");
        const res = await fetch("/api/v1/ucl_stats/"+params.uclCountry +"/" +params.uclTeam);

        if (res.ok){
            console.log("OK:");
            const json = await res.json();
            ucl_stats = json;
            updatedCountry = params.uclCountry;
            updatedTeam = params.uclTeam;
            updatedLastTitle = ucl_stats.last_title;
            updatedTitle = ucl_stats.title;
            updatedSeason = ucl_stats.season;
            updatedMatch = ucl_stats.match;
            updatedVictory = ucl_stats.victory;

            console.log("Received ucl_stats.");
        }else{
            errorMsg = res.status +": "+res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }

    async function updatedUcl(){
        console.log("Updating team..." + JSON.stringify(params.uclTeam));
		const res = await fetch("/api/v1/ucl_stats/"+params.uclCountry +"/" +params.uclTeam,{
			method: "PUT",	
			body: JSON.stringify({
                country: updatedCountry,
                team: updatedTeam,
                last_title: updatedLastTitle,
                title: updatedTitle,
                season: updatedSeason,
                match: updatedMatch,
                victory: updatedVictory
            }),
			headers:{
				"Content-Type": "application/json"
			}

		}).then(function (res){
            getUcl();
            if(res.status==200){
                window.alert("Los datos se han modificado correctamente");
            }else{
                errorMsg ="Lo siento los datos introducidos no son correctos";
                console.log(res.status +": "+res.statusText);
            }
		});	

    };
</script>
<main>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <h3>Edit Team :<strong>{params.uclCountry} {params.uclTeam}</strong></h3>

    {#await ucl_stats}
		Cargando datos...
	{:then ucl_stats}	
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
			<tr class="w3-teal">
                <td><input bind:value="{updatedCountry}"></td>
                <td><input bind:value="{updatedTeam}"></td>
                <td><input bind:value="{updatedLastTitle}"></td>
                <td><input bind:value="{updatedTitle}"></td>
                <td><input bind:value="{updatedSeason}"></td>
                <td><input bind:value="{updatedMatch}"></td>
                <td><input bind:value="{updatedVictory}"></td>
				<td><Button class="w3-button w3-black" on:click={updatedUcl}>Modificar</Button></td>
			</tr>
		</tbody>
	</Table>
	{/await}
    {#if errorMsg}
    <p style="color: red">ERROR:{errorMsg}</p>
    {/if}
    <button class="w3-button w3-black" on:click="{pop}">volver</button>
</main>