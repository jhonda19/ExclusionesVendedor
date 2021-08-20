<div class="card shadow mb-4 border-left-primary">
    <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
        <h2 class="m-0">&nbsp;Roster Nómina - IdMylink - Retiros</h2>
    </a>
    <div class="collapse show" id="collapseCardExample">
        <div class="card-body">

            <form id="formRosterNomina" class="col-12 campos">
                <div class="row">
                    <div class="col-8">
                        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>&nbsp;
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            Evite cargar mas 18.000 registros, cargue activos y los retiros mas recientes.
                        </p>
                        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>&nbsp;
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            Procure hacer un solo cargue que incluya todas las empresas.
                        </p>
                        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>&nbsp;
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            La base de datos no debe contener el siguiente carácter: " <span class="text-danger">|</span> ".
                        </p>
                        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>&nbsp;
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            Solo serán procesados los registros validos dependiendo del tipo de gestión. &nbsp; |&nbsp; <a href="" data-toggle="modal" data-target="#infoModalNomina" style="color:#2980b9"><b>Consultar</b></a>
                        </p>
                        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>&nbsp;
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            El archivo a subir debe tener el nombre&nbsp;PlantillaRosterNomina&nbsp;y debe ser en formato .xlsx&nbsp; |&nbsp;
                            <a target="_blank" href="https://onelinkbpo1-my.sharepoint.com/:x:/g/personal/john_ospina_onelinkbpo_com/EWs-POPWpTVFsaDxLPEp9BUBSWcn17zPja4iMNhhkPzXAw?e=LcjzKA" style="color:#2980b9"><b>Descargar Formato</b></a>
                        </p>
                        <div class="row">
                            <div class="custom-file col-9 mt-3">
                                <input class="custom-file-input" type="file" id="xlsRosterNomina" lang="es" required>
                                <label for="xlsRosterNomina" class="custom-file-label">Seleccionar Excel...</label>
                            </div>
                            <div class="col-3 mt-3">
                                <select class="form-control" id="selectRosterNomina" disabled>
                                    <option disabled selected>Seleccionar...</option>
                                    <option>Nómina</option>
                                    <option>IdMylink</option>
                                    <option>Retiro</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-6 mt-5 mx-auto">
                            <button id="btnXlsRosterNomina" class="btn btn-primary btn-sm btn-block" type="button" data-toggle="modal" data-target="" disabled>
                                <i class="fas fa-cloud-upload-alt"></i>
                            </button>
                            <div id="progreso" class="mt-1" style="height: 15px;">

                            </div>
                        </div>
                    </div>
                    <div class="col-4 ">
                        <div class="card mt-2">
                            <div class="card-body" id="infoActualizacion">
                                <div class="text-center">
                                    <div class="spinner-border spinner-border-sm text-muted" role="status">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mt-2">
                            <h3 class="card-title ml-4 mt-2 text-dark font-weight-bold"> <i class="fas fa-history text-info"></i>&nbsp;Histórico</h3>
                            <div class="card-body">
                                <div id="infoActualizacionHis" class="mt-n4 text-center">
                                    <div class="spinner-border spinner-border-sm text-muted" role="status">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </form>


        </div>
    </div>
</div>



<div class="modal fade" id="infoModalNomina" tabindex="-1" role="dialog" aria-labelledby="infoModalNominaTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="p-3">
                    <p class="text-justify"><b>Primeras definiciones:</b></p>
                    <ul>
                        <li class="text-justify">Anula duplicidad de documento, tomando el registro más reciente por fecha de retiro. </li>
                        <li class="text-justify">Filtra el personal que haga parte de las empresas y centros de costo configurados. </li>
                        <li class="text-justify">Acepta todos los activos y retiros que estén dentro del rango de días configurado. </li>
                        <li class="text-justify">Anula los registros en donde la fecha de Ingreso sea mayor a la fecha de Retiro. </li>
                    </ul>

                    <p class="text-justify"><b>Nómina:</b></p>
                    <ul>
                        <li class="text-justify">Divide la gestión entre personal activo y retirado. </li>
                        <li class="text-justify">Activo: marca una única vez si la persona registra como contratada real. </li>
                        <li class="text-justify">Activo: actualiza tipo de documento, nombre, Split y clase de salario con la fecha actual de cargue. </li>
                        <li class="text-justify">Retirado: actualiza la fecha de retiro del personal activo y retirado, tomando el registro más reciente. </li>
                        <li class="text-justify">Retiro: Se actualiza siempre y cuando la fecha de retiro sea mayor a la última fecha de contrato registrada en el roster.</li>
                        <li class="text-justify">Activo y Retirado: actualiza personal nuevo que no está en el roster y si en nómina. </li>

                    </ul>
                    <p class="text-justify"><b>Mylink:</b></p>
                    <ul>
                        <li class="text-justify">Gestiona personal activo. </li>
                        <li class="text-justify">Actualiza idMylink con la fecha actual de cargue. </li>
                        <li class="text-justify">Campos Obligatorios: empresa, cedula, vhur, split, idMylink </li>
                    </ul>

                    <p class="text-justify"><b>Retiro:</b></p>
                    <ul>
                        <li class="text-justify">Gestiona personal activo y Retirado. </li>
                        <li class="text-justify">Actualiza la fecha de retiro del personal activo y retirado, tomando el registro más reciente.</li>
                        <li class="text-justify">Campos Obligatorios: empresa, cedula, split, fechaRetiro, motivoRetiro </li>
                        <li class="text-justify">Retiro: Se actualiza siempre y cuando la fecha de retiro sea mayor a la última fecha de contrato registrada en el roster.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="js/roster.bundle.js"></script>