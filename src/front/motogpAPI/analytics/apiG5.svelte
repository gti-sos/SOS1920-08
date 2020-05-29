<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var miAPI = "api/v1/motogp-statistics";
    var API5 = "https://sos1920-05.herokuapp.com/api/v1/health_public";

    async function loadGraph(){

        let dataG5 = [];
        let myData = [];
        let datosTitulos = [];
        let datosPilotos = [];
        let datosG5 = [];
        let datosPais = [];


        const resDataG5 = await fetch(API5);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG5 = await resDataG5.json();

        datosPilotos = myData.map((myData)=> myData.pilot);

        datosTitulos = myData.map((myData)=> parseInt(myData.world_title));

        dataG5.forEach( (x) => {
            if (x.year == 2015) {
                datosG5.push(x.public_spending);
                datosPais.push(x.country);
            }
        });

        function makeTrace(i) {
            if (i == 0) {
                return {
                    x: datosPilotos,
                    y: Array.apply(null, datosTitulos),
                    line: { 
                        color: 'yellow'
                    },
                    visible: i === 0,
                    name: 'Titulos Mundiales',
                };
            } else if (i == 1) {
                return {
                    x: datosPais,
                    y: Array.apply(null, datosG5),
                    line: { 
                        color: 'turquoise'
                    },
                    visible: i === 0,
                    name: 'Gasto en Salud Pública',
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
                    label: 'Titulos Mundiales'
                }, {
                    method: 'restyle',
                    args: ['visible', [false, true]],
                    label: 'Gasto en Salud Pública'
                }]
            }],
        });


    }

</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>



<main>
    <h3 style="text-align: center;"> Número de Titulos por piloto y Gasto en Salud Pública por Pais en 2015</h3>

    <div id="graph"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>


