<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
  
  async function loadGraph(){

    let MyData = [];
    let pilot = [];
    let world_title= [];
    

    const resData = await fetch("api/v1/motogp-statistics");
    MyData = await resData.json();

    MyData.forEach( (x) => {
        world_title.push({pilot: x.pilot, titles: parseInt(x.world_title)})
    });
    
    am4core.ready(function() {

      // Themes begin
      am4core.useTheme(am4themes_kelly);
      am4core.useTheme(am4themes_animated);
      // Themes end

      var chart = am4core.create("chartdiv", am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.legend = new am4charts.Legend();
      chart.legend.position = "right";

      chart.data = world_title;

      chart.innerRadius = 100;

      var series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "titles";
      series.dataFields.category = "pilot";

      }); // end am4core.ready()
  }

  loadGraph();
</script>

<svelte:head>
   <!--En public/index.html-->
</svelte:head>


<main>
    <div><h6 style="text-align: center">Gráfica de número de titulos mundiales por pilotos.</h6></div>
    <div id="chartdiv"></div>

    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>

<style>
    #chartdiv {
      width: 90%;
      height: 500px;
      border: 1px solid black;
      margin: 10px auto;
    } 
    
</style>

