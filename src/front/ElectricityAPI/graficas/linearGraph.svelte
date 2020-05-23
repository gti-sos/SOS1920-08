<script>
 import Button from "sveltestrap/src/Button.svelte";
    async function loadGraph() {
        let data = [];
       
        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por distintas fuentes anualmente'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: ['Alabama', 'Arkansas', 'California', 'Colorado', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Iowa']
            },
            yAxis: {
                title: {
                    text: 'KWatt producidos'
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
                name: 'Plantas Hidroeléctricas',
                data: [11142139.0, 3008775.0,26330667.0,1825385.0, 0.0, 232574.0, 3696868.0, 96520.0, 924861.0]
            }, {
                name: 'Plantas Solares',
                data: [357252.0,203413.0, 26985181.0,1062380.0,49789.0, 2412067.0, 1995837.0, 184576.0, 11456.0]
            }]
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
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            This chart shows how data labels can be added to the data series. This
            can increase readability and comprehension for small datasets.
            <Button outline color="primary" on:click={loadGraph}>Cargar Datos</Button>
        
        </p>
    </figure>
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