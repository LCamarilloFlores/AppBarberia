<?php

namespace Controllers;

use MVC\Router;
use Model\Servicio;

class ServiciosController{
    public static function index(Router $router){
        session_start();
        isAdmin();
        $servicios = Servicio::all();
        $nombre = $_SESSION['nombre'];
        $router->render("servicios/index",[
            'nombre'=>$nombre,
            'servicios'=>$servicios
        ]);
    }
    public static function crear(Router $router){
        session_start();
        isAdmin();
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
        session_start();
        isAdmin();
        $nombre = $_SESSION['nombre'];
        $servicio = new Servicio;
        $id = $_GET['id'] ?? $_POST['id'];
        if(!is_numeric($id))
        return;
        $servicio = Servicio::find($id);
        $alertas = [];
        if($_SERVER['REQUEST_METHOD']==='POST') {
            $servicio->sincronizar($_POST);
            $alertas = $servicio->validar();
            if(empty($alertas)){
                $servicio->guardar();
                header('Location: /servicios');
            }
        }
        
        $router->render("servicios/actualizar",[
            'nombre'=>$nombre,
            'servicio'=>$servicio,
            'alertas'=>$alertas
        ]);
    }
    public static function eliminar(){
        if($_SERVER['REQUEST_METHOD']==='POST')
        {
            $id = $_POST['id'];
            $servicio = Servicio::find($id);
            $resultado = $servicio->eliminar();
            // header('Location:' . $_SERVER['HTTP_REFERER']);
            echo json_encode($resultado);
        }
    }
}