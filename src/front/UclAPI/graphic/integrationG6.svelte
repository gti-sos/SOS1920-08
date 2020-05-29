<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var uclApi = "api/v1/ucl_stats";
    async function loadGraph() {


       
        var allLines = [];

        const resDataG6 = await fetch("https://sos1920-06.herokuapp.com/api/v2/lottery-sales");
        const datosEx = await resDataG6.json;

        const resData = await fetch(uclApi);
        const MyData = await resData.json();

        for (var i in datosEx) {
            var lineTotal = [];
            //Creamos un array por elemento del json de la forma [Madrid,2017,4959]
            lineTotal.push(datosEx.map(function (d) { return d["province"] })[i]);
            lineTotal.push(datosEx.map(function (d) { return d["year"] })[i]);
            lineTotal.push(datosEx.map(function (d) { return d["total"] / 10000 })[i]);
            //Añadimos la linea al array de todas
            allLines.push(lineTotal);
        }

        console.log(allLines);
        for (var i in MyData) {
            var line1 = [];
            //Creamos un array por elemento del json de la forma [Madrid,2017,4959]
            line1.push(MyData.map(function (d) { return d["country"] })[i]);
            line1.push("2020");
            line1.push(MyData.map(function (d) { return d["season"] })[i]);
            //Añadimos la linea al array de todas
            allLines.push(line1);
        }

        Highcharts.chart('container', {
            title: {
                text: 'Ventas totales de loteria y negativos en covid en EE.UU.'
            },
            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
                }
            },
            series: [{
                keys: ['from', 'to', 'weight'],
                data: allLines,
                type: 'dependencywheel',
                name: 'Total',
                dataLabels: {
                    color: '#333',
                    textPath: {
                        enabled: true,
                        attributes: {
                            dy: 10
                        }
                    },
                    distance: 5
                },
                size: '100%'
            }]
        });
    }




</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/sankey.js"></script>
    <script src="https://code.highcharts.com/modules/dependency-wheel.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>
<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">

        </p>
        <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
<style>
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 310px;
        max-width: 800px;
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
        background: #f8f8f8;
    }

    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
</style>