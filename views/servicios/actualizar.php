<h1 class="nombre-pagina">Actualizar Servicio</h1>
<p class="descripcion-pagina">Modifique los datos del servicio.</p>

<?php include_once __DIR__ . "/../templates/alertas.php"; ?>

<form action="/servicios/actualizar" method="POST" class="formulario">
    <input type="hidden" name="id" id="id" value="<?php echo $servicio->id;?>">
    <?php include_once "formulario.php"; ?>

<input type="submit" class="boton" value="Actualizar">
</form>