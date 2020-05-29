<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var miAPI = "https://sos1920-08.herokuapp.com/api/v1/motogp-statistics";
    var API1 = "https://sos1920-01.herokuapp.com/api/v2/emigrants-stats";

    async function loadGraph(){

        let dataG1 = [];
        let myData = [];
        let datosPodium = [];
        let datosPilotos = [];
        let dataMujer = [];
        let datosPais = [];


        const resDataG1 = await fetch(API1);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG1 = await resDataG1.json();

        datosPilotos = myData.map((myData)=> myData.pilot);

        datosPodium = myData.map((myData)=> parseInt(myData.podium));

        dataG1.forEach( (x) => {
            if (x.year == 2017) {
                dataMujer.push(parseInt(x.em_woman));
                datosPais.push(x.country);
            }
        });

        function makeTrace(i) {
            if (i == 0) {
                return {
                    x: datosPilotos,
                    y: Array.apply(null, datosPodium),
                    line: { 
                        color: 'red'
                    },
                    visible: i === 0,
                    name: 'Podiums',
                };
            } else if (i == 1) {
                return {
                    x: datosPais,
                    y: Array.apply(null, dataMujer),
                    line: { 
                        color: 'blue'
                    },
                    visible: i === 0,
                    name: 'Emigraciones',
                };
            }
            
        }
        Plotly.plot('graph', [0, 1].map(makeTrace), {
            updatemenus: [{
                y: 1,
                yanchor: 'top',
                buttons: [{
                    method: 'restyle',
                    args: ['visible', [true, false]],
                    label: 'Podiums'
                }, {
                    method: 'restyle',
                    args: ['visible', [false, true]],
                    label: 'Emigraciones de Mujeres'
                }]
            }],
        });


        }
    
</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>


<main>
    <h3 style="text-align: center;"> Número de podiums por piloto y Número de Emigraciones de Mujeres en 2017</h3>

    <div id="graph"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
    
</main>
