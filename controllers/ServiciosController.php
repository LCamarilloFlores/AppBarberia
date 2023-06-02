<?php

namespace Controllers;

use MVC\Router;
use Model\Servicio;

class ServiciosController{
    public static function index(Router $router){
        session_start();
        $servicios = Servicio::all();
        $nombre = $_SESSION['nombre'];
        $router->render("servicios/index",[
            'nombre'=>$nombre,
            'servicios'=>$servicios
        ]);
    }
    public static function crear(Router $router){
        session_start();
        $servicio = new Servicio;
        $alertas = [];
        if($_SERVER['REQUEST_METHOD']==='POST') { 
            $servicio->sincronizar($_POST);
            $alertas = $servicio->validar();
            if(empty($alertas)){
                $servicio->guardar();
                header('Location: /servicios');
            }
        }
        $nombre = $_SESSION['nombre'];
        $router->render("servicios/crear",[
            'nombre'=>$nombre,
            'servicio' =>$servicio,
            'alertas' => $alertas
        ]);
    }
    public static function actualizar(Router $router){
        if($_SERVER['REQUEST_METHOD'==='POST']) { 
            echo "Desde Actualizar Post";
            return;
        }
        session_start();
        $nombre = $_SESSION['nombre'];
        $router->render("servicios/actualizar",[
            'nombre'=>$nombre
        ]);
    }
    public static function eliminar(Router $router){
        if($_SERVER['REQUEST_METHOD'==='POST']) { 
            echo "Desde Eliminar Post";
            return;
        }
    }
}