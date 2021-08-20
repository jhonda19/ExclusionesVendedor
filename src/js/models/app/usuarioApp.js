import { Database } from '../db/dbApp';
import { AppController } from '../app/App';
import * as alerts from '../app/Alerts.js';
require('bootstrap-table');
// import nprogress, * as NProgress from 'nprogress/nprogress.js';
// NProgress.configure({ showSpinner: false });


const db = new Database();
const ap = new AppController();

const el = {
    userDocumento: document.querySelector('#userDocumento'),
    btnSearchId: document.querySelector('#btnSearchId'),
    resDoc: document.querySelector('#resDoc'),
    tblviewsDoc: $('#tblviewsDoc'),
    divBtnGuardarUser: document.querySelector('#divBtnGuardarUser'),
    btnGuardarUser: '',
    userApp: '',
    validaUser: '',
    messageCheckbox: '',

}
var userValido = 0
export class userApp {

    validateId() {
        el.btnSearchId.addEventListener('click', async (e) => {
            userValido = 0
            let OLwfmAdminApp = await alerts.denc(localStorage.getItem('OLwfmAdminApp'))
            const id = el.userDocumento.value
            let doc = await alerts.denc(localStorage.getItem('OLwfmDocUser'))
            if (id === '') {
                alerts.error('mmm... te faltó el documento');
            } else if (id === doc && parseInt(OLwfmAdminApp) === 0) {
                alerts.security('Acceso no valido!')
            } else {
                this.searchId(id);
            }
        })
    }

    async searchId(id) {
        alerts.load();
        const res = await db.searchId(id);

        if (res[0].id > 0) {
            let OLwfmAdminApp = await alerts.denc(localStorage.getItem('OLwfmAdminApp'))
            let OLwfmUnidad = await alerts.denc(localStorage.getItem('OLwfmUnidad'))
            let OLwfmJerarquia = await alerts.denc(localStorage.getItem('OLwfmJerarquia'))
            let OLwfmPosicion = await alerts.denc(localStorage.getItem('OLwfmPosicion'))
            if (parseInt(OLwfmAdminApp) === 0) {
                if (OLwfmUnidad == res[0].unidad) {
                    if (OLwfmPosicion == res[0].posicion) {
                        if (parseInt(OLwfmJerarquia) >= parseInt(res[0].jerarquia)) {
                            this.datosResDoc(res)
                        } else {
                            limpiar()
                            alerts.security('No puedes conceder permisos a ese nivel.')
                        }
                    } else {
                        limpiar()
                        alerts.security('La persona pertenece a otra área.')
                    }
                } else {
                    limpiar()
                    alerts.security('La persona pertenece a otra cuenta.')
                }
            } else {
                this.datosResDoc(res)
            }
        } else {
            limpiar()
            alerts.error('Documento no encontrado!')
        }

        function limpiar() {
            if (document.getElementById("resUser")) {
                document.getElementById("resUser").remove();
                if (document.getElementById("tblviewsDoc")) {
                    el.tblviewsDoc.bootstrapTable("destroy");
                    document.getElementById("btnGuardarUser").remove();
                }
            }
        }


    }

    datosResDoc(res) {
        let html = `<div id="resUser">
                        <p class="text-left mt-2">
                            Ingrese el usuario de red y seleccione las vistas de acceso:&nbsp;
                        </p>
                        <p class="text-left mt-2">
                            ${res[0].nombre}
                        </p>
                        <div class="row">
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <div class="input-group-prepend" id="basic-addon2">
                                            <span class="input-group-text bg-success" id="validaUser">
                                                <i class="fas fa-fw fa-user text-white"></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control text-dark" id="userApp" placeholder="Usuario de red" value="${res[0].userRed}" disabled>
                                    </div>
                                </div>  
                                <div class="col-sm-auto">
                                    <div class="form-check mt-1">
                                        <input class="form-check-input messageCheckbox" type="checkbox" id="autoSizingCheck">
                                        <label class="form-check-label mt-1" for="autoSizingCheck">
                                        &nbsp;&nbsp;Agregar o modificar usuario?
                                        </label>
                                    </div>
                                </div>           
                        </div>
                        </div>`;
        el.resDoc.innerHTML = html;
        el.userApp = document.getElementById('userApp');
        el.validaUser = document.getElementById('validaUser');
        el.messageCheckbox = document.querySelector('.messageCheckbox')

        el.messageCheckbox.addEventListener('click', () => {
            var checkedValue = null;
            var inputElements = document.getElementsByClassName('messageCheckbox');;
            for (var i = 0; inputElements[i]; ++i) {
                if (inputElements[i].checked) {
                    checkedValue = inputElements[i].value;
                    el.userApp.disabled = false
                    break;
                } else {
                    el.userApp.disabled = true
                }
            }

        })
        this.viewsApp(res[0].doc);

        this.userValido(res[0].userRed);
    }

    userValido(resUser) {
        let ru = resUser
        el.userApp.addEventListener('keydown', async (e) => {
            const htmlLoad = `<div class="spinner-border spinner-border-sm text-white" role="status"></div>`
            el.validaUser.innerHTML = htmlLoad;
            setTimeout(async () => {
                let u = el.userApp.value
                let res = await db.consultaUserVal(u);
                if ((parseInt(res[0].res) === 0 && u.length > 7) || u === ru) {
                    const htmlSi = `<i class="fas fa-fw fa-user text-white"></i>`
                    el.validaUser.classList.remove('bg-danger');
                    el.validaUser.classList.add('bg-success')
                    el.validaUser.innerHTML = htmlSi;
                    userValido = 0
                } else {
                    const htmlNo = `<i class="fas fa-fw fa-times text-white"></i>`
                    el.validaUser.classList.remove('bg-success');
                    el.validaUser.classList.add('bg-danger')
                    el.validaUser.innerHTML = htmlNo;
                    userValido = 1
                }
            }, 5);

        })
    }


    async viewsApp(id) {
        alerts.close();
        const res = await db.listViewsApp(id);
        this.tblViewsDoc(res, id);
    }

    tblViewsDoc(res, id) {
        var selections = []
        res.map((e) => {
            e.idActivoUser == null ? false :
                selections.push(e.vista)
        })
        el.tblviewsDoc.bootstrapTable("destroy")
        el.tblviewsDoc.bootstrapTable({
            data: res,
            pagination: false,
            search: false,
            columns: [{
                field: 'idActivoUser',
                title: 'idActivoUser',
                checkbox: true,
                align: 'center',

            }, {
                field: 'id',
                title: '#',
                align: 'center',
            }, {
                field: 'modulo',
                title: 'modulo',
                align: 'center',
                formatter: (value, row, index) => {
                    return row.modulo === 'Guía Informativa' ? '<span class="badge textNormal badge-info">' + row.modulo + '</span>'
                                            : '<span class=" badge textNormal badge-danger">' + row.modulo + '</span>'
                }
            }, {
                field: 'nombreFront',
                title: 'Vista',
                align: 'center',
            }, {
                field: 'descripcion',
                title: 'Descripción',
                align: 'center',
            }]

        })

        el.tblviewsDoc.on('check.bs.table', function (e, row) {
            el.btnGuardarUser.disabled = false;
            selections.push(row.vista);
        });

        el.tblviewsDoc.on('uncheck.bs.table', function (e, row) {
            el.btnGuardarUser.disabled = false;
            function removeItemFromArr(arr, item) {
                var i = arr.indexOf(item);
                arr.splice(i, 1);
            }
            removeItemFromArr(selections, row.vista);

        })

        el.tblviewsDoc.on('check-all.bs.table', function (e, row) {
            el.btnGuardarUser.disabled = false;
            selections = [];
            row.map((e) => {
                selections.push(e.vista);
            });
        });

        el.tblviewsDoc.on('uncheck-all.bs.table', function (e, row) {
            el.btnGuardarUser.disabled = false;
            selections = [];
        });



        el.divBtnGuardarUser.innerHTML = ` <button type="button" class="btn btn-danger" id="btnGuardarUser" disabled><i class="fas fa-save"></i>&nbsp;Guardar</button>`;
        el.btnGuardarUser = document.getElementById('btnGuardarUser');

        el.btnGuardarUser.addEventListener('click', async (e) => {
           alerts.load()
            if (userValido === 0) {
                el.btnGuardarUser.disabled = true;
                let user = el.userApp.value;
                var per = '';
                selections.map((e) => {
                    per = per + e + ','
                });
                const res = await db.saveUser(id, per, user);
                if (user.length > 0) {
                    alerts.load();
                    if (res[0].res == '1') {
                        alerts.save();
                        setTimeout(() => {
                            if (document.getElementById("resUser")) {
                                document.getElementById("resUser").remove();
                                if (document.getElementById("tblviewsDoc")) {
                                    el.tblviewsDoc.bootstrapTable("destroy");
                                    document.getElementById("btnGuardarUser").remove();
                                    el.userDocumento.value = ''
                                }
                            }

                        }, 2500);
                    } else {
                        alerts.errorReload('Error al guardar');
                    }

                } else {
                    alerts.error('usuario de red no valido!')
                }

            } else {
                alerts.error('El usuario ya existe!')
            }



        })

    }



}