<!-- <div class="card shadow mb-4 border-left-primary">
    <a href="#collapseCardRsoterCompleto" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardRsoterCompleto">
        <h2 class="m-0">&nbsp;Roster</h2>
    </a> -->
    <!-- <div class="collapse show" id="collapseCardRsoterCompleto">
        <div class="card-body">
            <div class="row">
                <button type="button" class="btn btn-primary align-middle ml-3" title="Actualizar" id="btnTotalRosterRefresh"><i class="fas fa-sync"></i></button>
                <button type="button" class="btn btn-danger align-middle ml-3" title="Descargar" id="btnTotalRosterDown"><i class="fas fa-cloud-download-alt"></i></button>
            </div>
            <div class="text-center h3 mt-3" id="loadRosterTotal">
            <div class="spinner-border spinner-border-sm text-muted" role="status"></div>&nbsp;cargando...
            </div>
           
            <table id="tblRostCompl" class="table table-hover mt-3 table-peque w-auto text-xsmall" data-show-search-clear-button="true">
                <thead class="text-center">
                
                </thead>
                <tbody class="text-center align-middle">
                </tbody>
            </table>

        </div>
    </div> -->
<!-- </div> -->

<div class="card shadow mb-4 border-left-primary">
    <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
        <h2 class="m-0">&nbsp;Reportes</h2>
    </a>
    <div class="collapse show" id="collapseCardExample">
        <div class="card-body ">
            <table id="tblReportes" class="table table-lg table-hover">
                <thead class="bg-dark text-white text-center">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Descargar</th>
                    </tr>
                </thead>
                <tbody class="text-center align-middle">
                    <tr>
                        <td class="font-weight-bold align-middle">Reporte 1</td>
                        <td class="text-justify align-middle">Personal que no registra en el roster y si esta incluido en la base de datos de nómina.</td>
                        <td> <button type="button" class="btn btn-danger align-middle" id="btnRpt1"><i class="fas fa-cloud-download-alt"></i></button></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold align-middle">Reporte 2</td>
                        <td class="text-justify align-middle">Personal que no regista en la base de datos de nómina y si esta includo en el roster.</td>
                        <td> <button type="button" class="btn btn-danger align-middle" id="btnRpt2"><i class="fas fa-cloud-download-alt"></i></button></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold align-middle">Reporte 3</td>
                        <td class="text-justify align-middle">Personal operativo sin al menos un usuario registrado.</td>
                        <td> <button type="button" class="btn btn-danger align-middle" id="btnRpt3"><i class="fas fa-cloud-download-alt"></i></button></td>
                    </tr>

                    <tr>
                        <td class="font-weight-bold align-middle">Reporte 4</td>
                        <td class="text-justify align-middle">
                            <div class="row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Personal activo y retirado por cuenta:</label>
                                <div class="col-sm-8">
                                    <select class="form-control" id="inputUnidades">
                                        <option select disabled=""></option>
                                    </select>
                                </div>
                            </div>

                        </td>
                        <td> <button type="button" class="btn btn-danger align-middle" id="btnRpt4"><i class="fas fa-cloud-download-alt"></i></button></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold align-middle">Reporte 5</td>
                        <td class="text-justify align-middle">Usuarios registrados (última actualización).</td>
                        <td> <button type="button" class="btn btn-danger align-middle" id="btnRpt5"><i class="fas fa-cloud-download-alt"></i></button></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</div>
<script src="js/roster.bundle.js"></script>