<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var uclApi = "api/v1/ucl_stats";
    var ApiGrupo1 = "https://sos1920-01.herokuapp.com/api/v2/natality-stats";

    async function loadGraph() {

        let MyData = [];
        let ExData = [];
        let teamS = [];
        let teamI = [];
        let ultimoTituloS = [];
        let ultimoTituloI = [];
        let datosNatalidadI= [];
        let datosNatalidadS= [];
        let years = [];


        const resData = await fetch(uclApi);
        MyData = await resData.json();

        const resDataG2 = await fetch(ApiGrupo1);
        ExData = await resDataG2.json();

        ExData.forEach((x) => {
            if (x.country == "spain") {
                datosNatalidadS.push(parseInt(x.natality_totals));
                years.push(x.year);
            }else if(x.country=="italy"){
                datosNatalidadI.push(parseInt(x.natality_totals));
            }
        });

        MyData.forEach((x)=>{
            if(x.last_title=="2017"||x.last_title=="2015"|| x.last_title=="2010" ){
                if(x.country=="Spain"){
                ultimoTituloS.push(x.last_title);
                teamS.push(x.team);
                }if(x.country=="Italy"){
                ultimoTituloI.push(x.last_title);
                teamI.push(x.team);
                 }
            } 
        });


        Highcharts.chart('container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Impacto en la natalidad tras la consecución de un titulo'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [2010,2015,2017]
            },
            yAxis: {
                title: {
                    text: 'Natalidad'
                },
                labels: {
                    formatter: function () {
                        return this.value + '°';
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                },
            },
            series: [{
                name: 'Spain',
                data: datosNatalidadS
            }, {
                name: 'Italy',
                data: datosNatalidadI
            },
            {
                name: teamS,
                color:'rgba(223, 83, 83, .5)',
                data: [null,ultimoTituloS,null]
            },{
                name: teamI,
                color:'rgba(0,255,0,0.3)',
                data: ultimoTituloI
            }]
        });


    }






</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js" on:load="{loadGraph}"></script>
</svelte:head>


<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            En esta gráfica intentamos medir el impacto en la natalidad de un país tras la consecución de un titulo europeo por un equipo nacional.
            En este caso nos centraremos principalmente en dos paises: España e Italia.
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