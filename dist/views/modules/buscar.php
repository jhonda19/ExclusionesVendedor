<div class="card shadow mb-4 border-left-primary">
    <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
        <h2 class="m-0">&nbsp;Buscar Empleado</h2>
    </a>
    <div class="collapse show" id="collapseCardExample">
        <div class="card-body ">
            <form>
                <div class="row">
                    <div class="col-6">
                        <input type="text" class="form-control" placeholder="Documento de Identidad" id="inDoc" autofocus>
                    </div>
                    <div class="col-6">
                        <button type="button" class="btn btn-primary btn-user" id="btnBuscarEmp">
                            <i class="fas fa-search"></i>&nbsp; Buscar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade bd-example-modal-lg" id="searchEmplModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="searchEmplModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="searchEmplModalLabel">Información Empleado</h2>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row" id="datosModalResEmpl">
                   
                </div>
                <div class="row mb-4" id="datosModalEditEmpl">
                   
                </div>
            </div>
        </div>
    </div>
</div>


<div class="modal fade bd-example-modal-lg" id="datosAdicionalesModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="datosAdicionalesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="datosAdicionalesModalLabel">Datos</h2>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row" id="a">
                   
                </div>
            </div>
        </div>
    </div>
</div>
<script src="js/roster.bundle.js"></script>