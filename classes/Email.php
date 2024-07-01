<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
    protected const WebHost = "https://barberia.it-solutions.pw:3000";
    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion()
    {
        //Crear el objeto mail
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'e47191c9728a31';
        $mail->Password = '7b1f4cdceaa6e8';
        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'Appsalon.com');
        $mail->Subject = 'Confirma tu cuenta';

        //setHTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF8';

        $contenido = "<html><p><strong>Hola " . $this->nombre . "</strong>. Has creado tu cuenta en Appsalon, solo debes confirmarla presionando el siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='" . self::WebHost . "/confirmar?token=" . $this->token . "'>Confirmar Cuenta</a></p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta puedes ignorar el mensaje</p></html>";
        // debuguear($mail);
        $mail->Body = $contenido;
        $mail->send();
    }
    public function enviarInstrucciones()
    {
        //Crear el objeto mail
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'e47191c9728a31';
        $mail->Password = '7b1f4cdceaa6e8';
        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'Appsalon.com');
        $mail->Subject = 'Recuperación de Cuenta';

        //setHTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF8';

        $contenido = "<html><p><strong>Hola " . $this->nombre . "</strong>. Este es un correo de reestablecimiento de contraseña. Presiona el siguiente enlace para hacerlo:</p>";
        $contenido .= "<p>Presiona aquí: <a href='" . self::WebHost . "/recuperar?token=" . $this->token . "'>Reestablecer contraseña</a></p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta puedes ignorar el mensaje</p></html>";
        // debuguear($mail);
        $mail->Body = $contenido;
        $mail->send();
    }
}
