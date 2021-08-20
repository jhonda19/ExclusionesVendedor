import jquery from 'jquery';
window.$ = window.jQuery = jquery;
import { Database } from '../db/dbPayroll';
import * as alerts from '../app/Alerts.js';
import { AppController } from '../app/App.js';
import 'jquery-timepicker/jquery.timepicker.js';
import 'jquery-timepicker/jquery.timepicker.css';
require('bootstrap-table');
const db = new Database();
const ap = new AppController();
var moment = require('moment');

const el = {
    tblHabilitadorAjustes: $('#tblHabilitadorAjustes'),
    modalFormHabilitadorAjuste: document.querySelector('#modalFormHabilitadorAjuste'),

    inTUnidadHA: document.querySelector('#inTUnidadHA'),
    inTMesHA: document.querySelector('#inTMesHA'),
    inTCorteHA: document.querySelector('#inTCorteHA'),
    inTfhInicioHA: document.querySelector('#inTfhInicioHA'),
    inTFhfinHA: document.querySelector('#inTFhfinHA'),
    btnCancelarModalHA: document.querySelector('#btnCancelarModalHA'),
    btnGuardarModalHA: document.querySelector('#btnGuardarModalHA'),
}

const inputs = ['inTUnidadHA'
    , 'inTMesHA'
    , 'inTCorteHA'
    , 'inTfhInicioHA'
    , 'inTFhfinHA']


export class configuracionPayroll {

    async inicioConfigPayroll() {
        this.habilitadorAjusActual(1);
        this.guardarSolicitudHA();
    }

    async habilitadorAjusActual(a) {
        const u = await alerts.denc(localStorage.getItem('OLwfmUnidad'))
        const res = await db.consHabilitadorAjusActual(u);
        if (a === 1) {
            this.resTblHabilitadorAjusteActual(res);
        } else {
            el.tblHabilitadorAjustes.bootstrapTable('refreshOptions', {
                data: res
            })
        }
        
    }

    resTblHabilitadorAjusteActual(res) {
        window.operateEvents = {
            'click .edit': (e, value, row, index) => {
                var datos = row
                this.datosModalHA(datos)
            }
        }

        el.tblHabilitadorAjustes.bootstrapTable("destroy").bootstrapTable({
            data: res,
            pagination: true,
            search: true,
            showFullscreen: false,
            columns: [{
                field: 'id',
                title: 'id',
                align: 'center',
            }, {
                field: 'unidad',
                title: 'Unidad',
                align: 'center',
            }, {
                field: 'mes',
                title: 'Mes',
                align: 'center',
            }, {
                field: 'corte',
                title: 'Corte',
                align: 'center',
                cellStyle: (value, row, index) => {
                    return {
                        css: {
                            // color: '',
                            background: '#E0FFFF',
                        }
                    }
                },
            }, {
                field: 'fhiAjustes',
                title: 'Fecha Hora Inicio',
                align: 'center',
            }, {
                field: 'fhfCorteAjustes',
                title: 'Fecha Hora Fin',
                align: 'center',
            }, {
                title: 'Edit',
                align: 'center',
                events: window.operateEvents,
                formatter: (value, row, index) => { return '<a id="btnNegocio" type="button" class="edit"><i class="fas fa-edit text-dark"></i></a>' }
            }
            ]
        })
        alerts.close();
    }

    datosModalHA(datos) {
        el.modalFormHabilitadorAjuste.reset();
        el.inTUnidadHA.value = datos.unidad
        el.inTMesHA.value = datos.mes
        el.inTCorteHA.value = datos.corte
        // el.inTfhInicioHA.value =  moment(datos.fhfCorteAjustes).format('DD-MM-YYYY HH:mm') 
        // el.inTFhfinHA.value =  moment(datos.fhiAjustes).format('DD-MM-YYYY HH:mm') 
        $('#ModalHabiitadorAjuste').modal('show');
    }

    async guardarSolicitudHA() {
        el.btnGuardarModalHA.addEventListener('click', async () => {
            alerts.load();
            if (ap.formCompleto('modalFormHabilitadorAjuste', inputs) === 1) {
                let u = el.inTUnidadHA.value
                let c = inTCorteHA.value;
                let m = inTMesHA.value;
                let fi = el.inTfhInicioHA.value;
                let ff = el.inTFhfinHA.value;
                let a = ap.DateBeforeMoment(fi, ff)
                if (a === true) {
                    const ua = await alerts.userActivo();
                    if (ua === false) {
                        alerts.errorReload('Tu sesión ha expirado!')
                    } else {
                        const res = await db.guardarDatosHA(u, m, c, moment(fi).format('YYYY-MM-DD HH:mm:ss'), moment(ff).format('YYYY-MM-DD HH:mm:ss'), ua)
                        if (res[0].res === 'ok') {
                            alerts.save();
                            this.habilitadorAjusActual(2);
                            $('#ModalHabiitadorAjuste').modal('hide');
                        } else {
                            alerts.errorSave();
                            $('#ModalHabiitadorAjuste').modal('hide');
                        }
                    }
                } else {
                    alerts.error('Fechas y horas incorrectas!')
                }
            } else {
                alerts.error('Valide los datos del formulario!')
            }

        })

    }


}