<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
</script>

Página Grafica externa 2
<main>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
