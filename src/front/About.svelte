<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
</script>
<ul style="list-style-type:circle; font-size: 20px;">
    <li><a href="https://youtu.be/jX4D_DlTwq8">Video API Moto Gp (Francisco Jurado Garrido)</a></li>
    <li><a href="https://youtu.be/fJJSwVQETn8git">Video API UCL (Jose Carlos Molina Coloma)</a></li>
    <li><a href="https://youtu.be/vt8DtgXZaPU">Video API Electricity Angel Loaiza Davila)</a></li>
</ul>
<Button outline color="secondary" on:click="{pop}">Atrás</Button>