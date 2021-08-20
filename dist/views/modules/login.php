<div class="container-fluid">
  <!-- Outer Row -->
  <div class="row justify-content-center">

    <div class="col-xl-4 col-lg-12 col-md-9">

      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-12">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <!-- <div class="col-lg-6 d-none d-lg-block bg-login-image"></div> -->
            <div class="col-lg-12">
              <div class="p-5">
                <div class="text-center">
                  <div class="col-sm-12 d-none d-sm-block">
                    <img src="./public/img/onelink300px.png" class="mt-n4">
                  </div>
                  <h1 class="h4 text-muted mb-4 font-weight-bold">Iniciar Sesión En Exclusiones Vendedor</h1>
                </div>
                <form class="user" id="loginForm">
                  <div class="form-group">
                    <input type="text" class="form-control form-control-user" id="InputUser" aria-describedby="emailHelp" placeholder="Usuario de red">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-user" id="InputPassword" placeholder="Contraseña">
                  </div>

                  <button type="button" class="btn btn-primary btn-user btn-block mt-5 text-white" id="loginBtn" disabled>
                  <i class="fas fa-sign-in-alt text-white"></i>&nbsp; Continuar 
                  </button>
                </form>
                <hr class="loginForgot">
                <div class="text-center">
                  <a class="small" href="" data-toggle="modal" data-target="#staticBackdrop">¿Se te olvidó tu contraseña?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</div>


<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="staticBackdropLabel">¿Olvidaste tu contraseña?</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <!-- <div class="col-lg-6 d-none d-lg-block"></div> -->
          <div class="col-lg-12">
            <div class="p-1">
              <div class="text-justify">
                <p class="mb-4">Lo entendemos, pasan cosas. Simplemente completa los siguientes datos para restablecer tu contraseña.</p>
              </div>
              <form class="user" id="restoreForm">
                <div class="form-group col-12">

                  <div class="input-group">
                    <div class="input-group-prepend" id="basic-addon1">
                      <span class="input-group-text mt-2">
                        <i class="fas fa-fw fa-address-card"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control form-control-user mt-2" id="restoreInputDoc" placeholder="Documento de identidad">
                  </div>

                  <div class="input-group">
                    <div class="input-group-prepend" id="basic-addon2">
                      <span class="input-group-text mt-2">
                        <i class="fas fa-fw fa-user"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control form-control-user mt-2" id="restoreInputUser" placeholder="Usuario de red">
                  </div>

                  <div class="input-group">
                    <div class="input-group-prepend" id="basic-addon3">
                      <span class="input-group-text mt-2">
                        <i class="fas fa-fw fa-handshake"></i>
                      </span>
                    </div>
                    <input type="date" class="form-control form-control-user mt-2" id="restoreInputContrato" placeholder="Fecha de Contrato">
                  </div>

                  <div class="alert alert-info alert-dismissible fade show mt-3" role="alert">
                    <h6 class="font-weight-bold">El password debe contener</h6>
                    <p class="my-0 py-0">- Almenos 8 caracteres.</p>
                    <p class="my-0 py-0">- Incluir una letra minuscula</p>
                    <p class="my-0 py-0">- Incluir una letra mayúscula</p>
                    <p class="my-0 py-0">- Incluir un número</p>
                    <p class="my-0 py-0">- Incluir uno de estos caracteres especiales: !@#$%^&amp;*+</p><button type="button" class="close animated fadeIn slow" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                  </div>

                  <div class="input-group">
                    <div class="input-group-prepend" id="basic-addon4">
                      <span class="input-group-text mt-2">
                        <i class="fas fa-fw fa-lock"></i>
                      </span>
                    </div>
                    <input type="password" class="form-control form-control-user mt-2" id="restoreInputPass" placeholder="Nueva contraseña" disabled>
                  </div>


                </div>
                <button type="button" class="btn btn-danger btn-user btn-block" id="btnRestoreLogin" disabled max="30">
                  Restablecer
                </button>
              </form>
            </div>
          </div>
          <!-- fin -->
        </div>
      </div>

    </div>

  </div>
</div>
