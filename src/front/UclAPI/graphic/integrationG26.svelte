<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var APIucl = "api/v1/ucl_stats";
    var ApiGrupo26 = "http://sos1920-26.herokuapp.com/api/v2/global-transfers";
    async function loadGraph() {

        let dataUcl = [];
        let dataGT = [];
        let graficaUcl = [];
        let graficaGT = [];
        const resData = await fetch(APIucl);
        dataUcl = await resData.json();

        const resData2 = await fetch(ApiGrupo26);
        dataGT = await resData2.json();

        
        dataUcl.forEach((x) => {
            graficaUcl.push({ name: x.team, value: parseInt(x.victory) });
        });

        dataGT.forEach((x) => {
            graficaGT.push({ name: x.team, value: x.balance });
        });

        let datosGrafica = [
            {
                name: "Balance economico por equipo",
                data: graficaGT

            },
            {
                name: "Victorias en Champions",
                data: graficaUcl
            }
        ];



        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '60%'
            },
            title: {
                text: 'Balance y victorias por equipos'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> <b>{point.value}</b>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '80%',
                    maxSize: '100%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        gravitationalConstant: 0.05,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: true,
                        parentNodeLimit: true
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
            series: datosGrafica
        });


    };
    loadGraph();
</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>
<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            En esta gráfica podemos observar el número de victorias en competición europea por equipo así como su balance economico en los últimos años,
            pudiendo hacer de esta forma un anlisis del impacto economico en la repercusión de los logros de un club.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
<style>
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 320px;
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

