<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var miAPI = "api/v1/motogp-statistics";
    var API7 = "https://sos1920-07.herokuapp.com/api/v2/foodsImports";

    async function loadGraph(){

        let dataG7 = [];
        let myData = [];
        let datosPodiums = [];
        let datosPilotos = [];
        let datosG7 = [];
        let datosPais = [];


        const resDataG7 = await fetch(API7);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG7 = await resDataG7.json();

        datosPilotos = myData.map((myData)=> myData.pilot);

        datosPodiums = myData.map((myData)=> parseInt(myData.podium));

        dataG7.forEach( (x) => {
            if (x.year == 2017) {
                datosG7.push(x.fruitJuice);
                datosPais.push(x.name);
            }
        });

        function makeTrace(i) {
            if (i == 0) {
                return {
                    x: datosPilotos,
                    y: Array.apply(null, datosPodiums),
                    line: { 
                        color: 'red'
                    },
                    visible: i === 0,
                    name: 'Podiums',
                };
            } else if (i == 1) {
                return {
                    x: datosPais,
                    y: Array.apply(null, datosG7),
                    line: { 
                        color: '#28FC19'
                    },
                    visible: i === 0,
                    name: "Toneladas",
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
                    label: 'Importaciones'
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
    <h3 style="text-align: center;"> Número de Podiums por piloto e Importaciones de Zumo de Frutas a EEUU en 2017</h3>

    <div id="graph"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
