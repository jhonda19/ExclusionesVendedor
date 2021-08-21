<?php

require_once 'connection.php';

class QryVendedor
{

    static public function qryFLujo1($data)
    {
        $query = "select [BU], [Proceso], [flujo1]
        from [APP_GuiaInformativa].[dbo].[data_GuiaInfo]
        where BU = '" . $data['qry_f1_bu'] . "' and Proceso in ('" . $data['qry_f1_proceso'] . "')
        group by [BU], [Proceso], [flujo1]
        ";
        $stmt = Connection::connectGlobalMeli()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }



    
}
