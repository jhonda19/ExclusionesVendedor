<?php
require_once '../controllers/login.controller.php';
require_once '../models/login.model.php';

if (isset($_POST['iniUser'])) {
    $data = array('iniUser' => $_POST['iniUser'], 'pass' => $_POST['pass']);
    echo json_encode(ControllerLogin::userLogin($data));
} else if (isset($_POST['idUser'])) {
    $data = array('idUser' => $_POST['idUser'], 'pUser' => $_POST['pUser'], 'nUser' => $_POST['nUser']);
    echo json_encode(ControllerLogin::userGlobal($data));
} else if (isset($_POST['logout'])) {
    echo json_encode(ControllerLogin::logout());
} else if (isset($_POST['validarFormDoc'])) {
    $data = array('validarFormDoc' => $_POST['validarFormDoc']);
    echo json_encode(ModelData::validarFormRestoreDoc($data));
} else if (isset($_POST['validarFormUser'])) {
    $data = array('validarFormUser' => $_POST['validarFormUser'], 'docForm' => $_POST['doc']);
    echo json_encode(ModelData::validarFormRestoreUser($data));
} else if (isset($_POST['validarFormContrato'])) {
    $data = array('user' => $_POST['user'], 'docForm' => $_POST['doc'], 'validarFormContrato' => $_POST['validarFormContrato']);
    echo json_encode(ModelData::validarFormRestoreContrato($data));
} else if (isset($_POST['Inrid'])) {
    $data = array(
        'Inrid' => $_POST['Inrid'], 'Inriu' => $_POST['Inriu'], 'Inric' => $_POST['Inric'], 'Inpass' => $_POST['Inpass']
    );
    echo json_encode(ModelData::restorePass($data));
} else if (isset($_POST['docUserApp'])) {
    echo json_encode(ModelData::searchId($_POST['docUserApp']));
} else if (isset($_POST['listViewsApp'])) {
    echo json_encode(ModelData::listViewsApp($_POST['listViewsApp']));
} else if (isset($_POST['savUsPer'])) {
    $data = array('savUsId' => $_POST['savUsId']
    , 'savUsPer' => $_POST['savUsPer']
    , 'savUsApp' => $_POST['savUsApp']);
    echo json_encode(ModelData::saveUser($data));
} else if (isset($_POST['keyUser'])) {
    echo json_encode(ControllerLogin::keyUserEncryp());
} else if (isset($_POST['valiUser'])) {
    $data = array('valiUser' => $_POST['valiUser']
    , 'valiPerfil' => $_POST['valiPerfil']);
    echo json_encode(ControllerLogin::validarLs($data));
} else if (isset($_POST['validaUserACtivo'])) {
    $data = array('validaUserACtivo' => $_POST['validaUserACtivo']);
    echo json_encode(ModelData::consultaUserVal($data));
}




