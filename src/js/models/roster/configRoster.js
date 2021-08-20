import jquery from 'jquery';
window.$ = window.jQuery = jquery;
import { Database } from '../db/Database';
import * as alerts from '../app/Alerts.js';
const XLSX = require('xlsx');
const db = new Database();
require('bootstrap-table');

const el = {
    formInParamRang: document.querySelector('#formInParamRang'),
    inParamRangEmpl: document.querySelector('#inParamRangEmpl'),
    inParamRangUsu: document.querySelector('#inParamRangUsu'),
    inParamRangNom: document.querySelector('#inParamRangNom'),
    inParamConfigComent: document.querySelector('#inParamConfigComent'),
    btnUpdateConfigRang: document.querySelector('#btnUpdateConfigRang'),
    /*negocio*/
    tblnegocios: $('#tblnegocios'),
    modalForm: document.querySelector('#modalForm'),
    inUnidad: '',
    inSubUnidad: '',
    inLob: '',
    inServicio: '',
    inSplitdefault: '',
    btnGuardarNegocio: '',
    btnGuadarNuevo: document.querySelector('#btnGuadarNuevo'),
    btnDescargarData: document.getElementById('btnDescargarData'),
    btnEliminarNegocio: '',
    /*split*/
    tblsplit: $('#tblsplit'),
    insplit: '',
    inEmpresa: '',
    btnGuardarSplit: '',
    btnGuadarNuevoSplit: document.querySelector('#btnGuadarNuevoSplit'),
    btnDescargarDataSplit: document.getElementById('btnDescargarDataSplit'),
    btnEliminarSplit: '',
}
var unidad = ''

export class configuraciones {

    inicioConfg() {
        this.consultaParam(1);
        el.formInParamRang.addEventListener('change', () => {
            el.inParamConfigComent.disabled = false;
            el.btnUpdateConfigRang.disabled = false;
        })
        this.btnConfigRang();
        this.admin()
    }

    // admin
    async admin() {
        let a = await alerts.denc(localStorage.getItem('OLwfmAdminApp'));

        if (a != 1) {
            $("#cardConfigModal").addClass("disdiv");
        }
    }


    async consultaParam(a) {
        alerts.load()
        const res = await db.consulParamRang();
        if (a === 1) {
            this.updateDatos(res);
        }
        return res;
    }
    updateDatos(res) {
        if (res.length === 1) {
            el.inParamRangEmpl.value = res[0].empleados
            el.inParamRangUsu.value = res[0].usuarios
            el.inParamRangNom.value = res[0].nomina
            alerts.close();
        } else {
            alerts.errorReload('Algo sucedio con la conexión')
        }
    }

    btnConfigRang() {
        el.btnUpdateConfigRang.addEventListener('click', () => {
            var coment = el.inParamConfigComent.value;
            if (coment.length > 0) {
                alerts.load();
                this.updateConfigRang();
            } else {
                alerts.error('Ingrese el motivo de la solicitud!')
            }
        })
    }

    async updateConfigRang() {
        let a = await alerts.denc(localStorage.getItem('OLwfmAdminApp'));
        if (a != 1) {
            alerts.errorReload('No cuenta los permisos necesarios')
        } else {

            var inParamRangEmpl = el.inParamRangEmpl.value;
            var inParamRangUsu = el.inParamRangUsu.value;
            var inParamRangNom = el.inParamRangNom.value;
            var inParamConfigComent = el.inParamConfigComent.value;
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                const res = await db.updateConfigRang(inParamRangEmpl, inParamRangUsu, inParamRangNom, inParamConfigComent, ua);
                // console.log(res);
                if (res[0].res === '1') {
                    alerts.save();
                    setTimeout(() => {
                        this.consultaParam(1);
                    }, 2000);
                    el.inParamConfigComent.value = '';
                    el.inParamConfigComent.disabled = true;
                    el.btnUpdateConfigRang.disabled = true;

                } else {
                    alerts.errorSave();
                }

            }
        }
    }


}

export class UnidNegocio {

    async inicio() {
        // this.unidadActiva();
        
        

        el.btnDescargarData.addEventListener('click', async (e) => {
            alerts.load();
            unidad = await alerts.denc(localStorage.getItem('OLwfmUnidad'));
            const res = await db.listNegocios(unidad);
            var headers = ['id', 'lob', 'unidad', 'subunidad', 'servicio', 'splitDefault'];
            var data = [];
            data.push(headers);
            res.map(e => data.push([e.id, e.lob, e.unidad, e.subunidad, e.servicio, e.splitDefault]))
            var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
            XLSX.utils.book_append_sheet(wb, ws, 'Negocios');
            XLSX.writeFile(wb, 'Negocios.xlsx');
            alerts.close();
        })
        
        this.negocios();
        this.nuevaUni();

        
    }

    // async unidadActiva() {
    //     unidad = await alerts.denc(localStorage.getItem('OLwfmUnidad'));
    //     console.log(unidad)
    // }
    async negocios() {
        alerts.load();
        unidad = await alerts.denc(localStorage.getItem('OLwfmUnidad'));
        const res = await db.listNegocios(unidad);
        this.tblNegocios(res);
    }

    tblNegocios(res) {
        window.operateEvents = {
            'click .edit': (e, value, row, index) => {
                var datos = row
                this.datosModal(datos, 0);
            }
        }

        el.tblnegocios.bootstrapTable("destroy").bootstrapTable({
            data: res,
            pagination: true,
            search: true,
            columns: [{
                field: 'unidad',
                title: 'unidad',
                align: 'center',
            }, {
                field: 'subunidad',
                title: 'subunidad',
                align: 'center',
            }, {
                field: 'lob',
                title: 'lob',
                align: 'center',
            }, {
                field: 'servicio',
                title: 'servicio',
                align: 'center',
            }, {
                field: 'splitDefault',
                title: 'Split Default',
                align: 'center',
            }, {
                title: 'Editar',
                align: 'center',
                events: window.operateEvents,
                formatter: (value, row, index) => { return '<a id="btnNegocio" type="button" class="edit" data-toggle="modal" data-target="#staticBackdrop"><i class="fas fa-edit text-dark"></i> </a> ' }
            }]
        })
        alerts.close();
    }

    async datosModal(datos, a) {
        const list = await db.listSplit();
        let opt = list.map(e => `<option>${e.split}</option>`).join();
        const html = ` <div class="mt-2">
                        <label for="inUnidad">Unidad:</label>
                        <input type="text" class="form-control" id="inUnidad" value="${datos.unidad == undefined ? '' : datos.unidad}">
                    </div>
                    <div class=" mt-2">
                        <label for="inSubUnidad">SubUnidad:</label>
                        <input type="text" class="form-control" id="inSubUnidad" value="${datos.subunidad == undefined ? '' : datos.subunidad}">
                    </div>
                    <div class=" mt-2">
                        <label for="inLob">Lob:</label>
                        <input type="text" class="form-control" id="inLob" value="${datos.lob == undefined ? '' : datos.lob}">
                    </div>
                    <div class=" mt-2">
                        <label for="inServicio">Servicio:</label>
                        <input type="text" class="form-control" id="inServicio" value="${datos.servicio == undefined ? '' : datos.servicio}">
                    </div>
                    <div class=" mt-2">
                        <label for="inSplitdefault">Split Predeterminado:</label>
                        <select type="text" class="form-control" id="inSplitdefault">
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary btn-user btn-block mt-4" id="btnGuardarNegocio">Guardar</button>
                    ${a == 0 ? '<button type="button" class="btn btn-danger btn-user btn-block mt-4" id="btnEliminarNegocio">Eliminar</button>' : ''}`
        el.modalForm.innerHTML = html;
        $('#staticBackdrop').find('.modal-title').text('Unidad de Negocio');
        el.inUnidad = document.querySelector('#inUnidad');
        el.inSubUnidad = document.querySelector('#inSubUnidad');
        el.inLob = document.querySelector('#inLob');
        el.inServicio = document.querySelector('#inServicio');
        el.inSplitdefault = document.querySelector('#inSplitdefault');
        el.btnGuardarNegocio = document.querySelector('#inId');

        el.inSplitdefault.innerHTML = opt;
        var dataId = datos.id;
        el.inSplitdefault.value = datos.splitDefault;
        if (a == 0) {
            this.actualizar(dataId);
            this.eliminarNegocio(dataId)
        } else {
            this.guardarNuevo();
        }
    }

    nuevaUni() {
        el.btnGuadarNuevo.addEventListener('click', async (e) => {
            this.datosModal(0, 1);
        })
    }

    guardarNuevo() {
        el.btnGuardarNegocio = document.querySelector('#btnGuardarNegocio');
        el.btnGuardarNegocio.addEventListener('click', async (e) => {
            $("#staticBackdrop").modal('hide');
            alerts.load();
            var uni = el.inUnidad.value;
            var subu = el.inSubUnidad.value;
            var lob = el.inLob.value;
            var ser = el.inServicio.value;
            var split = el.inSplitdefault.value;

            if (uni.length > 0 && subu.length > 0 && lob.length > 0 && ser.length > 0 && split.length > 0) {
                const res = await db.nuevoNegocio(uni, subu, lob, ser, split);
                if (res[0].res == '1') {
                    alerts.save();
                } else {
                    alerts.errorSave();
                }
                unidad = await alerts.denc(localStorage.getItem('OLwfmUnidad'));
                const tbl = await db.listNegocios(unidad);
                el.tblnegocios.bootstrapTable('refreshOptions', {
                    data: tbl
                })
            } else {
                alerts.error('Datos incompletos!')
            }

        })
    }

    actualizar(dataId) {
        el.btnGuardarNegocio = document.querySelector('#btnGuardarNegocio');
        el.btnGuardarNegocio.addEventListener('click', async (e) => {
            $("#staticBackdrop").modal('hide');
            alerts.load();
            var id = dataId;
            var uni = el.inUnidad.value;
            var subu = el.inSubUnidad.value;
            var lob = el.inLob.value;
            var ser = el.inServicio.value;
            var split = el.inSplitdefault.value;
            const res = await db.updateNegocio(id, uni, subu, lob, ser, split);
            if (res[0].res == '1') {
                alerts.save();
            } else {
                alerts.errorSave();
            }
            unidad = await alerts.denc(localStorage.getItem('OLwfmUnidad'));
            const tbl = await db.listNegocios(unidad);
            el.tblnegocios.bootstrapTable('refreshOptions', {
                data: tbl
            })
        })


    }

    eliminarNegocio(dataId) {
        el.btnEliminarNegocio = document.querySelector('#btnEliminarNegocio');
        el.btnEliminarNegocio.addEventListener('click', async (e) => {
            $("#staticBackdrop").modal('hide');
            alerts.load();
            var id = dataId;
            const res = await db.deleteNegocio(id);
            if (res[0].res == '1') {
                alerts.save();
            } else {
                alerts.errorSave();
            }
            unidad = await alerts.denc(localStorage.getItem('OLwfmUnidad'));
            const tbl = await db.listNegocios(unidad);
            el.tblnegocios.bootstrapTable('refreshOptions', {
                data: tbl
            })


        })
    }

}

export class UnidSplit {

    async inicioSplit() {
        el.btnDescargarDataSplit.addEventListener('click', async (e) => {
            alerts.load();
            const res = await db.DatosSplit();
            var headers = ['id', 'empresa', 'split', 'estado'];
            var data = [];
            data.push(headers);
            res.map(e => data.push([e.id, e.empresa, e.split, e.estado]))
            var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
            XLSX.utils.book_append_sheet(wb, ws, 'split');
            XLSX.writeFile(wb, 'split.xlsx');
            alerts.close();
        })
        this.split();
        this.nuevoCentro();
    }

    async split() {
        alerts.load();
        const res = await db.DatosSplit();
        this.tblsplit(res);
    }

    tblsplit(res) {
        window.operateEvents = {
            'click .edit': (e, value, row, index) => {
                var datos = row
                this.datosModal(datos, 0);
            }
        }

        el.tblsplit.bootstrapTable("destroy").bootstrapTable({
            data: res,
            pagination: true,
            search: true,
            columns: [{
                field: 'id',
                title: 'ID',
                align: 'center',
            }, {
                field: 'empresa',
                title: 'Empresa',
                align: 'center',
            }, {
                field: 'split',
                title: 'Centro de Costo',
                align: 'center',
            }, {
                title: 'Editar',
                align: 'center',
                events: window.operateEvents,
                formatter: (value, row, index) => { return '<a id="btnSplit" type="button" class="edit" data-toggle="modal" data-target="#staticBackdrop"><i class="fas fa-edit text-dark"></i> </a> ' }
            }]
        })
        alerts.close();
    }

    async datosModal(datos, a) {
        const listEmp = await db.listEmpresa();
        let opt = listEmp.map(e => `<option>${e.empresa}</option>`).join();
        const html = `  <div class=" mt-2">
                            <label for="inEmpresa">Empresa:</label>
                            <select type="text" class="form-control" id="inEmpresa">
                            </select>
                        </div>
                        <div class="mt-2">
                        <label for="insplit">Centro de Costo (Split):</label>
                        <input type="text" class="form-control" id="insplit" value="${datos.split == undefined ? '' : datos.split}">
                    </div>
                    <button type="button" class="btn btn-primary btn-user btn-block mt-4" id="btnGuardarSplit">Guardar</button>
                    ${a == 0 ? '<button type="button" class="btn btn-danger btn-user btn-block mt-4" id="btnEliminarSplit">Eliminar</button>' : ''}`
        el.modalForm.innerHTML = html;
        $('#staticBackdrop').find('.modal-title').text('Centro de Costo');
        el.insplit = document.querySelector('#insplit');
        el.inEmpresa = document.querySelector('#inEmpresa');
        el.inEmpresa.innerHTML = opt;
        var dataId = datos.id;
        el.inEmpresa.value = datos.empresa;
        if (a == 0) {
            this.actualizar(dataId);
            this.eliminarSplit(dataId)
        } else {
            this.guardarNuevo();
        }
    }

    nuevoCentro() {
        el.btnGuadarNuevoSplit.addEventListener('click', async (e) => {
            this.datosModal(0, 1);
        })
    }

    guardarNuevo() {
        el.btnGuardarSplit = document.querySelector('#btnGuardarSplit');
        el.btnGuardarSplit.addEventListener('click', async (e) => {
            $("#staticBackdrop").modal('hide');
            alerts.load();
            var emp = el.inEmpresa.value;
            var split = el.insplit.value;
            if (emp.length > 0 && split.length > 0) {
                const res = await db.nuevoSplit(emp, split);
                if (res[0].res == '1') {
                    alerts.save();
                } else {
                    alerts.errorSave();
                }
                const tbl = await db.DatosSplit();
                el.tblsplit.bootstrapTable('refreshOptions', {
                    data: tbl
                })
            } else {
                alerts.error('Datos incompletos!');
            }

        })
    }

    actualizar(dataId) {
        el.btnGuardarSplit = document.querySelector('#btnGuardarSplit');
        el.btnGuardarSplit.addEventListener('click', async (e) => {
            $("#staticBackdrop").modal('hide');
            alerts.load();
            var id = dataId;
            var emp = el.inEmpresa.value;
            var split = el.insplit.value;
            const res = await db.updateCentroCosto(id, emp, split);
            if (res[0].res == '1') {
                alerts.save();
            } else {
                alerts.errorSave();
            }
            const tbl = await db.DatosSplit();
            el.tblsplit.bootstrapTable('refreshOptions', {
                data: tbl
            })
        })


    }

    eliminarSplit(dataId) {
        el.btnEliminarSplit = document.querySelector('#btnEliminarSplit');
        el.btnEliminarSplit.addEventListener('click', async (e) => {
            $("#staticBackdrop").modal('hide');
            alerts.load();
            var id = dataId;
            const res = await db.deleteSplit(id);
            if (res[0].res == '1') {
                alerts.save();
            } else {
                alerts.errorSave();
            }
            const tbl = await db.DatosSplit();
            el.tblsplit.bootstrapTable('refreshOptions', {
                data: tbl
            })


        })
    }
}
