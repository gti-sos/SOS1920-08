<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";



    async function loadGraph() {

        let datosEx =[];
        let datosGrafica = [];
        let datosGrafica1 = [];
        let datosGrafica2 = [];

        const resDataG6 = await fetch('https://restcountries.eu/rest/v2/regionalbloc/eu');
        datosEx = await resDataG6.json();


        for (var i in datosEx) {
            var utc1 = [];
            var utc2 = [];
            var utc3 = [];

            var time = datosEx[i].timezones.toString();
            if(time=="UTC+00:00"){
                utc1.push(datosEx.map(function (d) { return d["alpha2Code"] })[i]);
                datosGrafica.push(utc1);
            }else if(time =="UTC+01:00"){
                utc2.push(datosEx.map(function (d) { return d["alpha2Code"] })[i]);
                datosGrafica1.push(utc2);
            }else if(time =="UTC+02:00"){
                utc3.push(datosEx.map(function (d) { return d["alpha2Code"] })[i]);
                datosGrafica2.push(utc3);
            }
          
        }

       console.log(datosEx);
        console.log(datosGrafica);
        console.log(datosGrafica1);
        console.log(datosGrafica2);





        // Instantiate the map
        Highcharts.mapChart('container', {
            chart: {
                map: 'custom/europe',
                spacingBottom: 20
            },

            title: {
                text: 'Zonas horarias de Europa'
            },

            legend: {
                enabled: true
            },

            plotOptions: {
                map: {
                    allAreas: false,
                    joinBy: ['iso-a2', 'code'],
                    dataLabels: {
                        enabled: true,
                        color: '#FFFFFF',
                        style: {
                            fontWeight: 'bold'
                        },
                        // Only show dataLabels for areas with high label rank
                        format: null,
                        formatter: function () {
                            if (this.point.properties && this.point.properties.labelrank.toString() < 5) {
                                return this.point.properties['iso-a2'];
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '',
                        pointFormat: '{point.name}: <b>{series.name}</b>'
                    }
                }
            },

            series: [{

                name: 'UTC + 1',
                data: datosGrafica1.map(function (code) {
                    return { code: code };
                })
            }, {
                name: 'UTC + 2',
                data: datosGrafica2.map(function (code) {
                    return { code: code };
                })
            }]
        });






    }


</script>
<svelte:head>
    <script src="https://code.highcharts.com/maps/highmaps.js"></script>
    <script src="https://code.highcharts.com/maps/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/maps/modules/offline-exporting.js"></script>
    <script src="https://code.highcharts.com/maps/modules/data.js"></script>
    <script src="https://code.highcharts.com/mapdata/custom/europe.js" on:load="{loadGraph}"></script>
</svelte:head>
<main>
    <div id="container" style="height: 500px; min-width: 310px; max-width: 600px; margin: 0 auto"></div>
    <p>En esta gráfica recogemos un conjunto de datos de una API externa,</p>
    <p>gestinamos estos datos para mostrar en un mapa las diferentes zonas horarias de Europa</p>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>