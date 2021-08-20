import { Database } from '../db/dbApp';
import * as alerts from '../app/Alerts';
const db = new Database();

export function headerNew() {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };

    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

}// (jQuery); // End of use strict

export async function userActivo() {

  const elements = {
    userHeader: document.getElementById('userDropdown'),
  }
  const html = (`<span class="mr-2 d-none d-lg-inline text-dark">${localStorage.getItem('OLwfmNombre')}</span>
   <img class="img-profile rounded-circle" src="./public/img/${localStorage.getItem('OLwfmSexo') === 'M' ? 'man.png' : 'woman.png'}"></img>`);
  elements.userHeader.innerHTML = html;
}



export function logout(a) {
  if (a === 1) {
    const el = {
      btnLogoutUser: document.getElementById('btnLogoutUser'),
    }
    el.btnLogoutUser.addEventListener('click', async (e) => {
      out();
    })
  } else if (a === 2) {
    out();
  }

  async function out() {
    localStorage.removeItem('OLwfmEstado');
    localStorage.removeItem('OLwfmPerfil');
    localStorage.removeItem('OLwfmFeIngreso');
    localStorage.removeItem('OLwfmToken');
    localStorage.removeItem('OLwfmNombre');
    localStorage.removeItem('OLwfmId');
    localStorage.removeItem('OLwfmSexo');
    localStorage.removeItem('OLwfmUser');
    localStorage.removeItem('OLwfmFeContra');
    localStorage.removeItem('OLwfmUnidad');
    localStorage.removeItem('OLwfmCargo');
    localStorage.removeItem('OLwfmPosicion');
    localStorage.removeItem('OLwfmJerarquia');
    localStorage.removeItem('OLwfmDocUser');
    localStorage.removeItem('OLwfmAdminApp');
    const res = await db.logout();
    if (res == 1) {
      alerts.powerOff('Cerrando Sesión');
      setTimeout(() => {
        window.location = "inicio";
      }, 2000);

    } else {
      alerts.remove('Sin Conexión!');
    }
  }


  var time;

  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer;
  window.ontouchstart = resetTimer;
  window.onclick = resetTimer;
  window.onkeydown = resetTimer;
  window.addEventListener('scroll', resetTimer, true);

  function logoutInac() {
    alerts.confirm2("La sesión será finalizada por inactividad").then(async (e) => {
      if (e.value === true) {
        clearInterval(id);
        alerts.close();
      }
    })

    var cont = 60;
    var rango = document.querySelector('#conteoPower');

    var id = setInterval(function () {
      rango.innerHTML = cont;
      cont--;
      if (cont == -1) {
        clearInterval(id);
        out();
      }
    }, 1000)

  }

  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logoutInac, 1500000)
  }
}

export function elementsMain() {

  async function find(link, texto) {
    let vistas = await alerts.denc(localStorage.getItem('OLwfmPerfil'));
    if (vistas.indexOf(link) >= 0) {
      const check = await `<a class="collapse-item" href="${link}"><i class="fa fa-caret-right fa-fw"></i>&nbsp;${texto}</a>`;
      return await check;
    } else {
      const lock = await `<a class="collapse-item class_a_href bg-light"><i class="fa fa-lock fa-fw text-secondary"></i>&nbsp;${texto} </a>`;
      return await lock;
    }
  }

  const el = {
    viewsAdmin: document.querySelector('#viewsAdmin'),
    viewsRoster: document.querySelector('#viewsRoster'),
    viewsPayroll: document.querySelector('#viewsPayroll'),
    viewsUGA: document.querySelector('#viewsUGA'),
  }

  async function main() {
    const linksAdmin = (`${await find('usuarioApp', 'Usuario App')}
                        <hr class="divider">
                        ${await find('ugaRegistrarNovedad', 'Novedades UGA')}
                        ${await find('turnoProgramado', 'Turno Programado')}
                        `
                      );

    const linksRoster = (`${await find('dashboardRoster', 'Dashboard')}
                        ${await find('configRoster', 'Configuración')}
                        ${await find('sociodemografico', 'Sociodemográfico')}
                        <hr class="divider">
                        ${await find('empleados', 'Empleado')}
                        ${await find('usuarios', 'Usuarios')}
                        ${await find('rosterNomina', 'Nómina')}
                        <hr class="divider">
                        ${await find('reportes', 'Reportes')}
                        ${await find('buscar', 'Buscar Empleado')}`);


    const linksPayroll = (`${await find('dashboardPayroll', 'Dashboard')}
                        ${await find('configPayroll', 'Configuración')}
                        <hr class="divider">
                        ${await find('consultarConexion', 'Consultar Conexión')}
                        ${await find('gestionarAjuste', 'Gestionar Ajuste')}`);

    // const linksUGA = (`${await find('ugaRegistrarNovedad', 'Novedades UGA')}`
    // );

    el.viewsAdmin.innerHTML = linksAdmin;
    el.viewsRoster.innerHTML = linksRoster;
    el.viewsPayroll.innerHTML = linksPayroll;
    // el.viewsUGA.innerHTML = linksUGA;
  }
  main();
}

export function validacion() {

  var idrow = setInterval(async function () {

    if (localStorage.getItem('OLwfmUser') && localStorage.getItem('OLwfmPerfil')) {
      let valiUser = await alerts.denc(localStorage.getItem('OLwfmUser'))
      let valiPerfil = await alerts.denc(localStorage.getItem('OLwfmPerfil'))
      var res = await db.validarLs(valiUser, valiPerfil)
      if (res > 0) {
        clearInterval(idrow);
        alerts.security('¡Algo anda mal!');
        setTimeout(() => {
          logout(2)
        }, 2000);

      }
    } else {
      clearInterval(idrow);
      // alerts.security('¡Esto no es normal!');
      setTimeout(() => {
        logout(2)
      }, 2000);
    }


  }, 4000);
}



