<div class="nombre-pagina"><h1>Recuperar Cuenta</h1></div>
<p class="descripcion-pagina">Ingrese la nueva contraseña</p>

<?php include_once __DIR__.'/../templates/alertas.php';
if(!$error){ ?>


<form method="POST" class="formulario">
    <div class="campo">
        <label for="password">Password: </label>
        <input 
        type="password" 
        name="password" 
        id="password"
        placeholder="Nueva contraseña"
        >
    </div>

    <input type="submit" class="boton" value="Actualizar Contraseña">
</form>
<?php } ?>
<div class="acciones">
    <a href="/">Ya tienes cuenta? Inicia sesión</a>
    <a href="/crear-cuenta">Crea una cuenta.</a>
</div>