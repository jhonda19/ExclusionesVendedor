import { Database } from '../db/Database';
import * as alerts from '../app/Alerts.js';
const XLSX = require('xlsx');
const db = new Database();

const el = {
    btnRpt1: document.querySelector('#btnRpt1'),
    btnRpt2: document.querySelector('#btnRpt2'),
    btnRpt3: document.querySelector('#btnRpt3'),
    btnRpt4: document.querySelector('#btnRpt4'),
    btnRpt5: document.querySelector('#btnRpt5'),
    btnTotalRoster: document.querySelector('#btnTotalRoster'),
    // btnTotalRosterRefresh: document.querySelector('#btnTotalRosterRefresh'),
    // btnTotalRosterDown: document.querySelector('#btnTotalRosterDown'),
    inputUnidades: document.querySelector('#inputUnidades'),
    inputMeses: document.querySelector('#inputMeses'),
    loadRosterTotal: document.querySelector('#loadRosterTotal'),
}

var unidad = ''
export class reportes {

    async inicioReportes() {
        this.unidades();
        this.rpt1();
        this.rpt2();
        this.rpt3();
        this.rpt4();
        this.rpt5();
        // this.TotalRoster(1);

        // el.btnTotalRosterRefresh.addEventListener('click', () => {
        //     this.TotalRoster(1);
        // })
        // el.btnTotalRosterDown.addEventListener('click', () => {
        //     this.TotalRoster(0);
        // })
    }

    async unidades() {
        alerts.load();
        unidad = ''
        const res = await db.listNegocios(unidad);
        let unidades = []
        res.forEach(x => {
            if (unidades.includes(x.unidad) === false) {
                unidades.push(x.unidad)
            }
        })
        const html = unidades.map(e => `<option value="${e}">${e}</option>`)
        // html.push(`<option selected hidden></option>`)
        html.push(`<option disabled=""></option> <option selected class="bg-light" value="0">TODAS LAS UNIDADES</option>`)
        el.inputUnidades.innerHTML = html
        alerts.close();
    }

    async Meses() {
        alerts.load();
        const res = await db.listMesesReport();
        const html = res.map(e => `<option selected value="${e.fecha}">${e.mes}</option>`)
        el.inputMeses.innerHTML = html
        alerts.close();
    }

    rpt1() {
        el.btnRpt1.addEventListener('click', async (e) => {
            alerts.load();
            const res = await db.rpte1();
            var headers = ['empresa', 'site', 'tipoId', 'cedula', 'vhur', 'nombreApellido', 'estadoEmpleado', 'split', 'claseSalario', 'fechaIngreso', 'fechaRetiro'];
            var data = [];
            data.push(headers);
            res.map(e => data.push([e.empresa, e.site, e.tipoId, e.cedula, e.vhur, e.nombreApellido, e.estadoEmpleado, e.split, e.claseSalario, e.fechaIngreso, e.fechaRetiro]))
            var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
            XLSX.utils.book_append_sheet(wb, ws, 'reporte1');
            XLSX.writeFile(wb, 'reporte1.xlsx');
            alerts.close();
        })
    }

    rpt2() {
        el.btnRpt2.addEventListener('click', async (e) => {
            alerts.load();
            const res = await db.rpte2();
            var headers = ['id', 'tipoDoc', 'documento', 'nombre', 'fechaIngreso', 'fechaRetiro', 'estado', 'fechaContrato', 'contratadoReal', 'Unidad', 'subUnidad', 'lob', 'cargo', 'posición', 'fhUpdate', 'userApp'];
            var data = [];
            data.push(headers);
            res.map(e => data.push([e.id, e.tipoDoc, e.documento, e.nombre, e.fechaIngreso, e.fechaRetiro, e.estado, e.fechaContrato, e.contratadoReal, e.unidad, e.subunidad, e.lob, e.cargo, e.posicion, e.fhUpdate, e.userApp]))
            var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
            XLSX.utils.book_append_sheet(wb, ws, 'reporte2');
            XLSX.writeFile(wb, 'reporte2.xlsx');
            alerts.close();
        })
    }

    rpt3() {
        el.btnRpt3.addEventListener('click', async (e) => {
            alerts.load();
            const res = await db.rpte3();
            // console.log(res);
            var headers = ['tipoDoc', 'documento', 'nombre', 'fechaIngreso', 'estado', 'cargo', 'posición', 'unidad', 'subunidad', 'lob', 'servicio', 'comentario'];
            var data = [];
            data.push(headers);
            res.map(e => data.push([e.tipoDoc, e.documento, e.nombre, e.fechaIngreso, e.estado, e.cargo, e.posicion, e.unidad, e.subunidad, e.lob, e.servicio, e.comentario]))
            var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
            XLSX.utils.book_append_sheet(wb, ws, 'reporte3');
            XLSX.writeFile(wb, 'reporte3.xlsx');
            alerts.close();
        })
    }

    rpt5() {
        el.btnRpt5.addEventListener('click', async (e) => {
            alerts.load();
            const res = await db.rpte5();
            var headers = ['id'
                , 'documento'
                , 'nombreEmpleado'
                , 'usuarioLogin'
                , 'idApp'
                , 'nombreApp'
                , 'fechaInicio'
                , 'fechaFin'
                , 'i'
            ];
            var data = [];
            data.push(headers);
            res.map(e => data.push([e.id
                , e.documento
                , e.nombreEmpleado
                , e.usuarioLogin
                , e.idApp
                , e.nombreApp
                , e.fechaInicio
                , e.fechaFin
                , e.i
            ]))
            var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
            XLSX.utils.book_append_sheet(wb, ws, 'reporte5');
            XLSX.writeFile(wb, 'reporte5.xlsx');
            alerts.close();
        })
    }


    rpt4() {
        el.btnRpt4.addEventListener('click', async (e) => {
            var uni = el.inputUnidades.value
            if (uni == '') {
                   alerts.error('Seleccione una cuenta')
            } else {


                alerts.load();

                const res = await db.rpte4(uni);
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
                XLSX.utils.book_append_sheet(wb, ws, 'reporte4');
                XLSX.writeFile(wb, 'reporte4_rosterxCuenta.xlsx');
                alerts.close();
            }
        })

    }


    async TotalRoster(a) {
        alerts.load();
        const res = await db.TotalRoster();
        if (a === 1) {
            if (el.loadRosterTotal) {
                el.loadRosterTotal.remove();
            }
            $('#tblRostCompl').bootstrapTable("destroy").bootstrapTable({
                data: res,
                search: true,
                pagination: true,
                filterControl: true,
                filterControlVisible: false,
                showFilterControlSwitch: true,
                columns: [{
                    field: 'idMylink',
                    title: 'idMylink',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }, {
                    field: 'vhur',
                    title: 'VHUR',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }, {
                    field: 'documento',
                    title: 'documento',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }, {
                    field: 'nombre',
                    title: 'nombre',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }, {
                    field: 'estado',
                    title: 'Estado',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center',
                    cellStyle: (value, row, index) => {
                        if (row.estado === 'Retiro') {
                            return {
                                classes: 'text-danger font-weight-bold'
                            }
                        } else {
                            return {
                                classes: 'text-primary font-weight-bold'
                            }
                        }
                    }
                }, {
                    field: 'fechaContrato',
                    title: 'fechaContrato',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }, {
                    field: 'fechaRetiro',
                    title: 'fechaRetiro',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }, {
                    field: 'cargo',
                    title: 'cargo',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }, {
                    field: 'claseSalario',
                    title: 'claseSalario',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }, {
                    field: 'unidad',
                    title: 'unidad',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }, {
                    field: 'subunidad',
                    title: 'subunidad',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }, {
                    field: 'lob',
                    title: 'lob',
                    filterControl: 'input',
                    filterControlPlaceholder: 'Filtro...',
                    align: 'center'
                }
                ]
            })

        } else {
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
                , e.fhUpdate]))
            var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
            XLSX.utils.book_append_sheet(wb, ws, 'Roster');
            XLSX.writeFile(wb, 'reporte_AllRoster.xlsx');
        }
        alerts.close();


    }



}