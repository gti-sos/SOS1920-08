<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    async function loadChart() {
        Morris.Bar({
            element: 'bar-example',
            data: [
                {
                    state: 'Alabama',
                    hydro: 11142139,
                    solar: 357252,
                    coal: 3177520
                },
                {
                    state: 'Arkansas',
                    hydro: 3008775,
                    solar: 203413,
                    coal: 29996101
                },
                {
                    state: 'California',
                    hydro: 26330667,
                    solar: 26985181,
                    coal: 281328
                },
                {
                    state: 'Colorado',
                    hydro: 1825385,
                    solar: 1062380,
                    coal: 26382060
                },
                {
                    state: 'Delaware',
                    hydro: 0,
                    solar: 49789,
                    coal: 273388
                },
                {
                    state: 'Florida',
                    hydro: 232574,
                    solar: 2412067,
                    coal: 30272201
                },
                {
                    state: 'Georgia',
                    hydro: 3696868,
                    solar: 1995837,
                    coal: 32180555
                },
                {
                    state: 'Hawaii',
                    hydro: 96520,
                    solar: 184576,
                    coal: 1311203
                },
                {
                    state: 'Iowa',
                    hydro: 924861,
                    solar: 11456,
                    coal: 28552999

                }
            ],
            xkey: 'state',
            ykeys: ['hydro', 'solar', 'coal'],
            labels: ['Hidroeléctricas', 'Solares', 'Carbon'],
            resize: true,
            hideHover: 'auto',
            barColors: ['#03dbfc', '#fcdb03', '#5c5c5c'],
            gridTextSize: 20
        });
    }

</script>


<svelte:head>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>

</svelte:head>

<html lang="ES">

<head>

    <meta charset=utf-8 />
    <title>Libreria Awesome-Charts/Morris</title>
</head>

<body style="background-color: #b0f2f7; border-radius: 1%;">
    <div id="bar-example"></div>
    <h4 style="text-align: center;">En esta grafica podemos observar una comparacion de la cantidad de energia que se
        produce gracias a las plantas
        Hidroeléctricas, plantas solares y plantas de carbon</h4>
        <div>
        <Button outline color="primary" on:click={loadChart}>Cargar Datos</Button>
    
       
        <Button outline color="secondary" on:click="{pop}">Back</Button>
    </div>
</body>

</html>