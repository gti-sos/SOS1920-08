<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";

    export let params = {}
    let electricity = {};

    let updateCountry = "";
    let updateState = "";
    let updateYear = 0;
    let updateHydro = 0;
    let updateSolar = 0;
    let updateCoal = 0;

    let erroMsg = "";


    onMount(getElectricity);

    async function getElectricity() {
        console.log("Fetching electricity....");
        const res = await fetch("/api/v1/electricity-produced-stats/" + params.country + "/" + params.state);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            electricity = json;
            updateCountry = params.country;
            updateState = params.state;
            updateYear = parseInt(electricity.year);
            updateHydro = parseInt(electricity.hydro);
            updateSolar = parseInt(electricity.solar);
            updateCoal = parseInt(electricity.coal);

            console.log("Received electricity.");
        } else {
            erroMsg = res.status + ": " + res.statusText;
            console.log("ERROR" + erroMsg);
        }
    }

    async function actualizaElectricity() {
        console.log("Updating electricitys...." + JSON.stringify(params.country));
        const res = await fetch("/api/v1/electricity-produced-stats/" + params.country + "/" + params.state, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                state: params.state,
                year: parseInt(updateYear),
                hydro: parseInt(updateHydro),
                solar: parseInt(updateSolar),
                coal: parseInt(updateCoal),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getElectricity();
        });

    }
</script>

<main>
    <html lang="ES">
    <meta charset="UTF-8">

    <body style="background-color: #e6f0ff; font-family: Arial, Helvetica, sans-serif;">


        <h3>Edit electricity <strong>{params.country}</strong></h3>
        {#await electricity}
		Loadind electricitys...
         {:then electricity}
		<Table bordered>
			<thead>
				<tr>
					<th>Country</th>
					<th>State</th>
					<th>Year</th>
					<th>Hydro</th>
					<th>Solar</th>
					<th>Coal</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{params.country}</td>
					<td>{params.state}</td>
					<td><input bind:value = "{updateYear}"></td>
					<td><input bind:value="{updateHydro}"></td>
					<td><input bind:value="{updateSolar}"></td>
					<td><input bind:value="{updateCoal}"></td>
					<td><Button outline color="primary" on:click={actualizaElectricity}>Editar</Button></td>
				</tr>
			</tbody>
		</Table>
    {/await}
    {#if erroMsg}
        <p style="color: red">ERROR: {erroMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Back</Button>
</body>
    </html>
</main>