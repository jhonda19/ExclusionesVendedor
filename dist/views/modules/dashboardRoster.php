<div class="card shadow mb-4 border-left-primary">
    <a href="#cardStatusRoster" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="cardStatusRoster">
        <h2 class="m-0">&nbsp;Dashboard Roster</h2>
    </a>

    <div class="collapse show" id="cardStatusRoster">
        <div class="card-body">
            <form class="row" id="formHomeDash">
                <div class="col-sm-3 mt-3 mb-5 ml-2">
                    <select class="form-control" id="inputUnidades">
                        <option select disabled=""></option>
                    </select>
                </div>
                <div class="col-sm-3 mt-3 mb-5 ml-2">
                    <select class="form-control" id="inputMeses">
                        <option select disabled=""></option>
                    </select>
                </div>
                <div class="col-sm-3 mt-3 mb-5 ml-2 text-left">
                    <button type="button" title="Descargar Excel" class="btn btn-outline-secondary" id="btnDescargarHome"><i class="fas fa-download"></i></button>

                </div>
            </form>

            <!-- Content Row -->
            <div class="row">

                <div class="col-xl-4 col-md-6 mb-4">
                    <div class="card border-left-warning shadow h-100 py-1">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center ml-3" id="contentCard1RosterHome">

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4 col-md-6 mb-4">
                    <div class="card border-left-success shadow h-100 py-1">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center ml-3" id="contentCard2RosterHome">

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4 col-md-6 mb-4">
                    <div class="card border-left-danger shadow h-100 py-1">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center ml-3" id="contentCard3RosterHome">

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Content Row -->

            <div class="row">

                <!-- Area Chart -->
                <div class="col-xl-8 col-lg-7">
                    <div class="card shadow mb-4">
                        <!-- Card Header - Dropdown -->
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Resumen por Subunidad</h6>
                        </div>
                        <!-- Card Body -->
                        <div class="card-body">
                            <div class=" table-responsive" id="datosResumenGeneral" style="max-Height: 400px;">

                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pie Chart -->
                <div class="col-xl-4 col-lg-5">
                    <div class="card shadow mb-4">
                        <!-- Card Header - Dropdown -->
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Modelo de Trabjo</h6>
                        </div>
                        <!-- Card Body -->
                        <div class="card-body">
                            <div class="" id="datosModeloTrabajo">

                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
<script src="js/roster.bundle.js"></script>