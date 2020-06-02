<script>
    import bb from "billboard.js/dist/billboard.pkgd";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph() {

        let MyData = [];
        let team = [];
        let victorias = [];
        let titulos = [];
        const resData = await fetch("api/v1/ucl_stats");
        MyData = await resData.json();
        team = MyData.map((MyData) => MyData.team);
        titulos = MyData.map((MyData) => MyData.title);

      

        var chart = bb.generate({
            data: {
                x: "x",
                columns: [
                    ["x", team[0], team[1], team[2], team[3], team[4], team[5],],
                    ["titulos", titulos[0], titulos[1], titulos[2], titulos[3], titulos[4], titulos[5],]
                ],
                type: "bar"
            },
            axis: {
                x: {
                    type: "category",
                    tick: {
                        rotate: 75,
                        multiline: false,
                        tooltip: true
                    },
                    height: 130
                }
            },
            bindto: "#rotateXAxisTickText"
        });

    };

    loadGraph();
</script>
<svelte:head>
    <script src="https://d3js.org/d3.v5.min.js"></script>
</svelte:head>


<main>
    <div id="rotateXAxisTickText"></div>
    <p>
        Gráfica donde se muestra el número total de titulos conseguidos por cada club.
    </p>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
<style>

</style>