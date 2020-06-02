<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos1920-08.herokuapp.com/api/v2/electricity-produced-stats";
    var API2 = "https://sos1920-09.herokuapp.com/api/v3/plugin-vehicles-stats";


    async function loadGraphGr9() {
        let dataG9 = [];
        let myData = [];
        let State = [];
        let Coal = [];
        let CountryG9 = [];
        let annualSalesG9 = [];

        const resDataG9 = await fetch(API2);
        const resMyData = await fetch(miAPI);
        dataG9 = await resDataG9.json();
        myData = await resMyData.json();
        State = myData.map((myData) => myData.state);
        Coal = myData.map((myData) => myData.coal);
        CountryG9 = dataG9.map((dataG9) => dataG9.coutry);
        annualSalesG9 = dataG9.map((dataG9) => dataG9['annual-sale']);

        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por plantas que usan carbon y la cantidad anual de coches vendidos'
            },
            subtitle: {
                text: 'Source: A PDF '
            },
            xAxis: {
                categories: State

            },
            yAxis: {
                title: {
                    text: 'KWatt producidos-Nº Coches vendidos'
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
                data: Coal
            },
            {
                name: 'Coches vendidos',
                data: annualSalesG9
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
            <p class="highcharts-description">En esta grafica comparamos la cantidad de energia que se produce usando un
                combustible fosil y la cantidad de coches electricos vendidos anualmente </p>
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