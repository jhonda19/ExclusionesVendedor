<div class="card shadow mb-4 border-left-primary">
    <a href="#collapseCardRsoterSociodemo" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardRsoterSociodemo">
        <h2 class="m-0">&nbsp;Sociodemográfico</h2>
    </a>
    <div class="collapse show" id="collapseCardRsoterSociodemo">
        <div class="card-body">
            <form id="formSociodemografico" class="form-group mt-3">
                <div class="row">
                    <div class="col-12">
                        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>&nbsp;
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            Máximo 8.000 registros
                        </p>
                        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>&nbsp;
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            La base de datos no debe contener el siguiente carácter " <span class="text-danger h2">|</span> ".
                        </p>
                        <!-- <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>&nbsp;
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            Solo serán procesados los registros validos dependiendo del tipo de gestión. &nbsp; |&nbsp; <a href="" data-toggle="modal" data-target="#infoModalNomina" style="color:#2980b9"><b>Consultar</b></a>
                        </p> -->
                        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>&nbsp;
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                            El archivo a subir debe tener el nombre&nbsp;PlantillaSociodemografico&nbsp;y debe ser en formato .xlsx&nbsp; |&nbsp;
                            <a target="_blank" href="http://10.208.254.8/wfm/dist/public/files/PlantillaSociodemografico.xlsx" style="color:#2980b9"><b>Descargar Formato</b></a>
                        </p>
                        <div class="row">
                            <div class="custom-file col-sm-6 mt-3">
                                <input class="custom-file-input" type="file" id="XlsSociodemografico" lang="es" required>
                                <label for="XlsSociodemografico" class="custom-file-label">Seleccionar Excel...</label>
                            </div>
                            <div class="col-sm-3 mt-3">
                                <button id="btnXlsSociodemografico" class="btn btn-primary btn-sm btn-block" type="button" data-toggle="modal" data-target="" disabled>
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </button>
                                <div id="progreso" class="mt-1" style="height: 15px;">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>



        </div>
    </div>
</div>


<script src="js/roster.bundle.js"></script>