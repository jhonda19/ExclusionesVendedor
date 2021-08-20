<?php

require_once 'connection.php';

class RosterTest
{

    static public function almacenaTmpEmpleados($data)
    {
        $query = "EXEC dbo.almacenaTmpEmpleados '" . $data['ua'] . "','" . $data['almacenaTmpEmpleados'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function consultaTmpEmpleados($data)
    {
        $query = "EXEC dbo.consultaTmpEmpleados '" . $data['ua'] . "','" . $data['consultaTmpEmpleados'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function ejecutaTmpEmpleado($data)
    {
        $query = "EXEC dbo.ejecutaTmpEmpleado '" . $data . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rosterNominaInicio($data)
    {
        $query = "EXEC dbo.rosterNominaInicio";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rosterNominaUpload($data)
    {
        $query = "EXEC dbo.rosterNominaUpload '" . $data . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rosterNominaLog($data)
    {
        $query = "EXEC dbo.rosterNominaLog '" . $data['ua'] . "','" . $data['paqrosterNominaLog'] . "','" . $data['cantrosterNominaLog'] . "','" . $data['gesRosterNomina'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rosterNominaProcess($data)
    {
        $query = "EXEC dbo.rosterNominaProcess";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rosterNominaActivoInfo($data)
    {
        $query = "select valor, convert(varchar,fh_update) fh_update from [COL_GlobalRoster].[dbo].[ctrl_setup] s where s.id = 1";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function historicoUpdate($data)
    {
        $query = "select top 5 convert(varchar,fhInicio) fhInicio
                    , userApp, replace(convert(varchar, convert(money,cantidad),1),'.00','') cantidad
                    , estado
                    , gestion
                    from log_rosterNomina
                    order by id desc";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rosterNominaUpdate($data)
    {
        $query = "exec dbo.rosterNominaUpdate '" . $data['rosterNominaUpdate'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rosterNominaMylink($data)
    {
        $query = "exec dbo.rosterNominaMylink'" . $data['rosterNominaMylink'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rosterNominaRetiro($data)
    {
        $query = "exec dbo.rosterNominaRetiro '" . $data['rosterNominaRetiro'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function almacenaTmpUsuariosLogin($data)
    {
        $query = "EXEC dbo.almacenaTmpusuarios '" . $data['ua'] . "','" . $data['almacenaTmpUsuariosLogin'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function consultaTmpUsuarios($data)
    {
        $query = "EXEC dbo.consultaTmpUsuarios '" . $data['ua'] . "','" . $data['consultaTmpUsuarios'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function ejecutaTmpUsuario($data)
    {
        $query = "EXEC dbo.ejecutaTmpUsuario '" . $data . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }


    static public function listNegocios($data)
    {   
        $query = "select [id]
                    ,[unidad]
                    ,[subunidad]
                    ,[lob]
                    ,[servicio]
                    ,[splitDefault]
            from [COL_GlobalRoster].[dbo].[ctrl_cuentas]
            where unidad = '" . $data['listNegocio'] . "'
            order by unidad, subunidad, lob";

        $query2 = "select [id]
                    ,[unidad]
                    ,[subunidad]
                    ,[lob]
                    ,[servicio]
                    ,[splitDefault]
            from [COL_GlobalRoster].[dbo].[ctrl_cuentas]
            order by unidad, subunidad, lob";
          
        if ($data['listNegocio'] != '') {

            $stmt = Connection::connectSQLWFM()->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll();
            $stmt->close;
            $stmt = null;
           
        } else {
            
            $stmt = Connection::connectSQLWFM()->prepare($query2);
            $stmt->execute();
            return $stmt->fetchAll();
            $stmt->close;
            $stmt = null;
        }
        
        
       
    }

    static public function listSplit()
    {
        $query = "select split
            from [dbo].[ctrl_splitNomina]
            where estado = 1
            group by split
            order by split";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function DatosSplit()
    {
        $query = "select *
            from [dbo].[ctrl_splitNomina]
            where estado = 1";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function listEmpresa()
    {
        $query = "select *
            from [dbo].[ctrl_empresas] 
            where estado = 1";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function updateNegocio($data)
    {
        $query = "EXEC [dbo].[cuentas] '" . $data['updateIdNeg'] . "' , '" . $data['updateUni'] . "' , '" . $data['updateSubu'] . "' , '" . $data['updateLob'] . "' , '" . $data['updateSer'] . "' , '" . $data['updateSplit'] . "' ,1";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function deleteIdNeg($data)
    {
        $query = "EXEC [dbo].[cuentas] '" . $data['deleteIdNeg'] . "' , null , null , null , null , null ,3";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function nuevoNegocio($data)
    {
        $query = "EXEC [dbo].[cuentas] null,'" . $data['nuevoUni'] . "' , '" . $data['nuevoSubu'] . "' , '" . $data['nuevoLob'] . "' , '" . $data['nuevoSer'] . "' , '" . $data['nuevoSplit'] . "' ,2";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function crearSplit($data)
    {
        $query = "exec [dbo].[split] null, '" . $data['CrearSplitEmp'] . "' , '" . $data['CrearSplit'] . "',2";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function deleteSplit($data)
    {
        $query = "exec [dbo].[split] '" . $data['deleteSplit'] . "' , null, null ,3";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function updateCentroCosto($data)
    {
        $query = "exec [dbo].[split] '" . $data['updCcId'] . "' , '" . $data['updCcEmp'] . "', '" . $data['updCcSplit'] . "' ,1";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rpte1()
    {
        $query = "select [empresa]
                ,[site]
                ,[tipoId]
                ,[cedula]
                ,[vhur]
                ,[nombreApellido]
                ,[estadoEmpleado]
                ,[split]
                ,[claseSalario]
                ,[fechaIngreso]
                ,[fechaRetiro]
            from [dbo].[tmp_empleadosPendientes]";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rpte2()
    {
        $query = "select e.[id]
            ,[tipoDoc]
            ,[documento]
            ,[nombre]
            ,[fechaIngreso]
            ,[fechaRetiro]
            ,e.[estado]
            ,[fechaContrato]
            ,'NO' as [contratadoReal]
            ,c.unidad
            ,c.subunidad
            ,c.lob
            ,cc.cargo
            ,cc.posicion
            ,em.fhUpdate
            ,em.userApp
        from dbo.data_empleados e
        inner join (
        select *
            , row_number() over(partition by documentoEmpleado order by isnull(fechaFin,getdate())) i
        from dbo.data_empleadosMovil
        ) em on e.documento = em.documentoEmpleado and em.i = 1 and e.contratadoReal is null
        left join [dbo].[ctrl_cuentas] c on em.idCuenta = c.id
        left join [dbo].[ctrl_cargos] cc on em.idCargo = cc.id";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rpte3()
    {
        $query = "select [tipoDoc]
            ,e.[documento] as documento
            ,[nombre]
            ,[fechaIngreso]
            ,e.[estado]
            ,ca.cargo
            ,ca.posicion
            ,c.unidad
            ,c.subunidad
            ,c.lob
            ,c.servicio
            ,'Sin Usuarios' as comentario
        from [COL_GlobalRoster].[dbo].[data_empleados] e
        left join (
            select *
                , row_number() over(partition by documentoEmpleado order by isnull(fechafin, getdate()) desc) i
            from [dbo].[data_empleadosMovil] 
        ) em on e.documento = em.documentoEmpleado and em.i = 1
        inner join [dbo].[ctrl_cargos] ca on em.idCargo = ca.id
        inner join [dbo].[ctrl_cuentas] c on em.idCuenta = c.id
        left join (
            select *
                , row_number() over(partition by documento order by isnull(fechafin, getdate()) desc) i
            from [dbo].[data_usuarioApp]
        ) ua on e.documento = ua.documento and ua.i = 1
        where ua.documento is null";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rpte5()
    {
        $query = "select *
            from (
            select dua.id
                , dua.documento
                , e.nombre as nombreEmpleado
                , dua.usuarioLogin
                , dua.idApp
                , cla.nombreApp
                , dua.fechaInicio
                , dua.fechaFin
            , row_number() over(partition by dua.documento, dua.usuariologin, dua.idApp order by isnull(dua.fechaFin,getdate())) i 
            from [dbo].[data_usuarioApp] dua
            inner join ctrl_loginApp cla on dua.idApp = cla.id
            left join data_empleados e on dua.documento = e.documento
            ) mtz where i = 1";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function rpte4($data)
    {
        $query = "exec [dbo].[rpte_allRoster]  '" . $data['rpte4'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function TotalRoster()
    {
        $query = "exec [dbo].[rpte_allRoster] '0'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }


    static public function buscaDoc($data)
    {
        $query = "select *
            from (
            select e.[id] as idEmplWf
                , em.id as idEmpMov
                , em.vhur 
                , em.idMylink as idmylink
                , e.[tipoDoc]
                , e.[documento]
                , e.[nombre]
                , e.[fechaIngreso]
                , e.[fechaRetiro]
                , e.[estado]
                , e.[fechaContrato]
                , e.[Sexo]
                , case when e.[contratadoReal] = 1 then 'Si' else 'No' end contratadoReal
                , em.idCuenta
                , c.unidad
                , c.subunidad
                , c.lob
                , c.servicio
                , c.splitDefault
                , em.idCargo
                , cg.cargo
                , cg.posicion
                , cg.tipoArea
                , em.idCargoEjecutado
                , cge.cargo as cargoEjecutado
                , cge.posicion as posicionEjecutado
                , cge.tipoArea as tipoAreaEjecutado
                , em.documentoJefe
                , edj.nombre as nombreJefe
                , em.idSite
                , s.[site]
                , em.piso
                , em.split as splitNomina
                , em.claseSalario
                , em.modeloTrabajo
                , em.userApp
                , em.fhUpdate
                , row_number() over(partition by  e.[id] order by isnull(em.fechaFin, getdate()) desc) val
            from [dbo].[data_empleados] e
            inner join [dbo].[data_empleadosMovil] em on  e.id = em.idEmpl 
            inner join [dbo].[ctrl_cuentas] c on em.idCuenta = c.id
            left join [dbo].[data_empleados] edj on em.documentoJefe = edj.documento
            inner join [dbo].[ctrl_cargos] cg on em.idCargo = cg.id
            left join [dbo].[ctrl_cargos] cge on em.idCargoEjecutado = cge.id
            inner join [dbo].[ctrl_site] s on em.idSite = s.id
            ) mtz where [documento] = '" . $data['buscaDoc'] . "' and val =  1";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }


    static public function btnUpdateSearchEmpl($data)
    {
        $query = "EXEC [dbo].[deleteUpdateEmpl] '" . $data['uabtnUpdateSearchEmpl'] . "'
            , '" . $data['idEmplbtnUpdateSearchEmpl'] . "'
            , '" . $data['docOldbtnUpdateSearchEmpl'] . "'
            , '" . $data['docNewbtnUpdateSearchEmpl'] . "'
            , '" . $data['comentbtnUpdateSearchEmpl'] . "'
            , 1 ";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function btnDeleteSearchEmpl($data)
    {
        $query = "EXEC [dbo].[deleteUpdateEmpl] '" . $data['uabtnDeleteSearchEmpl'] . "'
            , '" . $data['idEmplbtnDeleteSearchEmpl'] . "'
            , '" . $data['docOldbtnDeleteSearchEmpl'] . "'
            , '" . $data['docNewbtnDeleteSearchEmpl'] . "'
            , '" . $data['comentbtnDeleteSearchEmpl'] . "'
            , 2 ";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function btnQuitarRetiroSearchEmpl($data)
    {
        $query = "EXEC [dbo].[deleteUpdateEmpl] '" . $data['uabtnQuitarRetiroSearchEmpl'] . "'
            , '" . $data['idEmplbtnQuitarRetiroSearchEmpl'] . "'
            , '" . $data['docOldbtnQuitarRetiroSearchEmpl'] . "'
            , '" . $data['docNewbtnQuitarRetiroSearchEmpl'] . "'
            , '" . $data['comentbtnQuitarRetiroSearchEmpl'] . "'
            , 3 ";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function updateConfigRang($data)
    {
        $query = "EXEC [dbo].[config] '" . $data['inParamRangEmpl'] . "'
            , '" . $data['inParamRangUsu'] . "'
            , '" . $data['inParamRangNom'] . "'
            , '" . $data['inParamConfigComent'] . "'
            , '" . $data['inParamConfigUA'] . "'
            , 1 ";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function consulParamRang()
    {
        $query = "select *
            from  (
            select vista, valor
            from [dbo].[ctrl_setup]
            ) a pivot( max(valor) for vista in ([empleados],[usuarios],[nomina])) pp";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function listMesesReport()
    {
        $query = "set language spanish;
            set nocount on;
            create table #tmp_listMesesApp(fecha date, mes varchar(150))
            declare @inicioMes date = null, @mesesAtras int = 3;
            while @mesesAtras > 0 begin
            set @inicioMes =  DATEADD(month,-1*@mesesAtras,dateadd(day,-1*datepart(day,getdate())+1, getdate()))
            insert into #tmp_listMesesApp
            select @inicioMes, DATENAME(month, @inicioMes)
            set @mesesAtras = @mesesAtras - 1
            end
            insert into #tmp_listMesesApp
            select dateadd(day,-1*datepart(day,getdate())+1, getdate()), datename(month,dateadd(day,-1*datepart(day,getdate())+1, getdate()))
            select *
            from #tmp_listMesesApp";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function dashboardHome1Uni($data)
    {
        $query = "set nocount on;
                declare @fecha date = '" . $data['dashboardHome1Mes'] . "', @unidad varchar(150) = '" . $data['dashboardHome1Uni'] . "'
                if @fecha = '' begin
                    set @fecha = dateadd(day,-1*datepart(day,getdate())+1, getdate())
                end
                create table #tmp_unidades (cuenta varchar(150))
                if @unidad = '0' begin
                    insert into #tmp_unidades
                    select unidad from [dbo].[ctrl_cuentas]
                    group by unidad
                end else  begin
                    insert into #tmp_unidades
                    select @unidad 
                end
                select  mtz.[estado]
                    , mtz.tipoArea
                    , sum(1) as Cantidad
                from (
                select e.[id] as idEmplWf
                    , case when em.[estado] = 0 and fechaFin between @fecha and EOMONTH(@fecha) then 'Retiro' else 'Activo' end estado
                    , c.unidad
                    , cg.posicion
                    , cg.tipoArea
                    , em.modeloTrabajo
                    , fechaRetiro
                    , em.fechaFin
                    , row_number() over(partition by em.idEmpl order by isnull(em.fechaFin,getdate()) desc) val
                    from [dbo].[data_empleados] e
                    inner join [dbo].[data_empleadosMovil] em on  e.id = em.idEmpl
                    inner join [dbo].[ctrl_cuentas] c on em.idCuenta = c.id
                    inner join [dbo].[ctrl_cargos] cg on em.idCargo = cg.id
                    where (@fecha between fechaInicio and isnull(fechaFin,getdate()) or EOMONTH(@fecha) between fechaInicio and isnull(fechaFin,EOMONTH(@fecha)))
                            or (fechaInicio between @fecha and EOMONTH(@fecha) and fechaFin between @fecha and EOMONTH(@fecha))
                    ) mtz 
                    inner join #tmp_unidades un on mtz.unidad = un.cuenta
                    where val = 1
                    group by [estado]
                        , tipoArea";
        // -- (fechaRetiro between @fecha and EOMONTH(@fecha))
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function dashboardHome2Uni($data)
    {
        $query = "set nocount on;
                declare @fecha date = '" . $data['dashboardHome2Mes'] . "', @unidad varchar(150) = '" . $data['dashboardHome2Uni'] . "'
                if @fecha = '' begin
                    set @fecha = dateadd(day,-1*datepart(day,getdate())+1, getdate())
                end
                create table #tmp_unidades (cuenta varchar(150))
                if @unidad = '0' begin
                    insert into #tmp_unidades
                    select unidad from [dbo].[ctrl_cuentas]
                    group by unidad
                end else  begin
                    insert into #tmp_unidades
                    select @unidad 
                end
                select unidad,isnull(AgentesAct,0) AgentesAct ,isnull(StaffAct,0) StaffAct, isnull(AgentesRet,0) AgentesRet, isnull(StaffRet,0) StaffRet
                from(
                select lob as unidad, AGENTES as AgentesAct, STAFF as StaffAct
                from  (
                select  mtz.lob
                    , mtz.tipoArea
                    , sum(1) as Cantidad
                from (
                select e.[id] as idEmplWf
                    , case when em.[estado] = 0 and fechaFin between @fecha and EOMONTH(@fecha) then 'Retiro' else 'Activo' end estado
                    , c.unidad
                    , cg.posicion
                    , cg.tipoArea
                    , em.modeloTrabajo
                    , fechaRetiro
                    , c.lob
                    , em.fechaFin
                    , row_number() over(partition by em.idEmpl order by isnull(em.fechaFin,getdate()) desc) val
                from [dbo].[data_empleados] e
                inner join [dbo].[data_empleadosMovil]  em on  e.id = em.idEmpl
                inner join [dbo].[ctrl_cuentas] c on em.idCuenta = c.id
                inner join [dbo].[ctrl_cargos] cg on em.idCargo = cg.id
                where (@fecha between fechaInicio and isnull(fechaFin,getdate()) or EOMONTH(@fecha) between fechaInicio and isnull(fechaFin,EOMONTH(@fecha)))
                    or (fechaInicio between @fecha and EOMONTH(@fecha) and fechaFin between @fecha and EOMONTH(@fecha))
                ) mtz 
                inner join #tmp_unidades un on mtz.unidad = un.cuenta
                where val =  1 and estado = 'Activo' 
                group by  lob
                    , tipoArea
                    ) a pivot( sum(cantidad) for tipoArea in ([AGENTES],[STAFF])) PP
                ) a

                left join (
                select lob, AGENTES as AgentesRet, STAFF as StaffRet
                from  (
                select  mtz.lob
                    , mtz.tipoArea
                    , sum(1) as Cantidad
                from (
                select e.[id] as idEmplWf
                    , case when em.[estado] = 0 and fechaFin between @fecha and EOMONTH(@fecha) then 'Retiro' else 'Activo' end estado
                    , c.unidad
                    , cg.posicion
                    , cg.tipoArea
                    , em.modeloTrabajo
                    , fechaRetiro
                    , c.lob
                    , em.fechaFin
                    , row_number() over(partition by em.idEmpl order by isnull(em.fechaFin,getdate()) desc) val
                from [dbo].[data_empleados] e
                inner join [dbo].[data_empleadosMovil] em on  e.id = em.idEmpl
                inner join [dbo].[ctrl_cuentas] c on em.idCuenta = c.id
                inner join [dbo].[ctrl_cargos] cg on em.idCargo = cg.id
                where (@fecha between fechaInicio and isnull(fechaFin,getdate()) or EOMONTH(@fecha) between fechaInicio and isnull(fechaFin,EOMONTH(@fecha)))
	                or (fechaInicio between @fecha and EOMONTH(@fecha) and fechaFin between @fecha and EOMONTH(@fecha))
                ) mtz 
                inner join #tmp_unidades un on mtz.unidad = un.cuenta
                where val =  1 and estado = 'Retiro'
                group by  lob
                    , tipoArea
                    ) a pivot( sum(cantidad) for tipoArea in ([AGENTES],[STAFF])) PP
                ) b on a.unidad = b.lob
                order by AgentesAct desc";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }


    static public function dashboardHome3Uni($data)
    {
        $query = "set nocount on;
                declare @fecha date = '" . $data['dashboardHome3Mes'] . "', @unidad varchar(150) = '" . $data['dashboardHome3Uni'] . "'
                if @fecha = '' begin
                    set @fecha = dateadd(day,-1*datepart(day,getdate())+1, getdate())
                end
                create table #tmp_unidades (cuenta varchar(150))
                if @unidad = '0' begin
                    insert into #tmp_unidades
                    select unidad from [dbo].[ctrl_cuentas]
                    group by unidad
                end else  begin
                    insert into #tmp_unidades
                    select @unidad 
                end
                select *
                from (
                select  mtz.tipoArea
                    , modeloTrabajo
                    , sum(1) as Cantidad
                from (
                select e.[id] as idEmplWf
                    , case when em.[estado] = 0 and fechaFin between @fecha and EOMONTH(@fecha) then 'Retiro' else 'Activo' end estado
                    , c.unidad
                    , cg.posicion
                    , cg.tipoArea
                    , em.modeloTrabajo
                    , fechaRetiro
                    , em.fechaFin
                    , row_number() over(partition by  e.[id] order by isnull(em.fechaFin, getdate()) desc) val
                from [dbo].[data_empleados] e
                inner join [dbo].[data_empleadosMovil] em on  e.id = em.idEmpl
                inner join [dbo].[ctrl_cuentas] c on em.idCuenta = c.id
                inner join [dbo].[ctrl_cargos] cg on em.idCargo = cg.id
                where (@fecha between fechaInicio and isnull(fechaFin,getdate()) or EOMONTH(@fecha) between fechaInicio and isnull(fechaFin,getdate()))
                    or (fechaInicio between @fecha and EOMONTH(@fecha) and fechaFin between @fecha and EOMONTH(@fecha))
                ) mtz 
                inner join #tmp_unidades un on mtz.unidad = un.cuenta
                where val =  1
                group by tipoArea
                    , modeloTrabajo
                ) a pivot( sum(cantidad) for modeloTrabajo in ([Home],[Site])
                ) pp";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }


    static public function rpteHomeCuentaMes($data)
    {
        $query = "exec [dbo].[rpte_cuentaxMes] '" . $data['rpteHomeCuentaMes_Mes'] . "', '" . $data['rpteHomeCuentaMes_Uni'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }


    /* SOCIODEMOGRAFICO */

    static public function sociodemograficoInicio()
    {
        $query = "exec [dbo].[sociodemograficoInicio]";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    
    static public function sociodemograficoUpload($data)
    {
        $query = "exec [dbo].[sociodemograficoUpload] '" . $data['DS_sociodemograficoUpload'] . "'";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }

    static public function sociodemograficoProcess()
    {
        $query = "exec [dbo].[sociodemograficoProcess]";
        $stmt = Connection::connectSQLWFM()->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
        $stmt->close;
        $stmt = null;
    }



    


    
}
