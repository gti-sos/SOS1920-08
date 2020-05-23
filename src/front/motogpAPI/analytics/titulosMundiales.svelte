<canvas id="myChart" width="400" height="400"></canvas>
<script>

    async function loadGraph(){
        let MyData = [];
        let pilotos = [];
        let titulosMundiales= [];

        const resData = await fetch("api/v1/motogp-statistics");
        MyData = await resData.json();
        
        pilotos = MyData.map((MyData)=> MyData.pilot);
        titulosMundiales = MyData.map((MyData)=> MyData.world_title);

        var ctx = document.getElementById('myDoughnutChart').getContext('2d');

        var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: titulosMundiales
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: pilotos
        },
        options: options
    });
    }

</script>

<svelte:head>
    <script src="path/to/chartjs/dist/Chart.js" on:load="{loadGraph}"></script>
</svelte:head>


<main>


</main>