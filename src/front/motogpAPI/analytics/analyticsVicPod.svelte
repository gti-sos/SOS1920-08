<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph(){

        let MyData = [];
        let ejeX = [];
        let victorias= [];
        let podiums= [];

        const resData = await fetch("api/v1/motogp-statistics");
        MyData = await resData.json();
        
        ejeX = MyData.map((MyData)=> MyData.pilot);
        victorias = MyData.map((MyData)=> MyData.victory);
        podiums = MyData.map((MyData)=> MyData.podium);

        Highcharts.chart('container', {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Victorias y Podiums en MotoGp'
            },
            xAxis: [{
                categories: ejeX,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Victorias',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Podiums',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Podiums',
                type: 'column',
                data: podiums
            }, {
                name: 'Victorias',
                type: 'spline',
                data: victorias
            }]
        });
}
    


</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            En la gráfica se muestra el número de podiums y victorias de los pilotos.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>