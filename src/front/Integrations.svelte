<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>
<html lang="ES">

<head>
    <title>
        Integrations
    </title>
</head>

<body style="background-color: #fcfa90;">
    <div>
    <h1>SOS1920-08 Integrations</h1>

    <div style="text-align:left;padding-bottom: 1%">
        <Button outline color="primary" onclick="location.href='#/'">Inicio</Button>
    </div>

    <li style="font-size: 22px;"><strong>Moto Gp</strong></li>
    <ul style="list-style-type:circle; font-size: 20px;">
        <li><a href="#/motogp-graph/graphHC">Victorias y Podiums (Biblioteca Highcharts)</a></li>
        <li><a href="#/motogp-graph/graphAS">Titulos Mundiales (Biblioteca Awesome)</a></li>
        <li><a href="#/motogp-graph/graphExt1">Grafica Externa 1</a></li>
        <li><a href="#/motogp-graph/graphExt2">Grafica Externa 2</a></li>
        <li><a href="#/motogp-graph/graphG1">Grafica Grupo 1</a></li>
        <li><a href="#/motogp-graph/graphG2">Grafica Grupo 2</a></li>
        <li><a href="#/motogp-graph/graphG5">Grafica Grupo 5</a></li>
        <li><a href="#/motogp-graph/graphG7">Grafica Grupo 7</a></li>
        <li><a href="#/motogp-graph/graphG9">Grafica Grupo 9</a></li>
        <li><a href="#/motogp-graph/graphG22">Grafica Grupo 22</a></li>
    </ul>
    <li style="font-size: 22px;"><strong>Electricidad Producida</strong></li>
    <ul style="list-style-type:circle; font-size: 20px;">
        <li><a href="#/electricity-graph/graph">Electricidad producida por distintas fuentes(Biblioteca Highcharts)</a>
        </li>
        <li><a href="#/electricity-graph/awesomeGraph">Electricidad producida por distintas fuentes(Biblioteca
                Awesome)</a></li>

    </ul>
    <li style="font-size: 22px;"><strong>Ucl</strong></li>
    <ul style="list-style-type:circle; font-size: 20px;">
        <li><a href="#/ucl-graphic/graphHC">Victorias por partidos disputados</a></li>
        <li><a href="#/ucl-graphic/graphAS">Ttitulos UCl</a></li>
        <li><a href="#/ucl-graphic/grupo2">integracion datos grupo 2</a></li>
    </ul>
</div>
</body>

</html>