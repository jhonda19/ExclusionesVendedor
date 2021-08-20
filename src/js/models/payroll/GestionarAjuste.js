import jquery from 'jquery';
window.$ = window.jQuery = jquery;
import { Database } from '../db/dbPayroll';
import * as alerts from '../app/Alerts.js';
import { AppController } from '../app/App.js';
import 'jquery-timepicker/jquery.timepicker.js';
import 'jquery-timepicker/jquery.timepicker.css';
import * as NProgress from 'nprogress/nprogress.js';
NProgress.configure({ showSpinner: false });
require('bootstrap-table');
const db = new Database();
const ap = new AppController();

const el = {
    tblGestionAjustes: $('#tblGestionAjustes'),


    /* inputs */
    formModalAjuste: document.querySelector('#formModalAjuste'),
    inTSolicitud: document.querySelector('#inTSolicitud'),
    inTLabor: document.querySelector('#inTLabor'),
    inTCausal: document.querySelector('#inTCausal'),

    infoModaldía: document.querySelector('#infoModaldía'),
    infoModaldíaDetallado: document.querySelector('#infoModaldíaDetallado'),
    infoModalAjuste: document.querySelector('#infoModalAjuste'),
    inNIdEmple: document.querySelector('#inNIdEmple'),
    inDFechaInicio: document.querySelector('#inDFechaInicio'),
    inDFechaFin: document.querySelector('#inDFechaFin'),

    inTHoraInicio: document.querySelector('#inTHoraInicio'),
    inTHoraFin: document.querySelector('#inTHoraFin'),
    inTHDescuentos: document.querySelector('#inTHDescuentos'),
    // inFtotalHrsAjuste: document.querySelector('#inFtotalHrsAjuste'),
    inTObservaciones: document.querySelector('#inTObservaciones'),

    infoHTotalTiempo: document.querySelector('#infoHTotalTiempo'),
    btnCancelarModalAjuste: document.querySelector('#btnCancelarModalAjuste'),
    btnGuardarModalAjuste: document.querySelector('#btnGuardarModalAjuste'),
}

const inputs = ['inNIdEmple',
    'inTSolicitud',
    'inTLabor',
    'inTCausal',
    'inDFechaInicio',
    'inDFechaFin',
    'inTHoraInicio',
    'inTHoraFin',
    'inTHDescuentos',
    'inFtotalHrsAjuste',
    'inTObservaciones']
var idCaso = 0, fechaAjuste = '', inFtotalHrsAjuste = ''
export class gestionAjustePayroll {

    async inicioGestionAjuste() {
        this.consultaAjustePendientexUnidad(0)

        // campo time con plugin
        ap.timePlugin('inTHoraInicio', '23');
        ap.timePlugin('inTHoraFin', '23');
        ap.timePlugin('inTHDescuentos', '6');

        this.tiempoDeAjuste();

        this.guardarSolicitud();
    }

    async consultaAjustePendientexUnidad(a) {
        NProgress.start()
        const u = await alerts.denc(localStorage.getItem('OLwfmUnidad'))
        const p = await alerts.denc(localStorage.getItem('OLwfmPosicion'))
        // console.log(p,j)
        const res = await db.consultaAjustesPendientes(u, p);
        console.log(res)
        if (a === 0) {
            this.resTblGestionAjustes(res);
            NProgress.done()
        } else {
            el.tblGestionAjustes.bootstrapTable('refreshOptions', {
                data: res
            })
            NProgress.done()
        }

    }

    resTblGestionAjustes(res) {
        window.operateEvents = {
            'click .edit': (e, value, row, index) => {
                var datos = row
                fechaAjuste = datos.fecha
                this.inicioModal(datos);
                // this.datosModalDíaSelect(datos);
                this.consultaCxDia(datos.idEmpl, datos.fecha)
            }
        }

        el.tblGestionAjustes.bootstrapTable("destroy").bootstrapTable({
            data: res,
            pagination: true,
            search: true,
            showFullscreen: false,
            columns: [{
                field: 'id',
                title: '#',
                align: 'center',
                width: '40px',
            },
            {
                field: 'fechaCreacion_front',
                title: 'Fecha Creación',
                align: 'center',
                width: '40px',
            }, {
                field: 'horaCreacion_front',
                title: 'Hora Creación',
                align: 'center',
                width: '40px',
            }, {
                field: 'userApp',
                title: 'Usuario',
                align: 'center',
                width: '120px',
            }, {
                field: 'unidad',
                title: 'Unidad',
                align: 'center',
                width: '150px',
                cellStyle: (value, row, index) => {
                    return {
                        css: {
                            // color: '',
                            background: '#e3f2fd',
                        }
                    }
                },
            }, {
                field: 'solicitud',
                title: 'Solicitud',
                align: 'center',
            }, {
                field: 'tipoLabor',
                title: 'Tipo de Labor',
                align: 'center',
            }, {
                field: 'causal',
                title: 'Causa',
                align: 'center',

            }, {
                field: 'hrsOrdinarias',
                title: 'Hrs Ord.',
                align: 'center',
                width: '80px',
                cellStyle: (value, row, index) => {
                    return {
                        css: {
                            // color: 'red',
                            background: '#fff9c4'
                        }
                    }
                },

            }, {
                field: 'hrsDominicales',
                title: 'Hrs Dom.',
                align: 'center',
                width: '80px',
                cellStyle: (value, row, index) => {
                    return {
                        css: {
                            // color: 'red',
                            background: '#fff9c4'
                        }
                    }
                },
            }, {
                field: 'hrsNocturnas',
                title: 'Hrs Noc.',
                align: 'center',
                width: '80px',
                cellStyle: (value, row, index) => {
                    return {
                        css: {
                            background: '#fff3e0'
                        }
                    }
                },
            }, {
                title: 'Gestionar',
                align: 'center',
                width: '50px',
                events: window.operateEvents,
                formatter: (value, row, index) => { return '<a id="btnNegocio" type="button" class="edit"><i class="fas fa-edit text-dark"></i></a>' }
            }
            ]
        })
        alerts.close();
    }

    async inicioModal(datos) {
        // el.infoModaldía.innerHTML = `<div class="spinner-border spinner-border-sm text-muted mb-5" role="status"></div>`
        el.inTSolicitud.disabled = true
        el.inTLabor.disabled = true
        el.inTCausal.disabled = true

        el.inTSolicitud.value = datos.solicitud
        el.inTLabor.value = datos.tipoLabor
        el.inTCausal.value = datos.causal

        el.inTHoraInicio.value = datos.ingresoReal_front
        el.inTHoraFin.value = datos.salidaReal_front
        el.inTHDescuentos.value = datos.tiempoNoPago_front

        $('#modalGestionarAjuste').modal('show');
        console.log(datos)
    }

    async consultaCxDia(i, f) {
        // el.infoModaldíaDetallado.innerHTML = `<div class="spinner-border spinner-border-sm text-muted mb-5" role="status"></div>`
        const res = await db.consultaCxDia(i, f);
        const data = res.map((e) => `<tr>
                                        <td>${e.ingresoreal === null ? '-' : e.ingresoreal}</td>
                                        <td>${e.salidareal === null ? '-' : e.salidareal}</td>
                                        <td>${e.intensidadutil === null ? '-' : e.intensidadutil}</td>
                                    </tr>`).join('');

        const html = `<table class="table table-sm text-center mb-5 table-bordered">
                    <thead class="text-center bg-secondary text-white">
                        <tr>
                            <td width="40%">Fecha y Hora de Inicio</td>
                            <td width="40%">Fecha y Hora de Fin</td>
                            <td width="20%">Hrs de Conexión</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${data}
                    </tbody>
                </table>`
        el.infoModaldíaDetallado.innerHTML = html;

    }

    tiempoDeAjuste() {
        var timediff = require('timediff');
        let di, i, df, f, d

        var id = setInterval(() => {
            el.inNIdEmple.style.display = 'none';
            di = fechaAjuste
            i = el.inTHoraInicio.value
            df = fechaAjuste
            f = el.inTHoraFin.value
            d = el.inTHDescuentos.value
            if (di === '' || df === '') {
            } else {
                try {
                    let res = timediff(di + ' ' + i, df + ' ' + f, 'Hm')
                    let des = timediff('2020-11-01 00:00:00', '2020-11-01 ' + d, 'Hm')
                    let v = Math.round(parseFloat((res.hours + (res.minutes / 60)) - (des.hours + (des.minutes / 60)), 2) * 100) / 100
                    if (v < 0) {
                        inFtotalHrsAjuste = '';
                        el.infoHTotalTiempo.innerHTML = `<h1 class="text-center text-white rounded p-3 bg-danger">Revise los datos ingresados</h1>`;
                    } else {
                        inFtotalHrsAjuste = v
                        el.infoHTotalTiempo.innerHTML = `<h1 class="text-center text-white rounded p-3 ${v < 0 ? 'bg-danger' : v === 0 ? 'bg-warning' : v > 0 ? 'bg-success' : ''}" >Total horas de ajuste: ${v}</h1>`;
                    }
                }
                catch (err) {
                    el.infoHTotalTiempo.innerHTML = `<h1 class="text-center text-white rounded p-3 bg-danger">Revise los datos ingresados</h1>`;
                    inFtotalHrsAjuste = ''
                }

            }
        }, 500);
    }


    async guardarSolicitud() {
        el.btnGuardarModalAjuste.addEventListener('click', async () => {
            console.log(inFtotalHrsAjuste)
            // if (ap.formCompleto('formModalAjuste', inputs) === 1) {
            //     let r = await this.validaHA()
            //     if (r === '1') {
            //         let data = new FormData();
            //         for (let index = 0; index < document.forms["formModalAjuste"].length; index++) {
            //             data.append('GS_' + document.forms["formModalAjuste"].elements[index].id, document.forms["formModalAjuste"].elements[index].value);
            //         };
            //         let ua = await alerts.userActivo();
            //         data.append('GS_userActivo', ua)
            //         const res = await db.GSAjuste(data);
            //         if (res[0].res === 'ok') {
            //             alerts.save()
            //             this.consulPayrollEmpl(1)
            //             $('#staticBackdrop').modal('hide');
            //         } else {
            //             alerts.errorSave();
            //         }
            //     } else {
            //         alerts.error('El tiempo de ajustes ha finalizado')
            //     }
            // } else {
            //     alerts.error('Valide los datos del formulario!')
            // }
        })
    }

}