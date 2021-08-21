<?php

include_once '../models/vendedor.model.php';

if (isset($_POST['qry_f1_bu'])) {
    $data = array('qry_f1_bu' => $_POST['qry_f1_bu'], 'qry_f1_proceso' => $_POST['qry_f1_proceso']);
    echo json_encode(QryVendedor::qryFLujo1($data));
} 


else {
    echo json_encode('El parámetro de la función no es correcto.');
}
