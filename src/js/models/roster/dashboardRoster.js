import { Database } from '../db/Database';
import { reportes } from './reportes';
import * as alerts from '../app/Alerts.js';
const XLSX = require('xlsx');
// require('bootstrap-table');
const el = {
    tblEmpleados: $('#tblPlantillaEmpleado'),
    formHomeDash: document.getElementById('formHomeDash'),
    contentCard1RosterHome: document.getElementById('contentCard1RosterHome'),
    contentCard2RosterHome: document.getElementById('contentCard2RosterHome'),
    contentCard3RosterHome: document.getElementById('contentCard3RosterHome'),
    datosResumenGeneral: document.getElementById('datosResumenGeneral'),
    datosModeloTrabajo: document.getElementById('datosModeloTrabajo'),
    inputUnidades: document.querySelector('#inputUnidades'),
    inputMeses: document.querySelector('#inputMeses'),
    btnDescargarHome: document.querySelector('#btnDescargarHome'),
}

const db = new Database();
const rpt = new reportes();
export class dashboardRoster {

    statusRoster() {
        rpt.Meses();
        this.loadCard();
        rpt.unidades();
        this.datosTarjetas('0', '');
        this.datosresumengen('0', '');
        this.datosmodelotrabajo('0', '');
        el.btnDescargarHome.addEventListener('click', () => {
            var u = inputUnidades.value
            var m = inputMeses.value
            this.rpteHomeCuentaMes(u, m);
        })

        el.formHomeDash.addEventListener('change', () => {
            var u = inputUnidades.value
            var m = inputMeses.value
            alerts.load();
            this.datosTarjetas(u, m);
            this.datosresumengen(u, m);
            this.datosmodelotrabajo(u, m);
        })
    }
    async rpteHomeCuentaMes(u, m) {
        alerts.load();
        const res = await db.rpteHomeCuentaMes(u, m);
        var headers = ['idEmplMovil'
            , 'idEmpl'
            , 'vhur'
            , 'idMylink'
            , 'documento'
            , 'nombre'
            , 'sexo'
            , 'ultIngresoOp'
            , 'estado'
            , 'fechaContrato'
            , 'fechaRetiro'
            , 'motivoRetiro'
            , 'contratadoReal'
            , 'tel'
            , 'dir'
            , 'barrio'
            , 'localidad'
            , 'idCargo'
            , 'cargo'
            , 'posicion'
            , 'tipoArea'
            , 'idCargoEjecutado'
            , 'cargoEjecutado'
            , 'posicionEjecutado'
            , 'tipoAreaEjecutado'
            , 'idCuenta'
            , 'unidad'
            , 'subunidad'
            , 'lob'
            , 'servicio'
            , 'splitDefault'
            , 'idSite'
            , 'site'
            , 'piso'
            , 'split'
            , 'claseSalario'
            , 'documentoJefe'
            , 'nombreJefe'
            , 'modeloTrabajo'
            , 'userApp'
            , 'fhUpdate'];
        var data = [];
        data.push(headers);
        res.map(e => data.push([e.idEmplMovil
            , e.idEmpl
            , e.vhur
            , e.idMylink
            , e.documento
            , e.nombre
            , e.sexo
            , e.ultIngresoOp
            , e.estado
            , e.fechaContrato
            , e.fechaRetiro
            , e.motivoRetiro
            , e.contratadoReal
            , e.tel
            , e.dir
            , e.barrio
            , e.localidad
            , e.idCargo
            , e.cargo
            , e.posicion
            , e.tipoArea
            , e.idCargoEjecutado
            , e.cargoEjecutado
            , e.posicionEjecutado
            , e.tipoAreaEjecutado
            , e.idCuenta
            , e.unidad
            , e.subunidad
            , e.lob
            , e.servicio
            , e.splitDefault
            , e.idSite
            , e.site
            , e.piso
            , e.split
            , e.claseSalario
            , e.documentoJefe
            , e.nombreJefe
            , e.modeloTrabajo
            , e.userApp
            , e.fhUpdate
        ]))
        var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
        XLSX.utils.book_append_sheet(wb, ws, 'reporteHome');
        XLSX.writeFile(wb, 'reporteHome_cuentaxMes.xlsx');
        alerts.close();
    }
  
    loadCard() {
        const html = `<div class="spinner-border spinner-border-sm text-muted" role="status"></div>&nbsp;cargando...`
        el.contentCard1RosterHome.innerHTML = html;
        el.contentCard2RosterHome.innerHTML = html;
        el.contentCard3RosterHome.innerHTML = html;
        el.datosResumenGeneral.innerHTML = html;
        el.datosModeloTrabajo.innerHTML = html;
    }

    async datosTarjetas(u, m) {
        const res = await db.dashboardHome1(u, m);
        let actS = 0, actA = 0, retS = 0, retA = 0
        res.forEach(x => {
            if (x.estado === 'Activo' && x.tipoArea === 'STAFF') {
                actS = actS + parseInt(x.Cantidad)
            } else if (x.estado === 'Activo' && x.tipoArea === 'AGENTES') { actA = actA + parseInt(x.Cantidad) }

            if (x.estado === 'Retiro' && x.tipoArea === 'STAFF') {
                retS = retS + parseInt(x.Cantidad)
            } else if (x.estado === 'Retiro' && x.tipoArea === 'AGENTES') { retA = retA + parseInt(x.Cantidad) }

        })

        var total = `<div class="col mr-2">
                <div class="font-weight-bold text-primary ml-n3 h5">Total Personal</div>
                <div class="mb-0 font-weight-bold textCardRsoter text-dark">${actS + actA + retS + retA}</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800"><span class="text-muted">Agentes:&nbsp;</span>${actA + retA}</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800"><span class="text-muted">Staff:&nbsp;</span>${actS + retS}</div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-users text-gray-300" style="font-size: 50px !important;"></i>
                </div>`
        var acti = `<div class="col mr-2">
                <div class="font-weight-bold text-success ml-n3 h5">Personal Activo</div>
                <div class="mb-0 font-weight-bold textCardRsoter text-dark">${actS + actA}</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800"><span class="text-muted">Agentes:&nbsp;</span> ${actA}</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800"><span class="text-muted">Staff:&nbsp;</span> ${actS}</div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-user-plus text-gray-300" style="font-size: 50px !important;"></i>
                </div>`

        var reti = `<div class="col mr-2">
                <div class="font-weight-bold text-danger ml-n3 h5">Personal Retirado</div>
                <div class="mb-0 font-weight-bold textCardRsoter text-dark">${retS + retA}</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800"><span class="text-muted">Agentes:&nbsp;</span>${retA}</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800"><span class="text-muted">Staff:&nbsp;</span> ${retS}</div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-user-times text-gray-300" style="font-size: 50px !important;"></i>
                </div>`
        el.contentCard1RosterHome.innerHTML = total
        el.contentCard2RosterHome.innerHTML = acti
        el.contentCard3RosterHome.innerHTML = reti

    }

    async datosresumengen(u, m) {
        const res = await db.dashboardHome2(u, m);

        let datohtml = res.map(e => `<tr>
                                        <th scope="row">${e.unidad}</th>
                                        <td class="text-center">${e.AgentesAct}</td>
                                        <td class="text-center">${e.StaffAct}</td>
                                        <td class="text-center">${e.AgentesRet}</td>
                                        <td class="text-center">${e.StaffRet}</td>
                                        </tr>`).join('')

        let table = `<table class="table table-sm table-bordered">
                    <thead class="text-center align-middle">
                        <tr class="bg-secondary text-dark">
                            <th rowspan="2" scope="col" class="align-middle">Subunidad</th>
                            <th colspan="2" scope="col">Activo</th>
                            <th colspan="2" scope="col">Retiro</th>
                        </tr>
                        <tr class="bg-secondary2 text-dark">
                            <th scope="col">Agentes</th>
                            <th scope="col">Staff</th>
                            <th scope="col">Agentes</th>
                            <th scope="col">Staff</th>
                        </tr>
                    </thead>
                    <tbody>
                      ${datohtml}
                    </tbody>
                </table>`

        el.datosResumenGeneral.innerHTML = table;
    }



    async datosmodelotrabajo(u, m) {
        const res = await db.dashboardHome3(u, m);
        let cat = [], sit = [], hom = []
        res.forEach(x => {
            if (cat.includes(x.tipoArea) === false) {
                cat.push(x.tipoArea)
            }
            sit.push(parseInt(x.Site))
            hom.push(parseInt(x.Home))
        })


        var chartHomeSite = require('highcharts');
        chartHomeSite.chart(datosModeloTrabajo, {
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }
                }
            },
            title: {
                text: '',
                align: 'center',
                floating: true
            },
            credits: {
                enabled: false
            },

            chart: {
                type: 'column'
                , zoomType: 'xy'
            },
            xAxis: {
                categories: cat
            },
            yAxis: [{
                labels: {
                    format: '{value}'
                },
                title: {
                    text: ''
                }
            }],

            series: [{
                name: 'Site',
                data: sit,
                color: '#343a40'
            }, {
                name: 'Home',
                data: hom,
                color: '#17a2b8'
            }]
        });

        alerts.close();
    }
}

