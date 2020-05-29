<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var miAPI = "api/v1/motogp-statistics";
    var API2 = "https://sos1920-02.herokuapp.com/api/v2/traffic-accidents";

    async function loadGraph(){

        let dataG2 = [];
        let myData = [];
        let datosVictoria = [];
        let datosPilotos = [];
        let MyDataGraphD = [];
        let datosProvincias = [];
       

        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG2 = await resDataG2.json();

        datosPilotos = myData.map((myData)=> myData.pilot);

        datosVictoria = myData.map((myData)=> parseInt(myData.victory));

        dataG2.forEach( (x) => {
            if (x.year == 2018) {
                MyDataGraphD.push(parseInt(x.dead));
                datosProvincias.push(x.province);
            }
        });

        function makeTrace(i) {
            if (i == 0) {
                return {
                    x: datosPilotos,
                    y: Array.apply(null, datosVictoria),
                    line: { 
                        color: 'green'
                    },
                    visible: i === 0,
                    name: 'Victimas en accidentes',
                };
            } else if (i == 1) {
                return {
                    x: datosProvincias,
                    y: Array.apply(null, MyDataGraphD),
                    line: { 
                        color: 'black'
                    },
                    visible: i === 0,
                    name: 'Muertos',
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
                    label: 'Víctorias'
                }, {
                    method: 'restyle',
                    args: ['visible', [false, true]],
                    label: 'Fallecidos'
                }]
            }],
        });
        
        
    }

</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>


<main>
    
    <h3 style="text-align: center;"> Número de victorias por piloto y Número de accidentes de trafico con victimas por provincias en 2018</h3>

    <div id="graph"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
