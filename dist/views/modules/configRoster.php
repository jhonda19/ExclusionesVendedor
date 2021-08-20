<div class="card shadow mb-4 border-left-primary">
    <a href="#cardConfigModal" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="cardConfigModal">
        <h2 class="m-0">&nbsp;Configuración Roster</h2>
    </a>
    <div class="collapse show" id="cardConfigModal">
        <div class="card-body ">
            <h2 class="mb-4 mt-2 text-dark"><i class="fas fa-calendar-alt"></i>&nbsp; Tiempo valido para gestionar la solicitud:</h2 class="mb-4">
            <h3 clas="mt-3 ml-2 text-dark"><i class="fas fa-info-circle text-dark"></i>&nbsp; La configuración por defecto para todos los campos es de 15 días, asegúrese de dejar esto así una vez haya realizado los cambios que necesite.</h3>
            <form class="ml-3" id="formInParamRang">
                <div class="form-group row mt-4">
                    <label for="inputPassword" class="col-sm-4 h4 col-form-label">Ingreso y/o actualización de empleados:</label>
                    <div class="col-sm-2">
                        <select class="form-control" id="inParamRangEmpl">
                            <option value=8>8 días</option>
                            <option value=15>15 días</option>
                            <option value=30>1 mes</option>
                            <option value=90>3 meses</option>
                            <option value=180>6 meses</option>
                            <option value=360>1 año</option>
                            <option value=720>2 años</option>
                            <option value=1080>3 años</option>
                            <option value=1440>4 años</option>
                            <option value=1800>5 años</option>
                            <option value=2520>7 años</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 h4 col-form-label">Ingreso y/o actualización de usuario:</label>
                    <div class="col-sm-2">
                        <select class="form-control" id="inParamRangUsu">
                            <option value=8>8 días</option>
                            <option value=15>15 días</option>
                            <option value=30>1 mes</option>
                            <option value=90>3 meses</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4  h4 col-form-label">Actualización datos de nómina:</label>
                    <div class="col-sm-2">
                        <select class="form-control" id="inParamRangNom">
                            <option value=8>8 días</option>
                            <option value=15>15 días</option>
                            <option value=30>1 mes</option>
                            <option value=90>3 meses</option>
                            <option value=180>6 meses</option>
                            <option value=360>1 año</option>
                            <option value=720>2 años</option>
                            <option value=1080>3 años</option>
                            <option value=1440>4 años</option>
                            <option value=1800>5 años</option>
                            <option value=2520>7 años</option>
                        </select>
                    </div>
                </div>

                <div class="form-group row mt-5">
                    <textarea id="inParamConfigComent" class="md-textarea form-control col-sm-6 " rows="1" placeholder="Por favor indique claramente el motivo de la solicitud." disabled></textarea>
                    <div class="col-sm-2">
                        <button type="button" class="btn btn-primary btn-user" id="btnUpdateConfigRang" disabled>
                            <i class="fas fa-save"></i>&nbsp; Gurdar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="card shadow mb-4 border-left-primary">
    <a href="#cardConfigUnidades" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="cardConfigUnidades">
        <h2 class="m-0">&nbsp;Unidades de Negocio</h2>
    </a>
    <div class="collapse show" id="cardConfigUnidades">
        <div class="card-body">

            <form id="formNegocios" class="col-12 campos">
                <div class="row">
                    <div class="p-2">
                        <button type="button" class="btn btn-primary btn-user mt-2" id="btnGuadarNuevo" data-toggle="modal" data-target="#staticBackdrop">
                            <i class="fas fa-plus"></i>&nbsp; Nueva Unidad</button>
                    </div>
                    <div class="p-2">
                        <button type="button" class="btn btn-danger btn-user mt-2" id="btnDescargarData">
                            <i class="fas fa-cloud-download-alt"></i>&nbsp; Descargar</button>
                    </div>
                </div>
                <div id="resPerDoc" class="mt-1 col-12">
                    <table id="tblnegocios" class="table table-sm table-hover">
                        <thead class="bg-light text-dark">
                        </thead>
                    </table>
                </div>
            </form>
        </div>
    </div>
</div>


<div class="card shadow mb-4 border-left-primary">
    <a href="#cardconfigSplit" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="cardconfigSplit">
        <h2 class="m-0">&nbsp;Centro de Costo</h2>
    </a>
    <div class="collapse show" id="cardconfigSplit">
        <div class="card-body">

            <form id="formsplit" class="col-12 campos">
                <div class="row">
                    <div class="p-2">
                        <button type="button" class="btn btn-primary btn-user mt-2" id="btnGuadarNuevoSplit" data-toggle="modal" data-target="#staticBackdrop">
                            <i class="fas fa-plus"></i>&nbsp; Nuevo Centro</button>
                    </div>
                    <div class="p-2">
                        <button type="button" class="btn btn-danger btn-user mt-2" id="btnDescargarDataSplit">
                            <i class="fas fa-cloud-download-alt"></i>&nbsp; Descargar</button>
                    </div>
                </div>
                <div id="resPerDoc" class="mt-1 col-12">
                    <table id="tblsplit" class="table table-sm table-hover">
                        <thead class="bg-light text-dark">
                        </thead>
                    </table>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal Negocio-->
<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="staticBackdropLabel">Unidad de Negocio</h2>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="p-1">
                            <div class="text-justify">
                                <p class="mb-4">Cuando este todo listo, has clic en guardar.</p>
                            </div>
                            <form class="user" id="modalForm">

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="js/roster.bundle.js"></script>