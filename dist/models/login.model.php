<?php

require_once 'connection.php';

class ModelData {

    static public function userLogin($data) {
        $query = "EXEC dbo.app_login '".$data['iniUser']."', null, null, 1";
        $stmt = Connection::connectSQLWFM() -> prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function validarFormRestoreDoc($data) {
        $query = "declare @val int; select @val = 1 from [COL_GlobalRoster].[dbo].[data_empleados] where documento = '".$data['validarFormDoc']."'; select @val as res;";
        $stmt = Connection::connectSQLWFM() -> prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function validarFormRestoreUser($data) {
        $query = "DECLARE @val INT; 
                SELECT @val = 1 FROM [COL_GlobalRoster].[dbo].[data_empleados]
                WHERE (userRed = '".$data['validarFormUser']."') AND (documento = '".$data['docForm']."');
                SELECT @val as res;";
        $stmt = Connection::connectSQLWFM() -> prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function validarFormRestoreContrato($data) {
        $query = "DECLARE @val INT; 
                SELECT @val = 1 FROM [COL_GlobalRoster].[dbo].[data_empleados]
                WHERE (userRed = '".$data['user']."') AND (documento = '".$data['docForm']."') AND (fechaContrato = '".$data['validarFormContrato']."');
                SELECT @val as res;";
        $stmt = Connection::connectSQLWFM() -> prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }
    
    static public function restorePass($data) {
        $query = "EXEC dbo.app_loginPass '".$data['Inrid']."', '".$data['Inriu']."', '".$data['Inric']."', '".$data['Inpass']."'";
        $stmt = Connection::connectSQLWFM() -> prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function searchId($cedula) {
        $query = "set nocount on;
        declare @doc varchar(50)
            , @id int
            , @userRed varchar(50)
            , @perfilApp varchar(200)
            , @posicion varchar(100)
            , @cargo varchar(100)
            , @jerarquia int
            , @unidad varchar(100)
            , @adminApp int
        select @doc = documento
            , @id = a.id
            , @userRed = userRed
            , @perfilApp = nombre
            , @posicion = ca.posicion
            , @cargo = ca.cargo
            , @jerarquia = ca.jerarquia
            , @unidad = ce.unidad
            , @adminApp = a.adminApp
        from data_empleados a
        inner join (
            select top 1 *
            from [dbo].[data_empleadosMovil]
            where documentoEmpleado = '".$cedula."'
            order by id desc
        ) c on c.idEmpl = a.id
        inner join [dbo].[ctrl_cuentas] ce on c.idCuenta = ce.id
        inner join [dbo].[ctrl_cargos] ca on c.idCargo = ca.id
    
        select @doc as doc
            , isnull(@id,'') as id
            , isnull(@userRed,'') as userRed
            , @perfilApp as nombre
            , @posicion as posicion
            , @cargo as cargo
            , @jerarquia as jerarquia
            , @unidad as unidad
            , @adminApp as adminApp";
        $stmt = Connection::connectSQLWFM() -> prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function listViewsApp($cedula) {
        $query = "EXEC dbo.app_login '".$cedula."', null, null, 2";
        $stmt = Connection::connectSQLWFM() -> prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function saveUser($data) {
        $query = "EXEC dbo.app_login '".$data['savUsId']."', '".$data['savUsPer']."','".$data['savUsApp']."', 3";
        $stmt = Connection::connectSQLWFM() -> prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function consultaUserVal($data) {
        $query = "select COUNT(*) as res
        from [COL_GlobalRoster].[dbo].[data_empleados]
        where userRed = '".$data['validaUserACtivo']."'";
        $stmt = Connection::connectSQLWFM() -> prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }
    

    
       


    
}

