<div class="card shadow mb-4 border-left-primary">
  <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
    <h2 class="m-0">&nbsp;Acceso Usuario</h2>
  </a>
  <div class="collapse show" id="collapseCardExample">
    <div class="card-body">

      <form id="formEmpleados" class="col-12 campos">
        <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i>
          <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
          Ingrese el número de documento a consultar:&nbsp;
        </p>
        <div class="row ">
          <div class="col-4 ">
            <input type="text" class="form-control form-control-user" id="userDocumento" placeholder="Documento de identidad" autofocus>
          </div>
          <div class="col-2">
            <button type="button" class="btn btn-primary " id="btnSearchId" max="30">
            <i class="fas fa-search text-da<irk"></i>
            </button>
          </div>
        </div>
        <div id="resDoc" class="mt-5 col-10">

        </div>

        <div id="resPerDoc" class="mt-4 col-10">
          <table id="tblviewsDoc" class="table table-lg table-hover">
            <thead class="bg-dark text-white">
            </thead>
          </table>

        </div>

        <div id="divBtnGuardarUser" class="mt-5 col-8">
         

        </div>
      </form>

    </div>
  </div>
</div>