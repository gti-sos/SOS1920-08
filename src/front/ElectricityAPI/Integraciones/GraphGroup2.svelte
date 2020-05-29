<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos1920-08.herokuapp.com/api/v2/electricity-produced-stats";
    var API2 = "https://sos1920-09.herokuapp.com/api/v2/evolution-of-cycling-routes";


    async function loadGraphGr9() {
        let dataG2 = [];
        let myData = [];
        let State = [];
        let Solar = [];
        let SolarDiv = [];
        let ProvinceG2 = [];
        let MetropolitanG2 = [];
        let UrbanG2 = [];
        let RestG2 = [];

        const resdataG2 = await fetch(API2);
        const resMyData = await fetch(miAPI);
        dataG2 = await resdataG2.json();
        myData = await resMyData.json();
        State = myData.map((myData) => myData.state);
        Solar = myData.map((myData) => myData.solar);
        ProvinceG2 = dataG2.map((dataG2) => dataG2.province);
        MetropolitanG2 = dataG2.map((dataG2) => dataG2.metropolitan);
        UrbanG2 = dataG2.map((dataG2) => dataG2.urban);
        RestG2 = dataG2.map((dataG2) => dataG2.rest);
        myData.forEach((x) => {
            if (x.solar > 100000) {
                SolarDiv.push(parseInt(x.solar / 100000));
            } else if (x.solar > 10000000) {
                SolarDiv.push(parseInt(x.solar / 10000000));
            } else if (x.solar > 10000) {
                SolarDiv.push(parseInt(x.solar / 1000))
            }

        });
        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por plantas solares en comparacion a los km totales de las rutas ciclitas en algunas provincias de España'
            },
            subtitle: {
                text: 'Source: ElectricityAPI y Evolution of Cycling routes'
            },
            xAxis: {
                categories: ProvinceG2

            },
            yAxis: {
                title: {
                    text: 'KWatt producidos / Km de recorrido'
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
                name: 'Rutas Metropolitanas',
                data: MetropolitanG2
            },
            {
                name: 'Rutas Urbanas',
                data: UrbanG2
            }, {
                name: 'Resto de rutas',
                data: RestG2
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

            <h7>La idea de comparar estos datos es ejemplificar como se podría mejorar la produccion de energia Solar si
                instalasemos paneles solares a lo largo de estos recorridos.</h7>

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