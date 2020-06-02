<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph() {

        var datosGrafica = [];
        var datosGrafica2 = [];
        const resData = await fetch("/api/v1/ucl_stats");
        const MyData = await resData.json();

        const resDataG6 = await fetch('https://sos1920-06.herokuapp.com/api/v2/lottery-sales');
        const datosEx = await resDataG6.json();

        

        for (var i in MyData) {
            var dataUcl = [];
            dataUcl.push(MyData.map(function (d) { return d["team"] })[i]);
            dataUcl.push(MyData.map(function (d) { return d["last_title"] })[i]);
            dataUcl.push(MyData.map(function (d) { return d["victory"]})[i]);
            datosGrafica.push(dataUcl);
        }

        for (var i in datosEx) {
            var dataLottery = [];
            dataLottery.push(datosEx.map(function (d) { return d["province"] })[i]);
            dataLottery.push(datosEx.map(function (d) { return d["year"] })[i]);
            dataLottery.push(datosEx.map(function (d) { return d["total"]/100000 })[i]);
            datosGrafica2.push(dataLottery);
        }
        


        console.log(datosGrafica);
        console.log(datosGrafica2);
        



        Highcharts.chart('container', {
            title: {
                text: 'Impacto de un club en la compra de lotería'
            },
            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
                }
            },
            series: [{
                keys: ['from', 'to', 'weight'],
                data: datosGrafica,
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
            },{
                keys: ['from', 'to', 'weight'],
                data: datosGrafica2,
                type: 'dependencywheel',
                name: 'Total',
                dataLabels: {
                    color: '#333',
                    textPath: {
                        enabled: true,
                        attributes: {
                            dy: 11
                        }
                    },
                    distance: 8
                },
                size: '70%'
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
        <p>
            Nota:para apreciar bien la grafica se recomienda poner a pantalla completa
        </p>
        <p class="highcharts-description">
        En esta gráfica se mide el impacto de las victorias de un club en la compra de lotería.
        En la grafica exterior podemos observar el número de victorias por equipos.
        En la gráfica interior la compra de lotería.
        Nos centramos principalmente en el año 2018 tras la consecución de un titulo europeo por un equipo español.
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
        width: 120%;
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