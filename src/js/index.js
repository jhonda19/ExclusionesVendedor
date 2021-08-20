'use strict';
// Global app controller
import jquery from 'jquery';
window.$ = window.jQuery = jquery;
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-table/dist/bootstrap-table.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.js';
import 'bootstrap-table/dist/extensions/filter-control/bootstrap-table-filter-control.min.js';
import './models/app/jquery.easing.min.js'
import 'animate.css/animate.min.css';
import 'nprogress/nprogress.css';
// import 'bootstrap-toggle/css/bootstrap-toggle.min.css'


// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';

// Modulos js App
import { inicioApp } from './models/app/inicio.js';
import { Login } from './models/app/Login.js';
import { userApp } from './models/app/usuarioApp';
import * as main from './models/app/Header.js';
// import * as alerts from './models/app/Alerts.js';

// JS File page validation
let page = window.location.href.split('/');
page = page[page.length - 1];

if (page === 'inicio' || page === '') {

    const i = new inicioApp();
    i.home();
} else if (page === 'login') {
    const l = new Login();
    l.validaForm();
    const r = new Login();
    r.formRestore();
} else if (page === 'usuarioApp') {
    const ua = new userApp();
    ua.validateId();
}

/*Header*/
main.headerNew();
if (page != 'login') {
    main.elementsMain();
    main.userActivo();
    main.logout(1);
    main.validacion();

    function accordion() {
        const el = {
            sidebarToggle: document.querySelector('#sidebarToggle'),
            accordionSidebar: document.querySelector('#accordionSidebar'),
        }

        el.sidebarToggle.addEventListener('click', () => {
            let c = el.accordionSidebar.classList
            if (c[5] === 'toggled') {
                sessionStorage.setItem('toggledHeaderOLWFM', 'toggled');
            } else {
                sessionStorage.removeItem('toggledHeaderOLWFM');
            }
        })
        if (sessionStorage.getItem("toggledHeaderOLWFM") != null) {
            el.accordionSidebar.classList.add('toggled');
        }

    }  accordion()



}




/* Enter */

// window.addEventListener("keypress", function(event){
//     if (event.keyCode == 13){
//         event.preventDefault();
//     }
// }, false);

