<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var uclApi = "api/v1/ucl_stats";
    var ApiGrupo2 = "https://sos1920-02.herokuapp.com/api/v2/rural-tourism-stats";

    async function loadGraph() {

        let MyData = [];
        let ExData = [];
        let team = [];
        let title = [];
        let datosGrafica = [];
        let datosProvincias = [];

        const resData = await fetch(uclApi);
        MyData = await resData.json();

        const resDataG2 = await fetch(ApiGrupo2);
        ExData = await resDataG2.json();

        ExData.forEach((x) => {
            if (x.year == 2015) {
                datosGrafica.push(parseInt(x.overnightstay/1000));
                datosProvincias.push(x.province);
            }
        });

        MyData.forEach((x) => {
            if (x.country == "Spain") {
                team.push(x.team);
                title.push(x.title);
            }
        });

        console.log(team);

        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            var chart = am4core.create("chartdiv", am4charts.PieChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            chart.data = [
                {
                    country: team[0],
                    value: title[0]
                },
                {
                    country: team[1],
                    value: title[1]
                },
                {
                    country: datosProvincias[0],
                    value: datosGrafica[0],
                },
                {
                    country: datosProvincias[1],
                    value: datosGrafica[1]
                }
            ];
            chart.radius = am4core.percent(70);
            chart.innerRadius = am4core.percent(40);
            chart.startAngle = 180;
            chart.endAngle = 360;

            var series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = "value";
            series.dataFields.category = "country";

            series.slices.template.cornerRadius = 10;
            series.slices.template.innerCornerRadius = 7;
            series.slices.template.draggable = true;
            series.slices.template.inert = true;
            series.alignLabels = false;

            series.hiddenState.properties.startAngle = 90;
            series.hiddenState.properties.endAngle = 90;

            chart.legend = new am4charts.Legend();

        });




    }






</script>

<svelte:head>
    <script src="https://www.amcharts.com/lib/4/core.js"></script>
    <script src="https://www.amcharts.com/lib/4/charts.js"></script>
    <script src="https://www.amcharts.com/lib/4/themes/animated.js" on:load="{loadGraph}"></script>

</svelte:head>


<main>



    <div id="chartdiv"></div>
    <p>
        En esta gráfica se miden el impacto en la consecución de un titulo europeo por un equipo nacional
        en los viajeros que pernoctan en una localidad
    </p>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
<style>
    #chartdiv {
        width: 100%;
        height: 500px;
    }
</style>