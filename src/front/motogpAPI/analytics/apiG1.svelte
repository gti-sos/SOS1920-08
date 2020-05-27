<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var miAPI = "https://sos1920-08.herokuapp.com/api/v1/motogp-statistics";
    var API1 = "https://sos1920-01.herokuapp.com/api/v2/emigrants-stats";

    async function loadGraph(){

        let myData = [];
        let dataG1 = [];

        const resDataG1 = await fetch(API1);
        const resData = await fetch(miAPI);

        myData = resData.map((resData)=> resData.country);
        resDataG1 = resDataG1.map((resDataG1)=> resDataG1.country);

        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: myData
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
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
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
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

Página Grafica grupo 1
<main>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            This chart shows how data labels can be added to the data series. This
            can increase readability and comprehension for small datasets.
        </p>
    </figure>
    
</main>
