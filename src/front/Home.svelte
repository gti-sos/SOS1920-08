<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>
<main>


    <html lang="ES">
    <link rel="stylesheet" href="style.css">

    <body style="font-size: 15px;">
       
        <div class="cuerpo">
            <head>
                <title>SOS1920-08</title>
                <h1>SOS1920-08</h1>
                <img class="logo" src="logo-us.png" alt="Logo US">
            </head>
            <li>
                <strong>Teams:</strong>
            </li>
            <ul>
                <li>
                    <a href="https://github.com/franbornos6">Francisco Jurado Garrido</a>
                </li>
                <li>
                    <a href="https://github.com/josmolcol">Jose Carlos Molina Coloma</a>
                </li>
                <li>
                    <a href="https://github.com/angloadav">Angel Loaiza Davila</a>
                </li>
            </ul>
            <li>
                <strong>Project description: </strong>In this proyect we’ve tried to compare diferent things such as UCL, MotoGp and Energy Production</li>
            <li>
                <strong>Repository: </strong>
                <a href="https://github.com/gti-sos/SOS1920-08">gti-sos/SOS1920-08</a>
            </li>
            <li>
                <strong>URL: </strong>
                <a href="http://sos1920-08.herokuapp.com">http://sos1920-08.herokuapp.com</a>
            </li>
            <li>
                <strong>APIs: </strong>
            </li>
            <ul>
                <li>
                    <a href="https://sos1920-08.herokuapp.com/api/v1/motogp-statistics/docs/">
                        https://sos1920-08.herokuapp.com/api/v1/motogp-statistics/docs </a>(developed by
                    <a href="https://github.com/franbornos6">Francisco Jurado Garrido</a>)</li>
                <li>
                    <a href="https://documenter.getpostman.com/view/10690065/SztBa7m1">
                        https://sos1920-08.herokuapp.com/api/v1/ucl_stats/docs </a>(developed by
                    <a href="https://github.com/josmolcol">Jose Carlos Molina Coloma</a>)</li>
                <li>
                    <a href="https://sos1920-08.herokuapp.com/api/v1/electricity-produced-stats/docs">
                        https://sos1920-08.herokuapp.com/api/v1/electricity-produced-stats/docs </a>(developed by <a
                        href="https://github.com/angloadav">Angel Loaiza Davila</a>)</li>
            </ul>
            <li>
                <strong>Front-end: </strong>
            </li>
            <ul>
                <li style="padding-bottom: 1%">
                    <Button outline color="success"><a href="#/motogp-statistics">API MOTOGP</a></Button>
                    (developed by<a href="https://github.com/franbornos6">Francisco Jurado Garrido</a>)
                </li>

                <li style="padding-bottom: 1%"> 
                    <Button outline color="success"><a href="#/ucl_stats">API Ucl</a></Button>
                    (developed by<a href="https://github.com/josmolcol">Jose Carlos Molina Coloma</a>)
                </li>

                <li style="padding-bottom: 1%">
                    <Button outline color="success"><a href="#/electricity-produced-stats">API Electricidad</a></Button>
                    (developed by <a href="https://github.com/angloadav">Angel Loaiza Davila</a>)
                </li>
            </ul>
            <li>
                <strong>
                    <a href="#/integrations">Integrations</a>
                </strong>
            </li>
            <li>
                <strong>
                    <a href="#/analytics">Analytics</a>
                </strong>
            </li>
            <li>
                <strong>
                    <a href="#/about">About</a>
                </strong>
            </li>
        </div>
    </body>
</main>