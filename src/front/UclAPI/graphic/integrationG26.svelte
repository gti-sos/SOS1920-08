<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    var uclApi = "api/v1/ucl_stats";
    var ApiGrupo1 = "http://sos1920-26.herokuapp.com/api/v2/global-transfers";

    async function loadGraph() {

    
        const resData = await fetch(uclApi);
        MyData = await resData.json();

        const resDataG2 = await fetch(ApiGrupo1);
        ExData = await resDataG2.json();

 


    }






</script>

<svelte:head>
    
</svelte:head>


<main>
    
        <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
<style>

</style>