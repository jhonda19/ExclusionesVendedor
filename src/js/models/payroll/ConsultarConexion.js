
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

const el = {
    /* lista personal asignado*/
    inFormPayroll: document.querySelector('#inFormPayrollEmpl'),
    inCampBusq: document.querySelector('#inCampBusq'),
    inListEquipoData: document.querySelector('#inListEquipoData'),
    inListEquipo: document.querySelector('#inListEquipo'),
    inListQuincena: document.querySelector('#inListQuincena'),
    btnBuscarEmpl: document.querySelector('#btnBuscarEmpl'),
    infoEmpleado: document.querySelector('#infoEmpleado'),
    resumenPayrollEmpl: document.querySelector('#resumenPayrollEmpl'),
    resPayrollTblEmpleado: $('#tblIncreYbleAdh'),
    infoHisConexion: document.querySelector('#infoHisConexion'),
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
    inFtotalHrsAjuste: document.querySelector('#inFtotalHrsAjuste'),
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

export class gestionPayroll {

    async quincena() {
        const res = await db.ListQuincena();
        const listQ = res.map(e => `<option value = "${e.fecha}">${e.mes} - ${e.quincena}</option>`).join('')
        el.inListQuincena.innerHTML = listQ;
    }

    async personalAsignado() {
        let a = localStorage.getItem("OLwfmId")
        const res = await db.ListpersonalAsignado(a);
        const list = res.map(e => `<option value = ${e.documento}>${e.nombre} - ${e.estado}</option>`).join('')
        el.inListEquipoData.innerHTML = list;
        return res;
    }

    async logActualiacionConexion() {
        let a = await alerts.denc(localStorage.getItem('OLwfmUnidad'))
        // console.log(a)
        const res = await db.logActualiacionConexion(a);
        // console.log(res)
        const html = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
                    <strong class="ml-n1"><i class="fas fa-info-circle text-dark"></i> INFORMACIÓN ${a}:</strong> 
                    <h4 class="mt-2 ml-4"> Ultima actualización: <strong>${res[0].fhCreacion}</strong> </h4>
                    <h4 class="mt-2 ml-4"> Datos de conexión hasta el: <strong> ${res[0].fechaFin}</strong></h4>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>`

        el.infoHisConexion.innerHTML = html
    }

    async consultaCausalesAjuste() {
        const res = await db.consultaCausalesAjusteCx();
        this.causalesDeAjuste(res);
    }

    async causalesDeAjuste(res) {

        //solicitud
        const dc = res
        const solicitud = ap.agrupaObj(dc, 1)
        let html_s = solicitud.map((e) => `<option>${e}</option>`)
        html_s = ap.inicioSelect(html_s)
        el.inTSolicitud.innerHTML = html_s

        // tipo de labor
        el.inTSolicitud.addEventListener('change', async () => {
            let vs = el.inTSolicitud.value
            let labor = dc.filter(e => e.solicitud === vs)
            let laborAg = ap.agrupaObj(labor, 2)
            let html_tl = laborAg.map((e) => `<option>${e}</option>`)
            html_tl = ap.inicioSelect(html_tl)
            el.inTLabor.innerHTML = html_tl;
            el.inTCausal.innerHTML = '';
        })

        // causal
        el.inTLabor.addEventListener('change', async () => {
            let vs = el.inTSolicitud.value
            let vl = el.inTLabor.value
            let causal = dc.filter(e => e.solicitud === vs && e.tipoLabor === vl)
            let html_c = causal.map((e) => `<option value=${e.id}>${e.causal}</option>`)
            html_c = ap.inicioSelect(html_c)
            el.inTCausal.innerHTML = html_c
        })

    }

    async inicioPayroll() {
        /// información sobre boton
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
          })
        //
        this.logActualiacionConexion();
        // campo time con plugin
        ap.timePlugin('inTHoraInicio', '23');
        ap.timePlugin('inTHoraFin', '23');
        ap.timePlugin('inTHDescuentos', '6');

        //inicio
        this.quincena();
        this.consultaCausalesAjuste();
        this.tiempoDeAjuste();
        this.guardarSolicitud();
        el.inFtotalHrsAjuste.style.display = 'none';

        const datos = await this.personalAsignado();
        const EmpleadosList = []
        datos.map(e => EmpleadosList.push(e.documento))
        el.inListEquipo.addEventListener('click', () => {
            el.inListEquipo.value = '';
        })


        // btn buscar doc
        el.btnBuscarEmpl.addEventListener('click', async (e) => {
            let idEmpl = el.inListEquipo.value
            let Q = el.inListQuincena.value
            sessionStorage.setItem('OLWFMidEmplePayroll', idEmpl);
            sessionStorage.setItem('OLWFMQPayroll', Q);
            if (EmpleadosList.find(e => e === idEmpl)) {
                alerts.load();
                this.consultaInfoEmpleado(idEmpl, 0);
                this.consulPayrollEmpl(0);
            } else {
                alerts.confirm("Este empleado no lo tienes asignado").then(async (e) => {
                    if (e.value === true) {
                        alerts.load();
                        this.consultaInfoEmpleado(idEmpl, 0);
                        this.consulPayrollEmpl(0);
                    }
                })
            }
        })
    }

    async consultaInfoEmpleado(idEmpl, a) {
        const res = await db.consultaInfoEmpleado(idEmpl);
        if (a === 0) {
            this.resInfoEmpleado(res);
        } else {
            el.resPayrollTblEmpleado.bootstrapTable('refreshOptions', {
                data: res
            })
        }

    }

    resInfoEmpleado(res) {
        const html = `<div class="col mr-2">
        <div class="mb-0 font-weight-bold  text-dark textCardPayroll">${res[0].nombre} - ${res[0].estado === 'Activo' ? '<span class="text-success h1">Activo</span>' : '<span class="text-danger h1">Retiro</span>'}</div>
        <div class="h5 mb-0 font-weight-bold text-gray-800 mt-1"><span class="text-muted">Lob:&nbsp;</span>${res[0].unidad} - ${res[0].lob}</div>
        <div class="h5 mb-0 font-weight-bold text-gray-800"><span class="text-muted">Cargo:&nbsp;</span>${res[0].cargo}</div>
        <div class="h5 mb-0 font-weight-bold text-gray-800"><span class="text-muted">Tipo Salario:&nbsp;</span>${res[0].claseSalario}</div>
        </div>
        <div class="col-auto">
            <i class="fas fa-user text-gray-300" style="font-size: 50px !important;"></i>
        </div>
        
        `;
        el.infoEmpleado.innerHTML = html;
    }

    async consulPayrollEmpl(a) {
        let idEmpl = sessionStorage.getItem('OLWFMidEmplePayroll')
        let Q = sessionStorage.getItem('OLWFMQPayroll')
        const res = await db.consulPayrollEmpl(idEmpl, Q)
        if (a === 0) {
            this.resResumenPayrollEmpl(res);
            this.resTblEmplPayroll(res);
        } else {
            ap.disableScroll();
            el.resPayrollTblEmpleado.bootstrapTable('refreshOptions', {
                data: res,
                silent: true
            })
            setTimeout(() => {
                ap.enableScroll()
            }, 100);
        }

    }

    resResumenPayrollEmpl(res) {
        let hrsTur = 0
        let hrsOrd = 0
        let hrsDom = 0
        let hrsNoc = 0
        res.map(e => {
            if (parseFloat(e.intesidadTurno) > 0) {
                hrsTur = hrsTur + parseFloat(e.intesidadTurno)
            }

            if (parseFloat(e.hrsOrdinarias_f) > 0) {
                hrsOrd = hrsOrd + parseFloat(e.hrsOrdinarias_f)
            }
            if (parseFloat(e.hrsDominicales_f) > 0) {
                hrsDom = hrsDom + parseFloat(e.hrsDominicales_f)
            }
            if (parseFloat(e.hrsNocturnas_f) > 0) {
                hrsNoc = hrsNoc + parseFloat(e.hrsNocturnas_f)
            }

        })
        const info = `<div class="col-xl-2 ml-3 mr-3 col-md-6 mb-4">
                    <div class="card border-left-warning  h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Hrs Turno</div>
                                    <div class="h4 mb-0 font-weight-bold text-gray-800">${hrsTur.toFixed(2)}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-clock fa-2x text-gray-300 h1"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-2 ml-3 mr-3 col-md-6 mb-4">
                    <div class="card border-left-primary  h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Hrs Ordinarias</div>
                                    <div class="h4 mb-0 font-weight-bold text-gray-800">${hrsOrd.toFixed(2)}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-sun fa-2x text-gray-300 h1"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-2 ml-3 mr-3 col-md-6 mb-4">
                    <div class="card border-left-success  h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Hrs Dominicales</div>
                                    <div class="h4 mb-0 font-weight-bold text-gray-800">${hrsDom.toFixed(2)}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-calendar fa-2x text-gray-300 h1"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-2 ml-3 mr-3 col-md-6 mb-4">
                    <div class="card border-left-dark  h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">Hrs Nocturnas</div>
                                    <div class="h4 mb-0 font-weight-bold text-gray-800">${hrsNoc.toFixed(2)}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-moon fa-2x text-gray-300 h1"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`

        el.resumenPayrollEmpl.innerHTML = info;
    }

    resTblEmplPayroll(res) {
        window.operateEvents = {
            'click .edit': (e, value, row, index) => {
                var datos = row
                el.infoModaldía.innerHTML = `<div class="spinner-border spinner-border-sm text-muted mb-5" role="status"></div>`
                this.inicioModal(datos);
                this.datosModalDíaSelect(datos);
                this.consultaCxDia(datos.idEmpl, datos.fecha)
            }
        }

        el.resPayrollTblEmpleado.bootstrapTable("destroy").bootstrapTable({
            data: res,
            pagination: false,
            search: false,
            showFullscreen: false,
            columns: [{
                field: 'fecha2',
                title: 'fecha',
                align: 'center',
                width: '70px',
            }, 
            {
                field: 'diasemana3',
                title: 'día',
                align: 'center',
                width: '30px',
            }, {
                field: 'hiTurno',
                title: 'Hi Turno',
                align: 'center',
                width: '80px',
            }, {
                field: 'hfTurno',
                title: 'Hf Turno',
                align: 'center',
                width: '80px',
            }, {
                field: 'intesidadTurno',
                title: 'Hrs Turno',
                align: 'center',
                width: '100px',
                cellStyle: (value, row, index) => {
                    return {
                        css: {
                            // color: '',
                            background: '#e3f2fd',
                        }
                    }
                },
            }, {
                field: 'hiConexion',
                title: 'Hi Real',
                align: 'center',
                width: '80px',
            }, {
                field: 'hfConexion',
                title: 'Hf Real',
                align: 'center',
                width: '80px',
            }, {
                field: 'totalConexion',
                title: 'Hrs Conexión',
                align: 'center',
                width: '80px',
             
            }, {
                field: 'intensidad_AA',
                title: 'Hrs Ajuste',
                align: 'center',
                width: '80px',
                formatter: (value, row, index) => { return  row.intensidad_AA < 0 ? '<span class="textNormal text-danger">' + row.intensidad_AA + '</span>' :
                                                                row.intensidad_AA > 0 ? '<span class="textNormal text-success">' + row.intensidad_AA + '</span>' : null
                                            }
            },{
                field: 'totalConexion_f',
                title: 'Total Hrs',
                align: 'center',
                width: '100px',
                cellStyle: (value, row, index) => {
                    return {
                        css: {
                            // color: 'red',
                            background: '#fff9c4'
                        }
                    }
                },
            }, {
                field: 'hrsNocturnas_f',
                title: 'Total Hrs Noc.',
                align: 'center',
                width: '100px',
                cellStyle: (value, row, index) => {
                    return {
                        css: {
                            background: '#fff3e0'
                        }
                    }
                },
            },
            
            
            
            {
                field: 'novedadUga',
                title: 'Novedad',
                align: 'center',
                width: '50px',
                formatter: (value, row, index) => { return  row.grupoNovedad == 'INCAP' ? '<span class="badge  badge-incap textNormal" title="'+row.tipoNovedadHomologado +'">' + row.novedadUga + '</span>' :
                                                            row.grupoNovedad == 'LICEN' ? '<span class="badge  badge-licen textNormal" title="'+row.tipoNovedadHomologado +'">' + row.novedadUga + '</span>' :
                                                            row.grupoNovedad == 'VACAC' ? '<span class="badge  badge-vacac textNormal" title="'+row.tipoNovedadHomologado +'">' + row.novedadUga + '</span>' : '-'
                                            }
                
            }, {
                field: 'estadoAjuste',
                title: 'Ajuste',
                align: 'center',
                width: '50px',
                formatter: (value, row, index) => { 
                        return  row.estadoAjuste == 1 ? '<span class="badge  badge-warning textNormal" title="Pendiente">P</span>' :
                                                            row.estadoAjuste == 2 ? '<span class="badge  badge-success textNormal" title="Aprobado">A</span>' :
                                                            row.estadoAjuste == 3 ? '<span class="badge  badge-danger textNormal" title="Rechazado">R</span>' : '-'
                }
                
               
            }, {
                title: 'Edit',
                align: 'center',
                width: '50px',
                events: window.operateEvents,
                formatter: (value, row, index) => { return row.estadoAjuste == 1 || row.novedadUga != null ? '-' : '<a id="btnNegocio" type="button" class="edit"><i class="fas fa-edit text-dark"></i></a>' }
            }
            ]
        })
        alerts.close();
    }

    async inicioModal(datos) {
        const j = await alerts.denc(localStorage.getItem('OLwfmJerarquia'))
        const u = await alerts.denc(localStorage.getItem('OLwfmUnidad'))
        if (datos.idEmpl === localStorage.getItem('OLwfmId')) {
            alerts.error('Los ajustes deben ser solicitados por el jefe inmediato')
        } else {
            if (datos.unidad === u) {
                if (datos.jerarquia < j) {
                    this.datosModal(datos);
                    $('#staticBackdrop').modal('show');
                } else {
                    alerts.error('No está autorizado')
                }
            } else {
                alerts.error('Esta persona hace parte de otra unidad de negocio')
            }
        }
    }

    datosModal(datos) {
        el.formModalAjuste.reset();
        let data = ap.sumarFecha(datos.fecha, 3)
        let data2 = ap.validaFechaIugalMayorHoy(data)
        el.inNIdEmple.value = datos.idEmpl
        // console.log(datos.idEmpl)

        // idempleados



        // Fecha Inicio
        el.inDFechaInicio.min = datos.fecha;
        el.inDFechaInicio.max = datos.fecha;
        el.inDFechaInicio.value = datos.fecha;
        el.inDFechaInicio.disabled = true;
        el.inDFechaInicio.onkeydown = 'return false';

        // fecha Fin
        el.inDFechaFin.min = datos.fecha;
        el.inDFechaFin.max = data2;
        el.inDFechaFin.value = datos.fecha;
        el.inDFechaFin.disabled = true;
        el.inDFechaFin.onkeydown = 'return false';
    }

    tiempoDeAjuste() {
        var timediff = require('timediff');
        let di, i, df, f, d

        var id = setInterval(() => {
            el.inFtotalHrsAjuste.style.display = 'none';
            el.inNIdEmple.style.display = 'none';
            di = el.inDFechaInicio.value
            i = el.inTHoraInicio.value
            df = el.inDFechaFin.value
            f = el.inTHoraFin.value
            d = el.inTHDescuentos.value
            if (di === '' || df === '') {
            } else {
                try {
                    let res = timediff(di + ' ' + i, df + ' ' + f, 'Hm')
                    let des = timediff('2020-11-01 00:00:00', '2020-11-01 ' + d, 'Hm')
                    let v = Math.round(parseFloat((res.hours + (res.minutes / 60)) - (des.hours + (des.minutes / 60)), 2) * 100) / 100
                    if (v < 0) {
                        el.inFtotalHrsAjuste.value = '';
                        el.infoHTotalTiempo.innerHTML = `<h1 class="text-center text-white rounded p-3 bg-danger">Revise los datos ingresados</h1>`;
                    } else {
                        el.inFtotalHrsAjuste.value = v
                        el.infoHTotalTiempo.innerHTML = `<h1 class="text-center text-white rounded p-3 ${v < 0 ? 'bg-danger' : v === 0 ? 'bg-warning' : v > 0 ? 'bg-success' : ''}" >Total horas de ajuste: ${v}</h1>`;
                    }
                }
                catch (err) {
                    el.infoHTotalTiempo.innerHTML = `<h1 class="text-center text-white rounded p-3 bg-danger">Revise los datos ingresados</h1>`;
                    el.inFtotalHrsAjuste.value = ''
                }

            }
        }, 500);
    }

    datosModalDíaSelect(datos) {
        const html = `<table class="table table-sm text-center mb-5 table-bordered">
                        <thead class="text-center bg-dark text-white">
                            <tr>
                                <td width="15%">Fecha</td>
                                <td width="28%">Hrs Ordinarias</td>
                                <td width="28%">Hrs Dominicales</td>
                                <td width="28%">Hrs Nocturnas</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${datos.fecha === null ? '-' : datos.fecha2}</td>
                                <td>${datos.hrsOrdinarias === null ? '-' : datos.hrsOrdinarias_f}</td>
                                <td>${datos.hrsDominicales === null ? '-' : datos.hrsDominicales_f}</td>
                                <td>${datos.hrsNocturnas === null ? '-' : datos.hrsNocturnas_f}</td>
                            </tr>
                        </tbody>
                    </table>`
        el.infoModaldía.innerHTML = html;

    }

    async consultaCxDia(i, f) {
        el.infoModaldíaDetallado.innerHTML = `<div class="spinner-border spinner-border-sm text-muted mb-5" role="status"></div>`
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

    async guardarSolicitud() {
        el.btnGuardarModalAjuste.addEventListener('click', async () => {
            if (ap.formCompleto('formModalAjuste', inputs) === 1) {
                let r = await this.validaHA()
                if (r === '1') {
                    let data = new FormData();
                    for (let index = 0; index < document.forms["formModalAjuste"].length; index++) {
                        data.append('GS_' + document.forms["formModalAjuste"].elements[index].id, document.forms["formModalAjuste"].elements[index].value);
                    };
                    let ua = await alerts.userActivo();
                    data.append('GS_userActivo', ua)
                    const res = await db.GSAjuste(data);
                    if (res[0].res === 'ok') {
                        alerts.save()
                        this.consulPayrollEmpl(1)
                        $('#staticBackdrop').modal('hide');
                    } else {
                        alerts.errorSave();
                    }
                } else {
                    alerts.error('El tiempo de ajustes ha finalizado')
                }
            } else {
                alerts.error('Valide los datos del formulario!')
            }
        })
    }

    async validaHA() {
        alerts.load()
        const fi = el.inDFechaInicio.value
        const u = await alerts.denc(localStorage.getItem('OLwfmUnidad'))
        const res = await db.validaHA(u, fi)
        return res[0].res
    }

}