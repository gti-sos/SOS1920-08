<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadChuck() {
        var joke1, joke2, joke3;
        const resData = await fetch('https://api.chucknorris.io/jokes/random');
        const resDatajson = await resData.json();
        joke1 = JSON.stringify(resDatajson);
        localStorage.setItem("joke", joke1);
        joke2= localStorage.getItem("joke");
        joke3 = JSON.parse(joke2);
        document.getElementById("joke").innerHTML = joke3.value;

    }

</script>

<main>

    <body>


        <Button outline color="primary" on:click="{loadChuck}">Cargar Datos</Button>
        <Button outline color="secondary" on:click="{pop}">Back</Button>


    </body>
</main>