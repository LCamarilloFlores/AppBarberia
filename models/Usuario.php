<?php

namespace Model;

class Usuario extends ActiveRecord{
    //Base de datos
    protected static $tabla='usuarios';
    protected static $columnasDB = ['id','nombre','apellido','email','password','telefono','admin','confirmado','token'];
    public $id,$nombre,$apellido,$email,$password,$telefono,$admin,$confirmado,$token;

    public function __construct($args = []){
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? '0';
        $this->confirmado = $args['confirmado'] ?? '0';
        $this->token = $args['token'] ?? '';
    }
    
    //Mensajes de validación
    public function validarNuevaCuenta(){
        if(!$this->nombre){
            self::$alertas['error'][] = "El nombre es obligatorio";
        }
        if(!$this->apellido){
            self::$alertas['error'][] = "El apellido es obligatorio";
        }
        if(!$this->email){
            self::$alertas['error'][] = "El email es obligatorio";
        }
        if(!$this->password){
            self::$alertas['error'][] = "El password es obligatorio";
        }
        elseif(strlen($this->password)<8)
        {
            self::$alertas['error'][] = "El password debe ser mayor a 8 caracteres";
        }
        return self::$alertas;
    }

    public function existeUsuario(){
        $query="SELECT * FROM ".self::$tabla." WHERE email='".$this->email."' LIMIT 1";
        $resultado = self::$db->query($query);
        if($resultado->num_rows>0){
            self::$alertas['error'][]="El usuario ya esta registrado";
        }
        return $resultado;
    }

    public function hashPassword(){
        $this->password= password_hash($this->password,PASSWORD_BCRYPT);
    }
    public function crearToken(){
        $this->token= uniqid();
    }

    public function validarLogin(){
        if(!$this->email){
            self::setAlerta('error',"El email es obligatorio.");
        }
        if(!$this->password){
            self::setAlerta('error',"El password es obligatorio.");
        }
        return self::getAlertas();
    }
    public function autenticar($password2){
        $autenticar = password_verify($password2,$this->password);
        if($autenticar){
            return true;
        }
        else{
            return false;
        }
    }

    public function validarPassword(){
        if(!$this->password){
            self::$alertas['error'][]='El password es obligatorio';
        }
        else if(strlen($this->password)<8){
            self::$alertas['error'][]='El password debe tener al menos 8 caracteres';
        }
        return self::$alertas;
    }
    public function comprobar_confirmado(){
        if($this->confirmado){
            return true;
        }
        else{
            return false;
        }
    }
    public function validarEmail(){
        if(!$this->email){
            self::setAlerta('error',"El email es obligatorio.");
        }
        return self::$alertas;
    }
}