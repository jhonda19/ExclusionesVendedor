<!-- Page Wrapper -->
<div id="wrapper">
  <ul class="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">
    <a class="sidebar-brand d-flex align-items-center justify-content-center my-3 class_a_href" href="">
      <div class="sidebar-brand-icon">
        <img src="./public/img/logo-onelink.png" width="100%" class="">
      </div>
    </a>
    <hr class="sidebar-divider my-0">
    <li class="nav-item">
      <a class="nav-link" href="inicio">
        <i class="fas fa-fw fa-home"></i>
        <span>Inicio</span></a>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-fw fa-cog"></i>
        <span>Admin</span>
      </a>
      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded" id="viewsAdmin">

        </div>
      </div>
    </li>
    <hr class="sidebar-divider">
    <li class="nav-item">
      <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseRosterAdmin" aria-expanded="true" aria-controls="collapseRosterAdmin">
        <i class="fas fa-fw fa-share-alt"></i>
        <span>Guía Informativa</span>
      </a>
      <div id="collapseRosterAdmin" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded" id="viewsRoster">

        </div>
      </div>
    </li>
    

    <hr class="sidebar-divider d-none d-md-block">
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

  </ul>
  <div id="content-wrapper" class="d-flex flex-column">
    <div id="content">
      <nav class="navbar navbar-expand navbar-light  bg-white topbar mb-4 static-top shadow">
        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
          <i class="fa fa-bars"></i>
        </button>
        <ul class="navbar-nav ml-auto mr-4">
          <div class="topbar-divider d-none d-sm-block"></div>
          <li class="nav-item dropdown no-arrow">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            </a>
            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <!-- <a class="dropdown-item btn disabled" href="" >
                <i class="fas fa-user fa-sm fa-fw mr-2 text-muted"></i>
                Perfil
              </a>
              <a class="dropdown-item btn disabled" href="">
                <i class="fas fa-list fa-sm fa-fw mr-2 text-muted"></i>
                Actividad
              </a> -->
              <!-- <div class="dropdown-divider"></div> -->
              <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-danger"></i>
                Cerrar sesión
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title text-dark" id="">¿Preparado para salir?</h2>
            </div>
            <div class="modal-body">
              <p>Seleccione "Cerrar sesión" si está listo para finalizar su sesión actual.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
              <button class="btn btn-danger" id="btnLogoutUser" type="button" data-dismiss="modal">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>