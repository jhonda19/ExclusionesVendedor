'use strict';
// Modulos js Roster
import { configuraciones,UnidNegocio,UnidSplit } from './models/roster/configRoster';
import { dashboardRoster } from './models/roster/dashboardRoster';
import { empleados } from './models/roster/Empleados';
import { rosterNomina } from './models/roster/RosterNomina';
import { usuariosLogin } from './models/roster/UsuariosLogin';
import { reportes } from './models/roster/reportes';
import { busquedaEmpl } from './models/roster/buscar';
import { adminSociodemografico } from './models/roster/Sociodemografico';

// JS File page validation
let page = window.location.href.split('/');
page = page[page.length - 1];

 if (page === 'configRoster') {
    const c = new configuraciones();
    c.inicioConfg();

    const un = new UnidNegocio();
    un.inicio();

    const us = new UnidSplit();
    us.inicioSplit();
} else if (page === 'dashboardRoster') {
    const i = new dashboardRoster();
    i.statusRoster();
} else if (page === 'empleados') {
    const pa = new empleados();
    pa.TmpEmpleado();
} else if (page === 'rosterNomina') {
    const rn = new rosterNomina();
    rn.cargaRosterNomina();
    const i = new rosterNomina();
    i.inicio();
} else if (page === 'usuarios') {
    const ul = new usuariosLogin();
    ul.cargaUsuariosLogin();
} else if (page === 'reportes') {
    const ul = new reportes();
    ul.inicioReportes();
} else if (page === 'buscar') {
    const bus = new busquedaEmpl();
    bus.inicioBusquda();
} else if (page === 'sociodemografico') {
    const bus = new adminSociodemografico();
    bus.inicioSociodemografico();
}
