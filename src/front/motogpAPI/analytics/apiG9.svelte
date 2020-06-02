<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var miAPI = "api/v1/motogp-statistics";
    var API9 = "https://sos1920-09.herokuapp.com/api/v2/renewable-sources-stats";

    async function loadGraph(){

        let dataG9 = [];
        let myData = [];
        let datosVictorias = [];
        let datosPilotos = [];
        let datosG9 = [];
        let datosPais = [];


        const resDataG9 = await fetch(API9);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG9 = await resDataG9.json();

        datosPilotos = myData.map((myData)=> myData.pilot);

        datosVictorias = myData.map((myData)=> parseInt(myData.victory));

        dataG9.forEach( (x) => {
            if (x.year == 2016) {
                datosG9.push(x["percentage-hydropower-total"]);
                datosPais.push(x.country);
            }
        });

        function makeTrace(i) {
            if (i == 0) {
                return {
                    x: datosPilotos,
                    y: Array.apply(null, datosVictorias),
                    line: { 
                        color: 'green'
                    },
                    visible: i === 0,
                    name: 'Victorias',
                };
            } else if (i == 1) {
                return {
                    x: datosPais,
                    y: Array.apply(null, datosG9),
                    line: { 
                        color: '#01D2EF'
                    },
                    visible: i === 0,
                    name: "%",
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
                    label: 'Victorias'
                }, {
                    method: 'restyle',
                    args: ['visible', [false, true]],
                    label: 'Energia Hidroeléctrica'
                }, {
                    method: 'restyle',
                    args: ['visible', [true, true]],
                    label: 'Gráfica Conjunta'
                }]
            }],
        });


    }

</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>


<main>
    <h3 style="text-align: center;"> Número de Victorias por piloto y Porcentaje de Energia Hidroeléctrica en 2016</h3>

    <div id="graph"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
