<?php
require_once '../models/login.model.php';

class ControllerLogin
{

    static public function userLogin($data)
    {
        $res = ModelData::userLogin($data);
        return $res;
    }

    static public function userGlobal($data)
    {

        if (isset($data)) {
            session_start();
            $n = rand(10000, 99999);
            $_SESSION['n'] = $n;
            $_SESSION['idUser'.$n] = $data['idUser'];
            $id =  $_SESSION['idUser'.$n];
            $_SESSION['pUser'.$n] = $data['pUser'];
            $_SESSION['nUser'.$n] = $data['nUser'];
            return $id . $n;
        }
    }

    static public function logout()
    {
        session_start();
        session_destroy();
        $res = 1;
        return $res;
    }

    static public function keyUserEncryp()
    {
        session_start();
        return $_SESSION['idUser'.$_SESSION['n']];
    }

    static public function validarLs($data)
    {
        session_start();
        if ($data['valiUser'] === $_SESSION['nUser'.$_SESSION['n']] && $data['valiPerfil'] === $_SESSION['pUser'.$_SESSION['n']] ) {
            return 0;
        } else {
            return 1;
        }
    }


    
} // End of class