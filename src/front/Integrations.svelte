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
        <h1>Integrations</h1>

        <div style="text-align:left;padding-bottom: 1%">
            <Button outline color="primary" onclick="location.href='#/'">Inicio</Button>
        </div>

        <li style="font-size: 22px;"><strong>Moto Gp</strong></li>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/motogp-graph/graphHC">Victorias y Podiums (Biblioteca Highcharts)</a></li>
            <li><a href="#/motogp-graph/graphAS">Titulos Mundiales (Biblioteca Awesome)</a></li>
            <li><a href="#/motogp-graph/graphExt1">Integración Grafica Externa 1</a></li>
            <li><a href="#/motogp-graph/graphExt2">Integración Grafica Externa 2</a></li>
            <li><a href="#/motogp-graph/graphG1">Integración Grafica Grupo 1</a></li>
            <li><a href="#/motogp-graph/graphG2">Integración Grafica Grupo 2</a></li>
            <li><a href="#/motogp-graph/graphG5">Integración Grafica Grupo 5</a></li>
            <li><a href="#/motogp-graph/graphG7">Integración Grafica Grupo 7</a></li>
            <li><a href="#/motogp-graph/graphG9">Integración Grafica Grupo 9</a></li>
            <li><a href="#/motogp-graph/graphG22">Integración Grafica Grupo 22</a></li>
        </ul>
        <li style="font-size: 22px;"><strong>Electricidad Producida</strong></li>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/electricity-graph/graph">Electricidad producida por distintas fuentes(Biblioteca
                    Highcharts)</a></li>
            <li><a href="#/electricity-graph/awesomeGraph">Electricidad producida por distintas fuentes(Biblioteca
                    Awesome)</a></li>
            <li><a href="#/electricity-graph/graficaGrupo9"> Grafica de comparacion de la Api del grupo 9 Plugin-Vehicles</a></li>
            <li><a href="#/electricity-graph/graficaGrupo2"> Grafica de comparacion de la Api del grupo 2 Evolution-of-cycling-routes</a></li>
            <li><a href="#/electricity-graph/graficaGrupo23"> Grafica de comparacion de la Api del grupo 23 Cigarrete-Sales</a></li>
            <li><a href="#/electricity-graph/graficaGrupo12"> Grafica de comparacion de la Api del grupo 12 Overdose-Deaths</a></li>
            <li><a href="#/electricity-graph/graficaGrupo06"> Grafica de comparacion de la Api del grupo 06 Acc-Stats</a></li>
            <li><a href="#/electricity-graph/graficaGrupo24"> Grafica de comparacion de la Api del grupo 24 Atc-Stats</a></li>
            <li><a href="#/electricity-graph/graficaGrupo01"> Grafica de comparacion de la Api del grupo 01 Poverty-Stats</a></li>
            <li><a href="#/electricity-graph/graficaExt1"> Grafica de comparacion de la Api Externa 1</a></li>
            <li><a href="#/electricity-graph/graficaExt2"> Grafica de comparacion de la Api Externa 2</a></li>

    </ul>
    <li style="font-size: 22px;"><strong>Ucl</strong></li>
    <ul style="list-style-type:circle; font-size: 20px;">
        <li><a href="#/ucl-graphic/graphHC">Victorias por partidos disputados</a></li>
        <li><a href="#/ucl-graphic/graphAS">Ttitulos UCl</a></li>
        <li><a href="#/ucl-graphic/grupo1">integracion datos grupo 1</a></li>
        <li><a href="#/ucl-graphic/grupo2">integracion datos grupo 2</a></li>
        <li><a href="#/ucl-graphic/grupo6">integracion datos grupo 6</a></li>
        <li><a href="#/ucl-graphic/grupo26">integracion datos grupo 26</a></li>
        <li><a href="#/ucl-graphic/extBike">integracion datos externos bicis</a></li>
        <li><a href="#/ucl-graphic/extCars">integracion datos externos vehiculos</a></li>
        <li><a href="#/ucl-graphic/extEuro">integracion datos externos Europa</a></li>
    </ul>
</div>
</body>

</html>