<div class="card shadow mb-4 border-left-primary">
    <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
        <h2 class="m-0">&nbsp;Consultar Conexión</h2>
    </a>
    <div class="collapse show" id="collapseCardExample">
        <div class="card-body ">
            <form id="inFormPayrollEmpl">

                <div class="row mt-3">
                    <div class="col-sm-12" id="infoHisConexion">
                    </div>
                    <div class="col-sm-4 mt-2">
                        <input type="text" list="inListEquipoData" id="inListEquipo" class="form-control inListEquipoData" placeholder="Número de documento" data-toggle="tooltip" data-placement="bottom" title="Puede buscar por número de documento o seleccionar el personal que tiene a cargo.">
                        <datalist id="inListEquipoData">
                        </datalist>
                    </div>

                    <div class="col-sm-3 mt-2">
                        <select class="form-control" placeholder="Quincena" id="inListQuincena">
                        </select>
                    </div>
                    <div class="col-sm-2 mt-2">
                        <button type="button" class="btn btn-primary btn-block" id="btnBuscarEmpl">Buscar</button>
                    </div>
                </div>
        </div>
        </form>
        <div class="row no-gutters align-items-center ml-3 col-sm-7 mt-5 " id="infoEmpleado">

        </div>

        <div class="row mt-5" id="resumenPayrollEmpl">

        </div>

        <div class="mt-4 col-12 mb-5">
            <table id="tblIncreYbleAdh" class="table table-sm table-hover">
                <thead class="bg-light text-dark">
                </thead>
            </table>
        </div>

    </div>
</div>

<!-- Large modal -->
<div class="modal fade bd-example-modal-lg" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="staticBackdropLabel">Solicitar Ajuste de Conexión</h2>
            </div>
            <div class="modal-body">
                <div class="text-justify">
                    <h6 class="mb-4"><i class="fas fa-info-circle text-dark"></i> Cuando este todo listo, has clic en guardar.</h6>
                </div>

                <form id="formModalAjuste">
                    <div class="row col-12">
                        <h5 class="text-secondary mb-3 font-weight-bold">Información Actual:</h5>
                    </div>

                    <div class="form-group col-4">
                        <input type="hidden" class="form-control form-control-sm" id="inNIdEmple" autocomplete="off" onkeydown="return false" disabled="">
                    </div>

                    <div class="col-12 text-center" id="infoModaldía">
                        <div class="spinner-border spinner-border-sm text-muted mb-5" role="status"></div>
                    </div>

                    <div class="col-12 text-center" id="infoModaldíaDetallado">
                        <div class="spinner-border spinner-border-sm text-muted mb-5" role="status"></div>
                    </div>

                    <div class="row col-12">
                        <h5 class="text-secondary mb-3 font-weight-bold">Solicitar Ajuste:</h5>
                    </div>
                    <div class="row col-12" id="infoModalAjuste">
                        <div class="form-group col-4">
                            <label for="inTIngresarPersonaCE1">Solicitud <span class="text-danger h1">*</span></label>
                            <select class="form-control form-control-sm " id="inTSolicitud">


                            </select>
                        </div>
                        <div class="form-group col-4">
                            <label for="inTIngresarPersonaCE2">Tipo de Labor <span class="text-danger h1">*</span></label>
                            <select class="form-control form-control-sm " id="inTLabor">

                            </select>
                        </div>
                        <div class="form-group col-4">
                            <label for="inTIngresarPersonaCE3">Causal <span class="text-danger h1">*</span></label>
                            <select class="form-control form-control-sm " id="inTCausal">

                            </select>
                        </div>
                        <!-- <div class="form-group col-4"> -->
                            <!-- <label for="inTIngresarPersonaCE3">Fecha Inicio Novedad <span class="text-danger h1">*</span></label> -->
                            <input type="hidden" class="form-control form-control-sm" id="inDFechaInicio" autocomplete="off" onkeydown="return false">
                        <!-- </div> -->

                        <div class="form-group col-4">
                            <label for="inTIngresarPersonaCE3">Hora Inicio Novedad <span class="text-danger h1">*</span></label>
                            <input type="text" class="form-control form-control-sm" id="inTHoraInicio" autocomplete="off">
                        </div>

                        <!-- <div class="form-group col-4"> -->
                            <!-- <label for="inTIngresarPersonaCE3">Fecha Fin Novedad <span class="text-danger h1">*</span></label> -->
                            <input type="hidden" class="form-control form-control-sm" id="inDFechaFin" autocomplete="off" onkeydown="return false">
                        <!-- </div> -->

                        <div class="form-group col-4">
                            <label for="inTIngresarPersonaCE3">Hora Fin Novedad <span class="text-danger h1">*</span></label>
                            <input type="text" class="form-control form-control-sm" id="inTHoraFin" autocomplete="off">
                        </div>

                        <div class="form-group col-4">
                            <label for="inTIngresarPersonaCE3">Tiempo No Pago <span class="text-danger h1">*</span></label>
                            <input type="text" class="form-control form-control-sm" id="inTHDescuentos" autocomplete="off">
                        </div>

                        <input type="hidden" class="form-control form-control-sm" id="inFtotalHrsAjuste" autocomplete="off">

                        <div class="form-group col-12 text-center p-3" id="infoHTotalTiempo" onkeydown="return false" disabled="">

                        </div>

                        <div class="form-group col-12">
                            <label for="inObservaciones">Observaciones <span class="text-danger h1">*</span></label>
                            <textarea class="form-control form-control-sm" id="inTObservaciones"></textarea>
                        </div>


                    </div>


                </form>
                <div class="col-12 text-right">
                    <button id="btnCancelarModalAjuste" type="button" class="btn btn-danger mt-5 ml-3" data-dismiss="modal"><i class="fas fa-reply"></i> Cancelar</button>
                    <button id="btnGuardarModalAjuste" type="button" class="btn btn-primary mt-5 ml-3"><i class="fas fa-save"></i> Guardar</button>
                </div>

            </div>
        </div>
    </div>
</div>

<script src="js/payroll.bundle.js"></script>