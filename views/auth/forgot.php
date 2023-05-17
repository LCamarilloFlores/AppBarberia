<h1 class="nombre-pagina">Recuperar Cuenta</h1>
<p class="descripcion-pagina">Reestablece tu password escribiendo tu e-mail a continuación</p>

<?php include_once __DIR__.'/../templates/alertas.php';?>

<form action="/forgot" method="POST" class="formulario">
    <div class="campo">
        <label for="email">E-mail</label>
        <input 
        type="email" 
        id="email" 
        placeholder="Tu E-mail"
        name="email">
    </div>

    <input type="submit" value="Enviar instrucciones" class="boton">
</form>


<div class="acciones">
        <a href="/">¿Ya tienes una cuenta? Inicia sesión</a>
        <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
</div>