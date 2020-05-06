<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>
<main>


    <html lang="en">
    <link rel="stylesheet" href="style.css">

    <body>       
        <div class="cuerpo">
            <ul>
                <title>SOS1920-08</title>
                <img class="logo" src="logo-us.png" alt="Logo US">
            </ul>
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
                <strong>Project description: </strong>In this proyect we’ve tried to compare diferent things such as
                Cars, Bikes and Energy Production</li>
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
                    <a href="https://sos1920-08.herokuapp.com/api/v1/ucl_stats/docs">
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
                <li style="padding: 1%">
                    <Button outline color="success"><a href="#/motogp-statistics">API MOTOGP</a></Button>
                    (developed by<a href="https://github.com/franbornos6">Francisco Jurado Garrido</a>)
                </li>

                <li  style="padding: 1%">
                    <Button outline color="success"><a href="#/ucl_stats">API Ucl</a></Button>
                    (developed by<a href="https://github.com/josmolcol">Jose Carlos Molina Coloma</a>)
                </li>

                <li  style="padding: 1%">
                    <Button outline color="success"><a href="#/electricity-produced-stats">API Electricidad</a></Button>
                    (developed by <a href="https://github.com/angloadav">Angel Loaiza Davila</a>)
                </li>
            </ul>
        </div>
    </body>
</main>