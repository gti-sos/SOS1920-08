<script>
    import {
		onMount
	} from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    let ucls = [];
	let newUcl ={
		country: "",
		team: "",
		last_title: "",
		title: "",
		season: "",
		match: "",
		victory: ""
	};

    let country_S="";
	let team_S="";
	let last_title_S="";
	let from_S,to_S="";
	let title_max_S="";
	let title_min_S="";
	let season_max_S="";
	let season_min_S="";
	let match_max_S="";
	let match_min_S="";
	let victory_max_S="";
    let victory_min_S="";

    let errorMsg ="";

    

</script>
<main>
 
        
        {#await ucls}
		Loading ucls...
	{:then ucls}	
	<Table bordered>
		<thead>
			<tr>
				<th>País</th>
				<th>Equipo</th>
				<th>Ultimo titulo</th>
				<th>Número de titulos</th>
				<th>Temporadas</th>
				<th>Partidos</th>
				<th>Victorias</th>
			</tr>
		</thead>
		<tbody>
			{#each ucls as ucl}
			<tr>
				<td>{ucl.country}</td>
				<td>{ucl.team}</td>
				<td>{ucl.last_title}</td>
				<td>{ucl.title}</td>
				<td>{ucl.season}</td>
				<td>{ucl.match}</td>
				<td>{ucl.victory}</td>
			</tr>
			{/each}
		</tbody>
	</Table>
    {/await}
    {#if errorMsg}
    <p style="color: red">ERROR:{errorMsg}</p>
    {/if}
    <button outline color ="secondary" on:click="{pop}">Back</button>

</main>