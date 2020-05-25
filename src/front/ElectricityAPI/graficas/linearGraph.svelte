<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    async function loadGraphTotalCompare() {
        let Data = [];
        let State = [];
        let Hydro = [];
        let Solar = [];
        let Coal = [];
        const resData = await fetch("api/v1/electricity-produced-stats");
        Data = await resData.json();
        State = Data.map((Data) => Data.state);
        Hydro = Data.map((Data) => Data.hydro);
        Solar = Data.map((Data) => Data.solar);
        Coal = Data.map((Data) => Data.coal);
        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por distintas fuentes anualmente'
            },
            subtitle: {
                text: 'Source: A PDF '
            },
            xAxis: {
                categories: State
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
                data: Hydro
            }, {
                name: 'Plantas Solares',
                data: Solar
            }
                , {
                name: 'Plantas De Carbon',
                data: Coal
            }]
        });
    }

    async function loadGraphHydroCompare() {

        let Data = [];
        let State = [];
        let Hydro = [];

        const resData = await fetch("api/v1/electricity-produced-stats");
        Data = await resData.json();
        State = Data.map((Data) => Data.state);
        Hydro = Data.map((Data) => Data.hydro);

        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por plantas Hidroeléctricas'
            },
            subtitle: {
                text: 'Source: A PDF'
            },
            xAxis: {
                categories: State
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
                data: Hydro
            }]
        });
    }

    async function loadGraphSolarCompare() {


        let Data = [];
        let State = [];
        let Solar = [];

        const resData = await fetch("api/v1/electricity-produced-stats");
        Data = await resData.json();
        State = Data.map((Data) => Data.state);
        Solar = Data.map((Data) => Data.solar);

        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por plantas Solares'
            },
            subtitle: {
                text: 'Source: A PDF'
            },
            xAxis: {
                categories: State
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
                data: Solar
            }]
        });
    }

    async function loadGraphCarbonCompare() {


        let Data = [];
        let State = [];
        let Coal = [];

        const resData = await fetch("api/v1/electricity-produced-stats");
        Data = await resData.json();
        State = Data.map((Data) => Data.state);
        Coal = Data.map((Data) => Data.coal);

        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Electricidad producida por plantas de Carbon'
            },
            subtitle: {
                text: 'Source: A PDF'
            },
            xAxis: {
                categories: State
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
                data: Coal
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

    <body style="background-color: #e6f0ff;">
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
            <h3>
                Pagina principal:
                <Button outline color="secondary" on:click="{pop}">Back</Button>
            </h3>

        </figure>
    </body>
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