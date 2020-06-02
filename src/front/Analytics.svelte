<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var APIgp = "api/v1/motogp-statistics";
    var APIelc = "api/v2/electricity-produced-stats";
    var APIucl = "api/v1/ucl_stats";

    async function loadGraph() {

        let dataUcl = [];
        let dataGP = [];
        let dataElec = [];
        let graficaUcl = [];
        let graficaGP = [];
        let graficaElec =[];
        const resData = await fetch(APIucl);
        dataUcl = await resData.json();

        const resData2 = await fetch(APIgp);
        dataGP = await resData2.json();

        const resData3 = await fetch(APIelc);
         dataElec = await resData3.json();
        
        dataUcl.forEach((x) => {
            graficaUcl.push({ name: x.team, value: parseInt(x.victory)*10 });
        });

        dataGP.forEach((x) => {
            graficaGP.push({ name: x.pilot, value: parseInt(x.victory)*10 });
        });

        dataElec.forEach((x) => {
              graficaElec.push({name:x.state, value: parseInt(x.solar)});
          });

        let datosGrafica = [
            {
                name: "Victorias en Moto GP",
                data: graficaGP

            },
            {
                name: "Victorias en Champions",
                data: graficaUcl
            }
            ,{
                 name:"Kwatts producidos",
                 data:graficaElec
             }
        ];



        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '60%'
            },
            title: {
                text: 'Analytics'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}</sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '20%',
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
    <script src="https://code.highcharts.com/highcharts.js" ></script>
    <script src="https://code.highcharts.com/highcharts-more.js" ></script>
    <script src="https://code.highcharts.com/modules/exporting.js" ></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"  on:load="{loadGraph}"></script>

</svelte:head>
<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfica comun a las tres APIs. Muestra victorias por equipos Ucl y pilotos de Moto Gp y Kwatts producidos por plantas hidroeléctricas .
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
