<?php

include_once '../models/upload.model.php';

if (isset($_POST['User_almacenaTmpData'])) {
    $data = array('User_almacenaTmpData' => $_POST['User_almacenaTmpData']
        , 'Data_almacenaTmpData' => $_POST['Data_almacenaTmpData']
        , 'Data_paqSend' => $_POST['Data_paqSend']);
    echo json_encode(GestionData::almacenaTmpData($data));
}  elseif (isset($_POST['User_procesaTmpData'])) {
    $data = array('User_procesaTmpData' => $_POST['User_procesaTmpData']);
    echo json_encode(GestionData::procesosTmpData($data));
// } elseif (isset($_POST['User_consultaTmpMalasXe'])) {
//     $data = array('User_consultaTmpMalasXe' => $_POST['User_consultaTmpMalasXe']
//         ,'Estado_consultaTmpMalasXe' => $_POST['Estado_consultaTmpMalasXe']
//     );
//     echo json_encode(GestionMallas::consultaTmpMallasxEstado($data));
// } elseif (isset($_POST['User_ejecutaTmpMalla'])) {
//     $data = array('User_ejecutaTmpMalla' => $_POST['User_ejecutaTmpMalla']);
//     echo json_encode(GestionMallas::ejecutaTmpMalla($data));
} else {
    echo json_encode('El parámetro de la función no es correcto.');
}


