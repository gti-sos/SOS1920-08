<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph() {

        var datosGrafica = [];
        var nombre=[];
        const resData = await fetch("/api/v1/ucl_stats");
        const MyData = await resData.json();

        const resDataG6 = await fetch('https://api.jcdecaux.com/vls/v1/stations/?contract=Seville&apiKey=6fa39265431480ca0b5f3393cd78f29e2d436882');
        const datosEx = await resDataG6.json();



      

        for (var i in datosEx) {
            var dataBike = [];
            nombre = datosEx.map((datosEx) => datosEx.address);
            //dataBike.push(datosEx.map(function (d) { return d["number"] })[i]);
            dataBike.push(datosEx.map(function (d) { return d["bike_stands"] })[i]);
            dataBike.push(datosEx.map(function (d) { return d["available_bike_stands"] })[i]);
            dataBike.push(datosEx.map(function (d) { return d["available_bikes"] })[i]);
            datosGrafica.push(dataBike);

        }


        console.log(nombre);
        console.log(datosGrafica);
        

        Highcharts.chart('container', {

            chart: {
                polar: true,
                type: 'line'
            },

            accessibility: {
                description: '.'
            },

            title: {
                text: 'Recursos para el ciclismo en Sevilla',
                x: -80
            },

            pane: {
                size: '80%'
            },

            xAxis: {
                categories: ['stands', 'stands disponibles', 'bicis disponibles'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },

            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            series: [{
                name: nombre[0],
                data: datosGrafica[0],
                pointPlacement: 'on'
            }, {
                name: nombre[1],
                data: datosGrafica[1],
                pointPlacement: 'on'
            }, {
                name: nombre[2],
                data: datosGrafica[2],
                pointPlacement: 'on'
            }, {
                name: nombre[3],
                data: datosGrafica[3],
                pointPlacement: 'on'
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        pane: {
                            size: '70%'
                        }
                    }
                }]
            }

        });
    }




</script>
<svelte:head>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>


</svelte:head>
<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            En esta gráfica nos centramos en comparar los distintos recursos enfocados al ciclismo en los parques de Sevilla.
        </p>
    </figure>
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