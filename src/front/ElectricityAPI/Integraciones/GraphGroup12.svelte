<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos1920-08.herokuapp.com/api/v2/electricity-produced-stats";
    var API2 = "https://sos1920-12.herokuapp.com/api/v2/overdose-deaths";


    async function loadGraphGr9() {
        let dataG12 = [];
        let myData = [];
        let State = [];
        let Solar = [];
        let SolarDiv = [];
        let Hydro = [];
        let Coal = [];
        let HydroDiv = [];
        let CoalDiv = [];
        let Death_MaleG12=[];
        let Death_FemaleG12=[];
        let Death_TotalG12=[];
        let CountryG12=[];

        const resDataG12 = await fetch(API2);
        const resMyData = await fetch(miAPI);
        dataG12 = await resDataG12.json();
        myData = await resMyData.json();
        State = myData.map((myData) => myData.state);
        Solar = myData.map((myData) => myData.solar);
        Hydro = myData.map((myData) => myData.hydro);
        Coal = myData.map((myData) => myData.coal);
        Death_MaleG12 = dataG12.map((dataG12) => dataG12.death_male);
        Death_FemaleG12 = dataG12.map((dataG12) => dataG12.death_female);
        Death_TotalG12 = dataG12.map((dataG12) => dataG12.death_total);
        CountryG12 = dataG12.map((dataG12) => dataG12.country);
       
       //Funciones para ajustar los datos
        myData.forEach((x) => {
            if (x.solar > 100000) {
                SolarDiv.push(parseInt(x.solar / 100000));
            } else if (x.solar > 10000000) {
                SolarDiv.push(parseInt(x.solar / 10000000));
            } else if (x.solar > 10000) {
                SolarDiv.push(parseInt(x.solar / 1000))
            }

        });
        myData.forEach((x) => {
            if (x.hydro > 100000) {
                HydroDiv.push(parseInt(x.hydro / 100000));
            } else if (x.hydro > 10000000) {
                HydroDiv.push(parseInt(x.hydro / 10000000));
            } else if (x.hydro > 10000) {
                HydroDiv.push(parseInt(x.hydro / 1000))
            }

        });
        myData.forEach((x) => {
            if (x.coal > 100000) {
                CoalDiv.push(parseInt(x.coal / 100000));
            } else if (x.coal > 10000000) {
                CoalDiv.push(parseInt(x.coal / 10000000));
            } else if (x.coal > 10000) {
                CoalDiv.push(parseInt(x.coal / 1000))
            }

        });
        /////////////////////////////////////////////////
        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por plantas solares en comparacion a los km totales de las rutas ciclitas en algunas provincias de España'
            },
            subtitle: {
                text: 'Source: ElectricityAPI y Overdose Deaths API'
            },
            xAxis: {
                categories: CountryG12

            },
            yAxis: {
                title: {
                    text: 'KWatt producidos / Muertes por Sobredosis'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Plantas Solares',
                data: SolarDiv
            },
            {
                name: 'Plantas Hidroeléctricas',
                data: HydroDiv
            },
            {
                name: 'Plantas de Carbon',
                data: CoalDiv
            }, {
                name: 'Muertes Masculinas por sobredosis',
                data: Death_MaleG12
            },
            {
                name: 'Muertes Femeninas por sobredosis',
                data: Death_FemaleG12
            },
            {
                name: 'Muertes Totales por sobredosis',
                data: Death_TotalG12
            }
            ]
        });
    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>

<main>

    <body>
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description"> Los datos de mi grafica estan ajustados para que se puedan mostrar dentro
                de una escala parecida a los datos de la otra API.</p>

            <h7>Sinceramente no se como acoplar mis datos con los datos de esta API, así que simplemente los voy a mostrar.</h7>

            <div>
                <Button outline color="primary" on:click={loadGraphGr9}>Cargar Datos</Button>
                <Button outline color="secondary" on:click="{pop}">Back</Button>
            </div>

        </figure>
    </body>
</main>

<style>
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 1024px;
        max-width: 1920px;
        margin: 1em auto;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #EBEBEB;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }

    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }

    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }

    .highcharts-data-table td,
    .highcharts-data-table th,
    .highcharts-data-table caption {
        padding: 0.5em;
    }

    .highcharts-data-table thead tr,
    .highcharts-data-table tr:nth-child(even) {
        background: #b0f2f7;
    }

    .highcharts-data-table tr:hover {
        background: #8db4e7;
    }
</style>