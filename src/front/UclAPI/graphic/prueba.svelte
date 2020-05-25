<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";

  async function loadGraph() {

    let MyData = [];
    let team = [];
    let victorias = [];
    let partidos = [];
    

    const resData = await fetch("api/v1/ucl_stats");
    MyData = await resData.json();

    team = MyData.map((MyData) => MyData.team);
    victorias = MyData.map((MyData) => MyData.victory);
    partidos = MyData.map((MyData) => MyData.match);
   
    //console.log(victorias.length);
    //console.log(partidos.length);


    Highcharts.chart('container', {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Relacion partidos victorias'
      },
      subtitle: {
        text: 'Equipos que han participado en la competición',
        align: 'right',
        verticalAlign: 'bottom'
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
      },
      xAxis: {
        categories: team
      },
      yAxis: {
        title: {
          text: 'Total Partidos'
        }
      },
      plotOptions: {
        area: {
          fillOpacity: 0.5
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'partidos',
        data: partidos
      }, {
        name: 'victorias',
        data: victorias
      }]
    });

  };
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>

</svelte:head>


<main>
  <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
      En esta grafica se muestra la relación entre partidos disputados y victorias por cada club
    </p>
  </figure>

  <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
<style>
  #container {
    height: 400px;
  }

  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 350px;
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