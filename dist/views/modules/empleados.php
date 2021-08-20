<div class="card shadow mb-4 border-left-primary">
    <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
        <h2 class="m-0">&nbsp;Actualizar Empleado</h2>
    </a>
    <div class="collapse show" id="collapseCardExample">
        <div class="card-body">

            <form id="formEmpleados" class="col-12 campos">
                <div class="row">
                    <div class="col-8">
                        <div>
                            <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>
                                <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                                El archivo a subir debe iniciar con el nombre&nbsp;PlantillaEmpleado_&nbsp;y debe ser en formato
                                .xlsx&nbsp; |
                                <a target="_blank" href="http://10.208.254.8/wfm/dist/public/files/PlantillaEmpleado_.xlsx" style="color:#2980b9"><b>Descargar Formato</b></a>
                            </p>
                            <p class="text-left"><i class="fas fa-info-circle text-dark"></i>
                                <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                                Las actualizaciones y los ingresos nuevos se reciben hasta con 15 días vencidos.&nbsp;
                            </p>
                            <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>
                                <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                                La base de datos no debe contener el siguiente carácter: " <span class="text-danger">|</span> ".
                            </p>
                        </div>
                        <div class="row">
                            <div class="custom-file col-6 mt-3">
                                <input id="xlsEmpleados" class="custom-file-input" type="file" name="xlsEmpleados">
                                <label for="xlsEmpleados" class="custom-file-label">Seleccionar Excel...</label>
                            </div>
                            <div class="col-3 mt-3">
                                <button id="btnXlsEmpleados" class="btn btn-primary btn-sm btn-block" type="button" data-toggle="modal" data-target="" disabled>
                                    <i class="fas fa-cloud-upload-alt"></i>
                            </div>
                            <div class="col-3">
                            </div>
                        </div>
                    </div>

                    <div class="col-4">
                    </div>
                </div>
            </form>

            <div class="mt-1">
                <!-- <div class="row"> -->
                <div class="col-5 mt-2">
                    <table id="tblPlantillaEmpleado" class="table table-sm table-hover">
                        <thead class="bg-dark text-white">
                        </thead>
                    </table>
                </div>
                <div class="col-7 mt-4" id="info">
                </div>

                <!-- </div> -->
                <div class="mt-4">
                    <table id="tblDetalleValidacion">
                        <thead class="">
                        </thead>
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>


<div class="modal fade" id="modalResEjecuta" tabindex="-1" role="dialog" aria-labelledby="modalResEjecutaLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="modalResEjecutaLabel"></h1>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-6 text-center" id="infoModal">
                    </div>
                    <div class="col-6" id="infoModal2">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" onclick="window.location.href='empleados';">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="p-3">
                    <p class="text-justify"><b>Primera definición:</b> se clasifica el personal en reintegro, ingreso
                        nuevo y actualización.</p>
                    <p class="text-justify"><b>Validación de Formato:</b> se determinaron las columnas que deben
                        diligenciarse para cada tipo de personal, los siguientes campos no pueden estar vacíos:</p>
                    <ul>
                        <li class="text-justify"><b>Reintegro e Ingreso Nuevo:</b> documento, documento empleado, cargo
                            empleado, cargo ejecutado, site, piso, fecha inicio, sexo, nombre y modelo de trabajo.</li>
                        <li class="text-justify"><b>Actualización:</b> documento y fecha cambio.</li>
                    </ul>
                    <p class="text-justify"> <b>Validación de datos:</b></p>
                    <ul>
                        <li class="text-justify">Los datos de cuenta, cargo, site, sexo, modelo de trabajo y documento
                            del jefe son revisados con la información de la base de datos, por lo tanto, no permite
                            continuar si la información no existe.</li>
                        <li class="text-justify">Los campos de fecha inicio y fecha de cambio solo son validos hasta con
                            15 días de vencimiento.</li>
                        <li class="text-justify">Anula identificaciones vacías, menores a 5 dígitos y duplicados en el
                            campo documento.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="js/roster.bundle.js"></script>