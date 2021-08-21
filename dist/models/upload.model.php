<?php

require_once 'connection.php';

class GestionData{

    static public function almacenaTmpData($data){
        $query = "exec [APP_GuiaInformativa].[dbo].[app_almacenaTmpData] '".$data['User_almacenaTmpData']."'
            , '" . $data['Data_almacenaTmpData'] . "'
            , '" . $data['Data_paqSend'] . "'";
        $stmt = Connection::connectGlobalMeli()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function procesosTmpData($data){
        $query = "exec [APP_GuiaInformativa].[dbo].[app_procesaTmpData] '". $data['User_procesaTmpData']."'";
        $stmt = Connection::connectGlobalMeli()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    // static public function consultaTmpMallasxEstado($data){
    //     $query = "select *
    //             from [dbo].[tmp_mallas] 
    //             where userApp = '". $data['User_consultaTmpMalasXe']."'
    //                 and estado = '". $data['Estado_consultaTmpMalasXe']."'  ";
    //     $stmt = Connection::connectGlobalWfm()->prepare($query);
    //     $stmt->execute();
    //     return $stmt->fetchAll();
    //     $stmt->close;
    //     $stmt = null;
    // }

    // static public function ejecutaTmpMalla($data){
    //     $query = "exec [dbo].[app_ejecutaTmpMallas] '". $data['User_ejecutaTmpMalla']."'";
    //     $stmt = Connection::connectGlobalWfm()->prepare($query);
    //     $stmt->execute();
    //     return $stmt->fetchAll();
    //     $stmt->close;
    //     $stmt = null;
    // }

    
    
}
