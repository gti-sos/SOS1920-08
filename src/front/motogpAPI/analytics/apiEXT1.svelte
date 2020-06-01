<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "api/v1/motogp-statistics";
    var APIExt1 = "https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/hon?format=json";


    async function loadGraph() {

        let data2 = [];
        let motoU = [];
        let motoB = [];
        let motoC = [];
        let motoJ = [];
        let motoS = [];
        let dataGP = [];
        let graficaGP = [];


        const resData = await fetch(APIExt1);
        data2 = await resData.json();
        data2 = data2.Results

        const resData2 = await fetch(miAPI);
        dataGP = await resData2.json();

       
        data2.forEach((x) => {
            if (x.VehicleType == "Motorcycle" && x.Country == "UNITED STATES (USA)")
                motoU.push({name: x.Name, value: motoU.length+1});
            if(x.VehicleType == "Motorcycle" && x.Country == "BELGIUM")
                motoB.push({name: x.Name, value: motoB.length+1});
            if(x.VehicleType == "Motorcycle" && x.Country == "CHINA")
                motoC.push({name: x.Name, value: motoC.length+1});
            if(x.VehicleType == "Motorcycle" && x.Country == "JAPAN")
                motoJ.push({name: x.Name, value: motoJ.length+1});
            if(x.VehicleType == "Motorcycle" && x.Country == "SPAIN")
                motoS.push({name: x.Name, value: motoS.length+1});
        });

        dataGP.forEach((x) => {
            graficaGP.push({ name: x.pilot, value: parseInt(x.world_title) });
        });

       
        let passengerCar = [
            {
                name:"Fábricas en Estados Unidos" +" -> "+ motoU.length, 
                data: motoU
            },
            {
                name:"Fábricas en Bélgica"+" -> "+ motoB.length, 
                data: motoB
            },
            {
                name:"Fábricas en China"+" -> "+ motoC.length, 
                data: motoC
            },
            {
                name:"Fábricas en Japón"+" -> "+ motoJ.length, 
                data: motoJ
            },
            {
                name:"Fábricas en España"+" -> "+ motoS.length, 
                data: motoS
            },
            {
                name:"Titulos MotoGp", 
                data: graficaGP
            }
          
        ];      


        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '50%'
            },
            title: {
                text: 'Fábricas de Motocicletas y Titulos Mundiales de MotoGP'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}</sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '20%',
                    maxSize: '100%',
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
            series: passengerCar
        });


    };
    loadGraph();
</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" ></script>
    <script src="https://code.highcharts.com/highcharts-more.js" ></script>
    <script src="https://code.highcharts.com/modules/exporting.js" ></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"  on:load="{loadGraph}"></script>

</svelte:head>
<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
           En esta gráfica se muestra el número de empresas de motocicletas en diferentes paises, junto con el número de titulos mundiales de algunos pilotos de Moto Gp.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
<style>
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 320px;
        max-width: 800px;
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
        background: #f8f8f8;
    }

    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
</style>
