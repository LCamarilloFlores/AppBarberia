<h1 class="nombre-pagina">Panel de Administración</h1>

<?php include_once(__DIR__ . "/../templates/barra.php");?>

<h2>Buscar citas:</h2>
<div class="busqueda">
    <form action="" class="formulario">
    <div class="campo">    
        <label for="fecha">Fecha</label>
            <input
                type = "date"
                id = "fecha"
                name = "fecha"
                value = "<?php echo $fecha ?? '';?>"
            />
    </div>
    </form>
</div>

<?php if(!$citas) {?>
    <div class="alerta error">
        No hay citas en esta fecha.
    </div>
<?php  }  ?>

<div id="citas-admin">
    <ul class="citas">
        <?php 
        $idCita=-1;
        $total = 0;
        foreach($citas as $key => $cita):
            if($idCita !== $cita->id):
                $idCita = $cita->id;
                ?>
                <li>
                <p>ID: <span><?php echo $cita->id;?></span> </p>
                <p>Hora: <span><?php echo $cita->hora;?></span> </p>
                <p>Cliente: <span><?php echo $cita->cliente;?></span> </p>
                <p>Email: <span><?php echo $cita->email;?></span> </p>
                <p>Teléfono: <span><?php echo $cita->telefono;?></span> </p>

                <h3>Servicios</h3>
                
                <?php 
            endif; 
            ?>
            <div class="servicio">
                <div class="nombre-servicio"><?php echo $cita->servicio;?></div>
                <div class="precio-servicio">$ <?php echo $cita->precio;?></div>
        <?php 
        //Suma el precio del servicio actual al total
        $total += $cita->precio;

        $actual = $cita->id;
        $proximo = $citas[$key + 1]->id;
        if(esUltimo($actual,$proximo)){?>
            <div class="total">Total: </div>
            <div class="precio-total">$ <?php echo number_format($total,2);?></div>
                <input type="hidden" name="id" value="<?php echo $cita->id;?>">
                <input 
                type="submit" 
                class="boton-eliminar" 
                data-item="<?php echo $cita->id;?>"
                value="Eliminar"> 
        <?php 
        
        $total = 0; }?>
            </div>
        <?php endforeach;?>
        </li>
    </ul>
</div>

<?php $script="
    <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    <script src='build/js/buscador.js'></script>
    <script src='build/js/botonEliminarCita.js'></script>";