<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var uclApi = "api/v1/ucl_stats";
    async function loadGraph(){

        let datosEx = [];
        let MyData =[];
        let ventasTotales=[];
        let years=[];
        let ultimoTituloS = [];
        let teamS = [];
        
        const resDataG6 = await fetch("/api/v2/lottery-sales");
        datosEx = await resDataG6.json;

        const resData = await fetch(uclApi);
        MyData = await resData.json();

        datosEx.forEach((x)=>{
            if(x.province=="Barcelona"){
                ventasTotales.push(x.total);
                years.push(x.years);
            }
        });

        MyData.forEach((x)=>{
            if(x.last_title=="2017"||x.last_title=="2015"){
                if(x.country=="Spain"){
                ultimoTituloS.push(x.last_title);
                teamS.push(x.team);
                }
            }
        });

        Highcharts.chart('container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: years
            },
            yAxis: {
                title: {
                    text: 'Temperature'
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
                name: 'Barcelona',
                data: ventasTotales
            }, {
                name: 'Madrid',
                data: [0]
            },
            {
                name: teamS,
                color:'rgba(223, 83, 83, .5)',
                data: [null,ultimoTituloS,null]
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