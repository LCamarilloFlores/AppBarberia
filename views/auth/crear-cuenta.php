<h1 class="nombre-pagina">Crear Cuenta</h1>
<p class="descripcion-pagina">Llena el siguiente formulario para crear una cuenta</p>
<?php include_once __DIR__.'/../templates/alertas.php';?>
<form action="/crear-cuenta" method="POST" class="formulario">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
        type="text"
        placeholder="Tu Nombre"
        name="nombre"
        id="nombre"
        value="<?php echo s($usuario->nombre);?>">
    </div>

    <div class="campo">
        <label for="apellido">Apellido:</label>
        <input 
        type="text"
        placeholder="Tu Apellido"
        name="apellido"
        id="apellido"
        value="<?php echo s($usuario->apellido);?>">
    </div>

<div class="campo">
    <label for="telefono">Teléfono:</label>
    <input 
    type="tel"
    placeholder="Tu Teléfono"
    name="telefono"
    id="telefono"
        value="<?php echo s($usuario->telefono);?>">
</div>

<div class="campo">
    <label for="email">E-Mail:</label>
    <input 
    type="email"
    placeholder="Tu E-Mail"
    name="email"
    id="email"
    value="<?php echo s($usuario->email);?>">
</div>

<div class="campo">
    <label for="password">Password:</label>
    <input 
    type="password"
    placeholder="Tu Password"
    name="password"
    id="password">
</div>

<input type="submit" value="Crear cuenta" class="boton">
</form>

<div class="acciones">
        <a href="/">¿Ya tienes una cuenta? Inicia sesión</a>
        <a href="/forgot">¿Olvidaste tu password?</a>
</div>