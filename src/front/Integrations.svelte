<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>
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

    <li><strong>Moto Gp</strong></li>
        <ul style="list-style-type:circle;">
            <li><a href="#/motogp-graph/graphHC">Victorias y Podiums (Biblioteca Highcharts)</a></li>
            <li><a href="#/motogp-graph/graphAS">Titulos Mundiales (Biblioteca Awesome)</a></li>
        </ul>
</body>
