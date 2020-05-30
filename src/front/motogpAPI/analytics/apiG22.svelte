<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var miAPI = "api/v1/motogp-statistics";
    var API22 = "https://sos1920-22.herokuapp.com/api/v2/formula-stats";

    async function loadGraph(){

        let dataG22 = [];
        let myData = [];
        let datosTitulos = [];
        let datosPilotos = [];
        let datosG22 = [];
        let datosPais = [];


        const resDataG22 = await fetch(API22);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG22 = await resDataG22.json();

        datosPilotos = myData.map((myData)=> myData.pilot);

        datosTitulos = myData.map((myData)=> parseInt(myData.world_title));

        dataG22.forEach( (x) => {
           
                datosG22.push(x.totalpointnumber);
                datosPais.push(x.country);
            
        });

        function makeTrace(i) {
            if (i == 0) {
                return {
                    x: datosPilotos,
                    y: Array.apply(null, datosTitulos),
                    line: { 
                        color: '#EBDF00'
                    },
                    visible: i === 0,
                    name: 'Titulos Mundiales',
                };
            } else if (i == 1) {
                return {
                    x: datosPais,
                    y: Array.apply(null, datosG22),
                    line: { 
                        color: 'orange'
                    },
                    visible: i === 0,
                    name: "Puntos",
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
                    label: 'Titulos'
                }, {
                    method: 'restyle',
                    args: ['visible', [false, true]],
                    label: 'Total de Puntos'
                }]
            }],
        });


    }

</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <h3 style="text-align: center;"> Número de Titulos Mundiales por Piloto y Total de Puntos de F1</h3>

    <div id="graph"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>