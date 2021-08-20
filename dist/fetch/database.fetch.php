<?php

include_once '../models/database.model.php';

if (isset($_POST['almacenaTmpEmpleados'])) {
    $data = array('ua' => $_POST['ua'], 'almacenaTmpEmpleados' => $_POST['almacenaTmpEmpleados']);
    echo json_encode(RosterTest::almacenaTmpEmpleados($data));
} else if (isset($_POST['consultaTmpEmpleados'])) {
    $data = array('ua' => $_POST['ua'], 'consultaTmpEmpleados' => $_POST['consultaTmpEmpleados']);
    echo json_encode(RosterTest::consultaTmpEmpleados($data));
} else if (isset($_POST['ejecutaTmpEmpleado'])) {
    echo json_encode(RosterTest::ejecutaTmpEmpleado($_POST['ejecutaTmpEmpleado']));
} else if (isset($_POST['rosterNominaInicio'])) {
    echo json_encode(RosterTest::rosterNominaInicio($_POST['rosterNominaInicio']));
} else if (isset($_POST['rosterNominaUpload'])) {
    echo json_encode(RosterTest::rosterNominaUpload($_POST['rosterNominaUpload']));
} else if (isset($_POST['paqrosterNominaLog'])) {
    $data = array(
        'ua' => $_POST['ua'], 'paqrosterNominaLog' => $_POST['paqrosterNominaLog'], 'cantrosterNominaLog' => $_POST['cantrosterNominaLog'], 'gesRosterNomina' => $_POST['gesRosterNomina']
    );
    echo json_encode(RosterTest::rosterNominaLog($data));
} else if (isset($_POST['rosterNominaProcess'])) {
    echo json_encode(RosterTest::rosterNominaProcess($_POST['rosterNominaProcess']));
} else if (isset($_POST['rosterNominaActivoInfo'])) {
    echo json_encode(RosterTest::rosterNominaActivoInfo($_POST['rosterNominaActivoInfo']));
} else if (isset($_POST['historicoUpdate'])) {
    echo json_encode(RosterTest::historicoUpdate($_POST['historicoUpdate']));
} else if (isset($_POST['rosterNominaUpdate'])) {
    $data = array('rosterNominaUpdate' => $_POST['rosterNominaUpdate']);
    echo json_encode(RosterTest::rosterNominaUpdate($data));
} else if (isset($_POST['rosterNominaMylink'])) {
    $data = array('rosterNominaMylink' => $_POST['rosterNominaMylink']);
    echo json_encode(RosterTest::rosterNominaMylink($data));
} else if (isset($_POST['rosterNominaRetiro'])) {
    $data = array('rosterNominaRetiro' => $_POST['rosterNominaRetiro']);
    echo json_encode(RosterTest::rosterNominaRetiro($data));
} else if (isset($_POST['almacenaTmpUsuariosLogin'])) {
    $data = array('ua' => $_POST['ua'], 'almacenaTmpUsuariosLogin' => $_POST['almacenaTmpUsuariosLogin']);
    echo json_encode(RosterTest::almacenaTmpUsuariosLogin($data));
} else if (isset($_POST['consultaTmpUsuarios'])) {
    $data = array('ua' => $_POST['ua'], 'consultaTmpUsuarios' => $_POST['consultaTmpUsuarios']);
    echo json_encode(RosterTest::consultaTmpUsuarios($data));
} else if (isset($_POST['ejecutaTmpUsuario'])) {
    echo json_encode(RosterTest::ejecutaTmpUsuario($_POST['ejecutaTmpUsuario']));
} else if (isset($_POST['listNegocio'])) {
    $data = array('listNegocio' => $_POST['listNegocio']);
    echo json_encode(RosterTest::listNegocios($data));

} else if (isset($_POST['listSplit'])) {
    echo json_encode(RosterTest::listSplit());
} else if (isset($_POST['DatosSplit'])) {
    echo json_encode(RosterTest::DatosSplit());
} else if (isset($_POST['listEmpresa'])) {
    echo json_encode(RosterTest::listEmpresa());
} else if (isset($_POST['updateIdNeg'])) {
    $data = array(
        'updateIdNeg' => $_POST['updateIdNeg'], 'updateUni' => $_POST['updateUni'], 'updateSubu' => $_POST['updateSubu'], 'updateLob' => $_POST['updateLob'], 'updateSer' => $_POST['updateSer'], 'updateSplit' => $_POST['updateSplit']
    );
    echo json_encode(RosterTest::updateNegocio($data));
} else if (isset($_POST['deleteIdNeg'])) {
    $data = array('deleteIdNeg' => $_POST['deleteIdNeg']);
    echo json_encode(RosterTest::deleteIdNeg($data));
} else if (isset($_POST['nuevoUni'])) {
    $data = array(
        'nuevoUni' => $_POST['nuevoUni'], 'nuevoSubu' => $_POST['nuevoSubu'], 'nuevoLob' => $_POST['nuevoLob'], 'nuevoSer' => $_POST['nuevoSer'], 'nuevoSplit' => $_POST['nuevoSplit']
    );
    echo json_encode(RosterTest::nuevoNegocio($data));
} else if (isset($_POST['CrearSplit'])) {
    $data = array(
        'CrearSplitEmp' => $_POST['CrearSplitEmp'], 'CrearSplit' => $_POST['CrearSplit']
    );
    echo json_encode(RosterTest::crearSplit($data));
} else if (isset($_POST['deleteSplit'])) {
    $data = array('deleteSplit' => $_POST['deleteSplit']);
    echo json_encode(RosterTest::deleteSplit($data));
} else if (isset($_POST['updCcId'])) {
    $data = array(
        'updCcId' => $_POST['updCcId'], 'updCcEmp' => $_POST['updCcEmp'], 'updCcSplit' => $_POST['updCcSplit']
    );
    echo json_encode(RosterTest::updateCentroCosto($data));
} else if (isset($_POST['rpte1'])) {
    echo json_encode(RosterTest::rpte1());
} else if (isset($_POST['rpte2'])) {
    echo json_encode(RosterTest::rpte2());
} else if (isset($_POST['rpte3'])) {
    echo json_encode(RosterTest::rpte3());
} else if (isset($_POST['rpte5'])) {
    echo json_encode(RosterTest::rpte5());
} else if (isset($_POST['rpte4'])) {
    $data = array(
        'rpte4' => $_POST['rpte4']
    );
    echo json_encode(RosterTest::rpte4($data));
} else if (isset($_POST['TotalRoster'])) {
    echo json_encode(RosterTest::TotalRoster());
}

else if (isset($_POST['buscaDoc'])) {
    $data = array('buscaDoc' => $_POST['buscaDoc']);
    echo json_encode(RosterTest::buscaDoc($data));
} else if (isset($_POST['uabtnUpdateSearchEmpl'])) {
    $data = array(
        'uabtnUpdateSearchEmpl' => $_POST['uabtnUpdateSearchEmpl'], 'idEmplbtnUpdateSearchEmpl' => $_POST['idEmplbtnUpdateSearchEmpl'], 'docOldbtnUpdateSearchEmpl' => $_POST['docOldbtnUpdateSearchEmpl'], 'docNewbtnUpdateSearchEmpl' => $_POST['docNewbtnUpdateSearchEmpl'], 'comentbtnUpdateSearchEmpl' => $_POST['comentbtnUpdateSearchEmpl']
    );
    echo json_encode(RosterTest::btnUpdateSearchEmpl($data));
} else if (isset($_POST['uabtnDeleteSearchEmpl'])) {
    $data = array(
        'uabtnDeleteSearchEmpl' => $_POST['uabtnDeleteSearchEmpl'], 'idEmplbtnDeleteSearchEmpl' => $_POST['idEmplbtnDeleteSearchEmpl'], 'docOldbtnDeleteSearchEmpl' => $_POST['docOldbtnDeleteSearchEmpl'], 'docNewbtnDeleteSearchEmpl' => $_POST['docNewbtnDeleteSearchEmpl'], 'comentbtnDeleteSearchEmpl' => $_POST['comentbtnDeleteSearchEmpl']
    );
    echo json_encode(RosterTest::btnDeleteSearchEmpl($data));
} else if (isset($_POST['uabtnQuitarRetiroSearchEmpl'])) {
    $data = array(
        'uabtnQuitarRetiroSearchEmpl' => $_POST['uabtnQuitarRetiroSearchEmpl'], 'idEmplbtnQuitarRetiroSearchEmpl' => $_POST['idEmplbtnQuitarRetiroSearchEmpl'], 'docOldbtnQuitarRetiroSearchEmpl' => $_POST['docOldbtnQuitarRetiroSearchEmpl'], 'docNewbtnQuitarRetiroSearchEmpl' => $_POST['docNewbtnQuitarRetiroSearchEmpl'], 'comentbtnQuitarRetiroSearchEmpl' => $_POST['comentbtnQuitarRetiroSearchEmpl']
    );
    echo json_encode(RosterTest::btnQuitarRetiroSearchEmpl($data));
} else if (isset($_POST['inParamRangEmpl'])) {
    $data = array(
        'inParamRangEmpl' => $_POST['inParamRangEmpl'], 'inParamRangUsu' => $_POST['inParamRangUsu'], 'inParamRangNom' => $_POST['inParamRangNom'], 'inParamConfigComent' => $_POST['inParamConfigComent'], 'inParamConfigUA' => $_POST['inParamConfigUA']
    );
    echo json_encode(RosterTest::updateConfigRang($data));
} else if (isset($_POST['consulParamRang'])) {
    echo json_encode(RosterTest::consulParamRang());
} else if (isset($_POST['listMesesReport'])) {
    echo json_encode(RosterTest::listMesesReport());
}  else if (isset($_POST['dashboardHome1Uni'])) {
    $data = array(
        'dashboardHome1Uni' => $_POST['dashboardHome1Uni'],'dashboardHome1Mes' => $_POST['dashboardHome1Mes']);
    echo json_encode(RosterTest::dashboardHome1Uni($data));
} else if (isset($_POST['dashboardHome2Uni'])) {
    $data = array(
        'dashboardHome2Uni' => $_POST['dashboardHome2Uni'],'dashboardHome2Mes' => $_POST['dashboardHome2Mes']);
    echo json_encode(RosterTest::dashboardHome2Uni($data));
} else if (isset($_POST['dashboardHome3Uni'])) {
    $data = array(
        'dashboardHome3Uni' => $_POST['dashboardHome3Uni'],'dashboardHome3Mes' => $_POST['dashboardHome3Mes']);
    echo json_encode(RosterTest::dashboardHome3Uni($data));
} else if (isset($_POST['rpteHomeCuentaMes_Uni'])) {
    $data = array(
        'rpteHomeCuentaMes_Uni' => $_POST['rpteHomeCuentaMes_Uni'],'rpteHomeCuentaMes_Mes' => $_POST['rpteHomeCuentaMes_Mes']);
    echo json_encode(RosterTest::rpteHomeCuentaMes($data));
}  else if (isset($_POST['DS_sociodemograficoInicio'])) {
    echo json_encode(RosterTest::sociodemograficoInicio());
} else if (isset($_POST['DS_sociodemograficoUpload'])) {
    $data = array(
        'DS_sociodemograficoUpload' => $_POST['DS_sociodemograficoUpload']);
    echo json_encode(RosterTest::sociodemograficoUpload($data));
} else if (isset($_POST['DS_sociodemograficoProcess'])) {
    echo json_encode(RosterTest::sociodemograficoProcess());
}






else {
    echo json_encode('El parámetro de la función no es correcto.');
}
