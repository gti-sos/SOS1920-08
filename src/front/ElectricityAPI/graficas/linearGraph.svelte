<script>
    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraphTotalCompare() {

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
                data: [11142139.0, 3008775.0, 26330667.0, 1825385.0, 0.0, 232574.0, 3696868.0, 96520.0, 924861.0]
            }, {
                name: 'Plantas Solares',
                data: [357252.0, 203413.0, 26985181.0, 1062380.0, 49789.0, 2412067.0, 1995837.0, 184576.0, 11456.0]
            }
                , {
                name: 'Plantas De Carbon',
                data: [3177520.0, 29996101.0, 281328.0, 26382060.0, 273388.0, 30272201.0, 32180555.0, 1311203.0, 28552999.0]
            }]
        });
    }

    async function loadGraphHydroCompare() {


        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por plantas hidroeléctricas anualmente'
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
                data: [11142139.0, 3008775.0, 26330667.0, 1825385.0, 0.0, 232574.0, 3696868.0, 96520.0, 924861.0]
            }]
        });
    }

    async function loadGraphSolarCompare() {


        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por plantas solares anualmente'
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
                name: 'Plantas Solares',
                data: [357252.0, 203413.0, 26985181.0, 1062380.0, 49789.0, 2412067.0, 1995837.0, 184576.0, 11456.0]
            }
            ]
        });
    }

    async function loadGraphCarbonCompare() {


        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por plantas que utilizan carbon'
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
                name: 'Plantas De Carbon',
                data: [3177520.0, 29996101.0, 281328.0, 26382060.0, 273388.0, 30272201.0, 32180555.0, 1311203.0, 28552999.0]
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
        <p class="highcharts-description">En esta serie de graficas podemos observar como la cantidad de energia que
            producen estos estados Americanos</p>
        <h4>
            Grafica que compara todas las fuentes de produccion:
            <Button outline color="primary" on:click={loadGraphTotalCompare}>Cargar Datos</Button>

        </h4>

        <h4>
            Grafica que compara la produccion de las plantas hidroelectricas:
            <Button outline color="primary" on:click={loadGraphHydroCompare}>Cargar Datos</Button>
        </h4>

        <h4>
            Grafica que compara la produccion de plantas solares:
            <Button outline color="primary" on:click={loadGraphSolarCompare}>Cargar Datos</Button>
        </h4>

        <h4>
            Grafica que compara la produccion de las plantas que usan carbon:
            <Button outline color="primary" on:click={loadGraphCarbonCompare}>Cargar Datos</Button>
        </h4>


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