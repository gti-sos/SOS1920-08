<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var miAPI = "api/v1/motogp-statistics";
    var API22 = "https://sos1920-22.herokuapp.com/api/v2/formula-stats";

    async function loadGraph() {

        let MyData = [];
        let dataG22 = [];
    

        const resDataG22 = await fetch(API22);
        const resData = await fetch(miAPI);

        MyData = await resData.json();
        dataG22 = await resDataG22.json();

    let datosMotoGp = MyData.map((d) => {
            let res = {
                name: d.country,
                values: d["world_title"]
            };
            return res;
        });

    let datosG22 = dataG22.map((d) => {
            let res = {
                name: d.country,
                values: d["totalpointnumber"]
            };
            return res;
        });


        let dataGraph = 
            [
                {
                    name: "Numero de titulos mundiales de MotoGp",
                    data: datosMotoGp
                },
                {
                    name: "Puntos Totales de F1",
                    data: datosG22
                }
            ];

            
    console.log(dataGraph);



        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%'
            },
            title: {
                text: ''
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '120%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02
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
            series: dataGraph
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <h3 style="text-align: center;"> Titulos de Moto GP y Total de puntos de F1</h3>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
        Integracion con Grupo 22    
        </p>
    </figure>

    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>

