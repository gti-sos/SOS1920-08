<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
    import Input from "sveltestrap/src/Input.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";
    import { pop } from "svelte-spa-router";

    let electricity = [];
    let newElectricity = {
        country: "",
        state: "",
        year: "",
        hydro: "",
        solar: "",
        coal: ""
    }

    onMount(getElegtricityStats);

    //pag vars
    let page=0;
    let numero;
    let limit = 10;
    let succMsg = false;
    // search vars
    let SCountry = "";
    let SState = "";
    let SYear = "";
    let SHydroMin = 0;
    let SHydroMax = 0;
    let SSolarMin = 0;
    let SSolarMax = 0;
    let SCoalMin = 0;
    let SCoalMax = 0;


    async function loadInitialData() {
        const res = await fetch("/api/v1/electricity-produced-stats/loadInitialData", {
            method: "GET"
        }).then(function (res) {
            getElegtricityStats();
        });
    }


    async function getElegtricityStats() {
        const res = await fetch("/api/v1/electricity-produced-stats?" + "limit=" + limit + "&offset=" + page);
        if (res.ok) {
            const json = await res.json();

            electricity = json;
            console.log("Recieved " + electricity.lenght + "stats");
        } else {
            console.log("Error");
        }
    }


    async function insertNewElectricityStat() {
        const res = await fetch("/api/v1/electricity-produced-stats", {
            method: "POST",
            body: JSON.stringify(newElectricity),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getElegtricityStats();
            if (res.status == 200) {
                succMsg = res.statusText + " Muestra insertada con exito";
                succMsg = res.status + ":" + res.statusText;
            } else if (res.status == 400) {
                window.alert("ERROR: Se deben completar todos los campos");
            }
        });
    }
    async function deleteAllStats() {
        const res = await fetch("/api/v1/electricity-produced-stats", {
            method: "DELETE"
        }).then(function (res) {
            getElegtricityStats();
            window.alert("Todas las muestras se han borrado con exito");
        });
    }
    async function deleteAStat(country, state) {
        const res = await fetch("/api/v1/electricity-produced-stats/" + country + "/" + state, {
            method: "DELETE"
        }).then(function (res) {
            getElegtricityStats();
            succMsg = res.statusText + "Muestra eliminada con exito";
        })
    }
    async function busqueda(SCountry, SState, SYear, SHydroMin, SHydroMax, SSolarMin, SSolarMax, SCoalMin, SCoalMax) {

        if (typeof SCountry == 'undefined') {
            SCountry = "";
        }
        if (typeof SState == 'undefined') {
            SState = "";
        }
        if (typeof SYear == 'undefined') {
            SYear = "";
        }
        if (typeof SHydroMin == 'undefined') {
            SHydroMin = "";
        }
        if (typeof SHydroMax == 'undefined') {
            SHydroMax = "";
        }
        if (typeof SSolarMin == 'undefined') {
            SSolarMin = "";
        }
        if (typeof SSolarMax == 'undefined') {
            SSolarMax = "";
        }
        if (typeof SCoalMin == 'undefined') {
            SCoalMin = "";
        }
        if (typeof SCoalMax == 'undefined') {
            SCoalMax = "";
        }
        const res = await fetch("/api/v1/electricity-produced-stats?country=" + SCountry + "&state=" + SState + "&year=" + SYear
            + "&hydroMin=" + SHydroMin + "&hydroMax=" + SHydroMax + "&solarMin=" + SSolarMin + "&solarMax=" + SSolarMax + "&coalMin=" + SCoalMin
            + "&coalMax=" + SCoalMax
        )
        if (res.ok) {
            const json = await res.json();
            electricity = json;
            console.log("Found: " + electricity.lenght + " stats");

            if (electricity.lenght == 1) {
                succMsg = "Se ha encontrado " + electricity.lenght + " muestra";
            } else {
                succMsg = "Se han encontrado " + electricity.lenght + " muestras";
            }
        } else if (res.status == 400) {
            window.alert("No se han encontrado muestras con los parametros introducidos");
        }
    }

    async function paginacion(SCountry, SState, SYear, SHydroMin, SHydroMax, SSolarMin, SSolarMax, SCoalMin, SCoalMax, num) {
        if (typeof SCountry == 'undefined') {
            SCountry = "";
        }
        if (typeof SState == 'undefined') {
            SState = "";
        }
        if (typeof SYear == 'undefined') {
            SYear = "";
        }
        if (typeof SHydroMin == 'undefined') {
            SHydroMin = "";
        }
        if (typeof SHydroMax == 'undefined') {
            SHydroMax = "";
        }
        if (typeof SSolarMin == 'undefined') {
            SSolarMin = "";
        }
        if (typeof SSolarMax == 'undefined') {
            SSolarMax = "";
        }
        if (typeof SCoalMin == 'undefined') {
            SCoalMin = "";
        }
        if (typeof SCoalMax == 'undefined') {
            SCoalMax = "";
        }
        if (num == 1) {
            page = page - limit;
            if (page < 0) {
                page = 0;
                const res = await fetch("/api/v1/electricity-produced-stats?country=" + SCountry + "&state=" + SState + "&year=" + SYear
                    + "&hydroMin=" + SHydroMin + "&hydroMax=" + SHydroMax + "&solarMin=" + SSolarMin + "&solarMax=" + SSolarMax + "&coalMin=" + SCoalMin
                    + "&coalMax=" + SCoalMax + "&limit=" + limit + "&offset=" + page
                )
                if (res.ok) {
                    const json = await res.json();
                    electricity = json;
                    numero= num;
                }
            } else {
                const res = await fetch("/api/v1/electricity-produced-stats?country=" + SCountry + "&state=" + SState + "&year=" + SYear
                    + "&hydroMin=" + SHydroMin + "&hydroMax=" + SHydroMax + "&solarMin=" + SSolarMin + "&solarMax=" + SSolarMax + "&coalMin=" + SCoalMin
                    + "&coalMax=" + SCoalMax + "&limit=" + limit + "&offset=" + page
                )
                if (res.ok) {
                    const json = await res.json();
                    electricity = json;
                    numero=num;
                }
            }
        } else {
            page = page + limit;
            const res = await fetch("/api/v1/electricity-produced-stats?country=" + SCountry + "&state=" + SState + "&year=" + SYear
                + "&hydroMin=" + SHydroMin + "&hydroMax=" + SHydroMax + "&solarMin=" + SSolarMin + "&solarMax=" + SSolarMax + "&coalMin=" + SCoalMin
                + "&coalMax=" + SCoalMax + "&limit=" + limit + "&offset=" + page
            )
            if (res.ok) {
                const json = await res.json();
                electricity = json;
                numero=num;
            } else if (res.status == 400) {
                window.alert("No existen mas muestras");
            }
        }
    }
</script>
<main>
    <html lang="ES">
    <meta charset="UTF-8">

    <body style="background-color: #e6f0ff; font-family: Arial, Helvetica, sans-serif;">
        <h2 style="text-align: center;">Electricidad Producida</h2>
        <div style="text-align:left;padding-bottom: 3%;">
            <Button outline color="primary" on:click={loadInitialData}>Cargar Datos</Button>
            <Button outline color="danger" on:click={deleteAllStats} onclick="location.reload()">Borrar
                todos los datos</Button>
            <Button outline color="secondary" on:click="{pop}">Back</Button>
        </div>
        <div style="border: 1px; border-color: black; border-style: groove; padding-bottom: 1%;">
            <h6>Seccion de busqueda: </h6>
            <tr>
                <td><label>Pais: <input bind:value="{SCountry}"></label></td>
                <td><label>Año: <input bind:value="{SYear}"></label></td>
                <td><label>Estado/Provincia: <input bind:value="{SState}"></label></td>
                <td><label>Min Hydro producida: <input bind:value="{SHydroMin}"></label></td>
                <td><label>Max Hydro producida: <input bind:value="{SHydroMax}"></label></td>


            </tr>
            <tr>
                <td><label>Min E.Carbon Producida: <input bind:value="{SCoalMin}"></label></td>
                <td><label>Máx E.Carbon producida: <input bind:value="{SCoalMax}"></label></td>
                <td><label>Min E.Solar Producida: <input bind:value="{SSolarMin}"></label></td>
                <td><label>Max E.Solar Producida: <input bind:value="{SSolarMax}"></label></td>


            </tr>

            <Button outline color="primary"
                on:click="{busqueda (SCountry, SState, SYear, SHydroMin, SHydroMax, SSolarMin, SSolarMax, SCoalMin, SCoalMax)}">Buscar</Button>
        </div>
        {#await electricity}
        Loading data...
    {:then electricity}
        <Table  style="border-style: groove; border-width: 1px; padding-block-start: 1%;">
            <thead>
                <tr>
                    <th>Pais</th>
                	<th>Estado</th>
                	<th>Año</th>
                	<th>Energia Hidraulica</th>
					<th>Energia solar</th>
                    <th>Carbon</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {#each electricity as stat}
                    <tr>
						<td>
                        	<a href="#/electricity-produced-stats/{stat.country}/{stat.state}">{stat.country}</a>
                        </td>
                        <td>{stat.state}</td>
                        <td>{stat.year}</td>
                        <td>{stat.hydro}</td>
						<td>{stat.solar}</td>
                        <td>{stat.coal}</td>
                        <td><Button outline color="danger" on:click="{deleteAStat(stat.country,stat.state)}"> Eliminar</Button></td>
                    </tr>
                {/each}
            </tbody>
        </Table>
		
        <Table style="border-style: groove; border-width: 1px;">
            <h4>Añadir nuevo dato:</h4>
			<tr>
                <td><strong>Pais:</strong> <input bind:value="{newElectricity.country}"></td>
                <td><strong>Estado/Provincia:</strong> <input bind:value="{newElectricity.state}"></td>
				<td><strong>Año:</strong> <input type="number" bind:value="{newElectricity.year}"></td>
				<td><strong>HidroElectricidad:</strong> <input type="number" bind:value="{newElectricity.hydro}"></td>
				<td><strong>Solar:</strong> <input type="number" bind:value="{newElectricity.solar}"></td>
				<td><strong>Carbon</strong> <input type="number" bind:value="{newElectricity.coal}"></td>
				<td><strong>Acción:</strong> <Button color="primary" on:click={insertNewElectricityStat}>Añadir</Button> </td>
			</tr>
		</Table>
	
    {/await}
	{#if succMsg}
        <p style="color: green">{succMsg}. Dato insertado con éxito</p>
    {/if}
   
    {#if page==0}
        <button outline color="primary" on:click = "{paginacion((SCountry, SState, SYear, SHydroMin, SHydroMax, SSolarMin, SSolarMax, SCoalMin, SCoalMax, 2))}">&gt;</button>
    {/if}
    {#if page > 0}
        <button outline color="primary" on:click = "{paginacion((SCountry, SState, SYear, SHydroMin, SHydroMax, SSolarMin, SSolarMax, SCoalMin, SCoalMax, 1))}">&lt;</button>
        <button outline color="primary" on:click = "{paginacion((SCountry, SState, SYear, SHydroMin, SHydroMax, SSolarMin, SSolarMax, SCoalMin, SCoalMax, 2))}">&gt;</button>
    {/if}

</body>
    </html>
</main>