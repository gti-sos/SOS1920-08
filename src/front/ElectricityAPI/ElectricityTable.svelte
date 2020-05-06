<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
    import Input from "sveltestrap/src/Input.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";

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
    let numResourses = 5;
    let offset = 0;
    let currPage = 1;
    let loadMore = true;
    let succMsg = false;
    // search vars
    let field = "";
    let value = "";

    async function loadInitialData() {
        const res = await fetch("/api/v1/electricity-produced-stats/loadInitialData", {
            method : "GET"
        }).then(function (res) {
            getElegtricityStats();
        });
    }


    async function getElegtricityStats() {
        const res = await fetch("/api/v1/electricity-produced-stats?offset=" + numResourses * offset + "&limit=" + numResourses);
        const nextRes = await fetch("/api/v1/electricity-produced-stats?offset=" + numResourses * (offset + 1) + "&limit=" + numResourses);

        if (res.ok && nextRes.ok) {
            const json = await res.json();
            const newJson = await nextRes.json();
            electricity = json;
            if (nextRes.lenght == 0) {
                loadMore = false;
            } else {
                loadMore = true;
            }
        } else {
            console.log("Error");
        }
    }

    function plusOffset(value) {
        offset += value;
        currPage += value;
        getElegtricityStats();
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
            if (res.ok) {
                newElectricity = {
                    country: "",
                    state: "",
                    year: "",
                    hydro: "",
                    solar: "",
                    coal: ""
                };
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
        });
    }
    async function deleteAStat(country, state) {
        const res = await fetch("/api/v1/electricity-produced-stats/" + country + "/" + state, {
            method: "DELETE"
        }).then(function (res) {
            getElegtricityStats();
        })
    }
    async function busqueda(field, value) {
		
		console.log("Searching data: " + field + " and " + value);
		
		var url = "/api/v1/electricity-produced-stats";
		
		if (field != "" && value != "") {
			url = url + "?" + field + "=" + value; 
		}
		
		console.log(url)
		
		const res = await fetch(url);
		
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			electricity = json;			
			console.log("Found " + electricity.lenght + "electricity-produced-stats.");
		} else {
			console.log("ERROR!");
		}
	}
	
	let exitoMsg=""
</script>
<main>
    <h2>Electricidad Producida</h2>
    <div style="text-align:center;padding-bottom: 3%;">
        <Button outline color="primary" on:click={loadInitialData}>Cargar Datos</Button>
        <Button outline color="danger" on:click={deleteAllStats}><i class="fa fa-trash" aria-hidden="true"></i> Borrar
            todos los datos</Button>
    </div>

    {#await electricity}
        Loading data...
    {:then electricity}
	
	
		<FormGroup  style="width:25%;"> 
			<label>Selecciona el campo por el que buscar:</label>
			<Input type="select" name="inputField" id="inputField" bind:value="{field}">
				<option disabled selected></option>
				<option value="country">Pais</option>
				<option value="state">Estado</option>
				<option value="year">Año</option>
				<option value="hydro">Electricidad producida por plantas Hidraulicas</option>
                <option value="solar">Electricidad producida por plantas Solares</option>
                <option value="coal">Electricidad producida por plantas de carbon</option>
			</Input>
		</FormGroup>
				
		<FormGroup style="width:25%;">
			<label>Valor del campo:</label>
			<Input type="text"  name="inputValue" id="inputValue" bind:value="{value}"></Input>
		</FormGroup>

		<Button style="margin-bottom:3%;" color="primary" on:click="{busqueda(field, value)}" class="button-search" >Buscar </Button>
			
	
	
	
        <Table bordered>
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
                {#each electricity as tou}
                    <tr>
						<td>
                        	<a href="#/electricity-produced-stats/{tou.country}/{tou.state}">{tou.country}</a>
                        </td>
                        <td>{tou.state}</td>
                        <td>{tou.year}</td>
                        <td>{tou.hydro}</td>
						<td>{tou.solar}</td>
                        <td>{tou.coal}</td>
                        <td><Button outline color="danger" on:click="{deleteAStat(tou.country,tou.state)}"><i class="fa fa-trash" aria-hidden="true"></i> Eliminar</Button></td>
                    </tr>
                {/each}
            </tbody>
        </Table>
		<h3>Añadir nuevo dato:</h3>
		<Table style="background-color:#EAEEF0;">
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
 	<Pagination ariaLabel="Cambiar de página">


		<PaginationItem class="{currPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/electricity-produced-stats" on:click="{() => plusOffset(-1)}" />
		</PaginationItem>
		
		<!-- If we are not in the first page-->
		{#if currPage != 1}
		<PaginationItem>
			<PaginationLink href="#/electricity-produced-stats" on:click="{() => plusOffset(-1)}" >{currPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/electricity-produced-stats" >{currPage}</PaginationLink>
		</PaginationItem>

		<!-- If there are more elements-->
		{#if loadMore}
		<PaginationItem >
			<PaginationLink href="#/electricity-produced-stats" on:click="{() => plusOffset(1)}">{currPage + 1}</PaginationLink>
		</PaginationItem>
		{/if}

		<PaginationItem class="{loadMore ? '' : 'disabled'}">
		  <PaginationLink next href="#/electricity-produced-stats" on:click="{() => plusOffset(1)}"/>
		</PaginationItem>

	</Pagination>
 
</main>