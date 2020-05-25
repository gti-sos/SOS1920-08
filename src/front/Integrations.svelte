<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>
<html lang="ES">

<head>
    <title>
        Integrations
    </title>
</head>

<body>
    <h1>SOS1920-08 Integrations</h1>

    <div style="text-align:left;padding-bottom: 1%">
        <Button outline color="primary" onclick="location.href='#/'">Inicio</Button>
    </div>

    <li style="font-size: 175%;"><strong>Moto Gp</strong></li>
    <ul style="list-style-type:circle; font-size: 125%;">
        <li><a href="#/motogp-graph/graphHC">Victorias y Podiums (Biblioteca Highcharts)</a></li>
        <li><a href="#/motogp-graph/graphAS">Titulos Mundiales (Biblioteca Awesome)</a></li>
    </ul>
    <li style="font-size: 175%;"><strong>Electricidad Producida</strong></li>
    <ul style="list-style-type:circle; font-size: 125%;">
        <li><a href="#/electricity-graph/graph">Electricidad producida por distintas fuentes(Biblioteca Highcharts)</a>
        </li>
        <li><a href="#/electricity-graph/awesomeGraph">Electricidad producida por distintas fuentes(Biblioteca
                Awesome)</a></li>

    </ul>
    <li style="font-size: 175%;"><strong>Ucl</strong></li>
    <ul style="list-style-type:circle; font-size: 125%;">
        <li><a href="#/ucl-graphic/graphHC">Victorias por partidos disputados</a></li>
        <li><a href="#/ucl-graphic/graphAS">Ttitulos UCl</a></li>
    </ul>
</body>

</html>