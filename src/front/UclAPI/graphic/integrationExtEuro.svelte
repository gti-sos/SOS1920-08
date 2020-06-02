<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";



    async function loadGraph() {

        let datosGrafica = [];
        let datosGrafica2 = [];


        const resDataG6 = await fetch('https://restcountries.eu/rest/v2/regionalbloc/eu');
        const datosEx = await resDataG6.json();

        for (var i in datosEx) {
            var utc1 = [];
            var utc2 = [];
            var utc3 = [];

            utc1.push(datosEx.map(function (d) { return d["alpha2Code"] })[i]);
            utc1.push(datosEx.map(function (d) { return toString(d["timezones"]) })[i]);

            datosGrafica.push(utc1);



        }


        //console.log(datosEx);
        console.log(datosGrafica);





        // Instantiate the map
        Highcharts.mapChart('container', {
            chart: {
                map: 'custom/europe',
                spacingBottom: 20
            },

            title: {
                text: 'Europe time zones'
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
                name: 'UTC',
                data: ['IE', 'IS', 'GB', 'PT'].map(function (code) {
                    return { code: code };
                })
            }, {
                name: 'UTC + 1',
                data: ['NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL', 'CZ', 'AT', 'CH', 'LI', 'SK', 'HU',
                    'SI', 'IT', 'SM', 'HR', 'BA', 'YF', 'ME', 'AL', 'MK'].map(function (code) {
                        return { code: code };
                    })
            }, {
                name: 'UTC + 2',
                data: ['FI', 'EE', 'LV', 'LT', 'BY', 'UA', 'MD', 'RO', 'BG', 'GR', 'TR', 'CY'].map(function (code) {
                    return { code: code };
                })
            }, {
                name: 'UTC + 3',
                data: [{
                    code: 'RU'
                }]
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
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>