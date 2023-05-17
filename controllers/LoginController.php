<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController{
    public static function login(Router $router){
        $alertas = [];
        if($_SERVER['REQUEST_METHOD']==='POST'){
            $auth = new Usuario($_POST);
            $alertas = $auth->validarLogin();
            if(empty($alertas)){
                $usuario = Usuario::where('email',$auth->email);
                if(!$usuario){
                    Usuario::setAlerta('error','El correo ingresado no esta registrado');
                }
                else{
                    
                    if(!$usuario->autenticar($auth->password)){
                        Usuario::setAlerta("error","El password es incorrecto");
                    }
                    elseif(!$usuario->comprobar_confirmado()){
                        Usuario::setAlerta("error","El correo no se ha confirmado");
                    }
                    else{
                        session_start();
                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre. ' '.$usuario->apellido;
                        $_SESSION['email'] = $usuario->email;
                        $_SESSION['login'] = true;
                        if($usuario->admin==='0'){
                            header('Location: /cita');
                        }
                        else{
                            header('Location: /admin');
                        }
                    }
                }
            }
        }
        $alertas = Usuario::getAlertas();
        $router->render('auth/login',['alertas'=>$alertas]);
    }
    public static function logout(Router $router){
        echo "Desde logout";
    }
    public static function forgot(Router $router){
        $alertas = [];
        if($_SERVER['REQUEST_METHOD']==='POST'){
            $auth = new Usuario($_POST);
            $alertas = $auth->validarEmail();
            
            if(empty($alertas)){
                $usuario = Usuario::where('email',$auth->email);
                if(!is_null($usuario)){
                    if(!$usuario->confirmado){
                        Usuario::setAlerta('error', 'El usuario no ha confirmado su cuenta de correo');
                    }
                    else{
                        //Generar un token
                        $usuario->crearToken();
                        $usuario->guardar();

                        //Enviar el email
                        $correo = new Email($usuario->email,$usuario->nombre,$usuario->token);
                        $correo->enviarInstrucciones();
                        //Mensaje de exito
                        Usuario::setAlerta('exito', 'Se ha enviado un mensaje de recuperacion a tu bandeja de correo.');
                    }
                }
                else{
                    Usuario::setAlerta('error', 'El correo ingresado no esta registrado'); 
                }
            }
        }
        $alertas = Usuario::getAlertas();
        $router->render('/auth/forgot',[
            'alertas'=>$alertas,
        ]);
    }
    public static function recuperar(Router $router){
        $alertas = [];
        $error = false;

        $token = s($_GET['token']);
        $usuario = Usuario::where('token',$token);
        if(is_null($usuario)){
            Usuario::setAlerta('error','El token es inválido');
            $error = true;
        }
        else{
            if($_SERVER['REQUEST_METHOD']==='POST'){
                //Guardar Nuevo password

                $password = new Usuario($_POST);
                $password->validarPassword();
                $alertas= Usuario::getAlertas();
                if(empty($alertas)){
                    $usuario->password=null;
                    $usuario->password=$password->password;
                    $usuario->hashPassword();
                    $usuario->token=null;
                    $resultado = $usuario->guardar();
                    if($resultado){
                        header('Location: /');
                    }
                }
            }
        }
        $alertas = Usuario::getAlertas();
        $router->render('auth/recuperar',[
             'alertas'=>$alertas,
             'error'=>$error
        ]
        );
    }
    public static function crear(Router $router){
        $usuario = new Usuario($_POST);
        $alertas=[];
        if($_SERVER['REQUEST_METHOD']==='POST'){
            $usuario->sincronizar();
            $alertas=$usuario->validarNuevaCuenta();
            //Revisar que no haya errores
            if(empty($alertas['error'])){
                //Verificar si el usuario esta registrado
                $resultado=$usuario->existeUsuario();
                if($resultado->num_rows>0){
                    $alertas= Usuario::getAlertas();
                }
                else{
                    //Hashear el password
                    $usuario->hashPassword();

                    //Generar un token único
                    $usuario->crearToken();

                    //Enviar el email
                    $email = new Email($usuario->email,$usuario->nombre,$usuario->token);
                    $email->enviarConfirmacion();

                    //Crear el usuario
                    $resultado = $usuario->guardar();
                    if($resultado){
                       header('Location: /mensaje');
                    }
                }
            }
        }
        $router->render('/auth/crear-cuenta',[
            'usuario'=>$usuario,
            'alertas'=>$alertas

        ]);
    }
    public static function mensaje(Router $router){
        $router->render('auth/mensaje',[]);
    }
    public static function confirmar(Router $router){
        $token = s($_GET['token']);
        $usuario = Usuario::where('token',$token);
        if(empty($usuario)){
            //Mostrar mensaje de error
            Usuario::setAlerta('error',"Token no válido");
        }
        else{
            //Modificar el campo de confirmado
            $usuario->confirmado=1;
            $usuario->token=null;
            $usuario->guardar();
            Usuario::setAlerta('exito',"Cuenta confirmada");
        }
        $alertas = Usuario::getAlertas();
        $router->render('auth/confirmar',['alertas'=>$alertas]);
    }

}