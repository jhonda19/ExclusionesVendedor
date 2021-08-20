<div class="card shadow mb-4 border-left-primary">
    <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
        <h2 class="m-0">&nbsp;Usuarios Login</h2>
    </a>
    <div class="collapse show" id="collapseCardExample">
        <div class="card-body">

            <form id="formUsuariosLogin" class="col-12 campos">
                <div class="row">
                    <div class="col-8">
                        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            El archivo a subir debe tener el nombre&nbsp;PlantillaUsuariosLogin&nbsp;y debe ser en formato .xlsx&nbsp; |
                            <a target="_blank" href="http://10.208.254.8/wfm/dist/public/files/PlantillaUsuariosLogin.xlsx" style="color:#2980b9"><b>Descargar Formato</b></a>
                        </p>
                        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            La base de datos no debe contener el siguiente carácter: " <span class="text-info">|</span> ".
                        </p>
                        <div class="row">
                            <div class="custom-file col-6 mt-3">
                                <input class="custom-file-input" type="file" id="xlsUsuariosLogin" lang="es" required>
                                <label for="xlsUsuariosLogin" class="custom-file-label">Seleccionar Excel...</label>
                            </div>
                            <div class="col-3 mt-3">
                                <button id="btnXlsUsuariosLogin" class="form-control btn btn-primary" type="button" data-toggle="modal" data-target="" disabled>
                                <i class="fas fa-cloud-upload-alt"></i></button>
                                <!-- <div id="progreso" class="mt-1" style="height: 15px;">

                                </div> -->
                            </div>
                            <div class="col-3">
                            </div>
                        </div>
                    </div>
                    <div class="col-4 ">

                    </div>
                </div>
            </form>

            <div class="mt-1">
                <!-- <div class="row"> -->
                    <div class="col-5 mt-2">
                        <table id="tblPlantillaUsuario" class="table table-sm table-hover">
                            <thead class="bg-dark text-white">
                            </thead>
                        </table>
                    </div>
                    <div class="col-7 mt-4" id="info">
                    </div>
                <!-- </div> -->
                <div class="mt-4">
                    <table id="tblDetalleUsuario">
                        <thead class="bg-secondary text-white">
                        </thead>
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>
<script src="js/roster.bundle.js"></script>