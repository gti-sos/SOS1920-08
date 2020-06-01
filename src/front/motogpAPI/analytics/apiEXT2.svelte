<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var miAPI = "api/v1/motogp-statistics";
    var APIExt2 = "https://restcountries.eu/rest/v2/region/europe";


    async function loadGraph() {

        let data2 = [];
        let pais = [];
        let dataGP = [];
        let graficaGP = [];
        let datosGrafica = [];


        const resData = await fetch(APIExt2);
        data2 = await resData.json();
       

        const resData2 = await fetch(miAPI);
        dataGP = await resData2.json();


        data2.forEach((x) => {
            pais.push({name: x.name, value: x.population});
        });

        dataGP.forEach((x) => {
            graficaGP.push({ name: x.pilot, value: parseInt(x.victory) });
        });

console.log(pais);
        datosGrafica = [
            {
                name:"Paises de Europa y su población", 
                data: pais
            },
            {
                name:"Victorias MotoGp", 
                data: graficaGP
            }
        
        ];      


        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '60%'
            },
            title: {
                text: 'Paises de Europa con su población y Victorias de MotoGP'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}</sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '20%',
                    maxSize: '60%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        gravitationalConstant: 0.05,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: true,
                        parentNodeLimit: true
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
            series: datosGrafica
        });


    };
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" defer></script>
    <script src="https://code.highcharts.com/highcharts-more.js" defer></script>
    <script src="https://code.highcharts.com/modules/exporting.js" defer></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" defer on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p style="text-align: center" class="highcharts-description">
            En esta gráfica se muestra los paises de Europa con su población, junto con el número de victorias de algunos pilotos de Moto Gp.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
<style>
    body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 500px;
  overflow: hidden;
}
</style>