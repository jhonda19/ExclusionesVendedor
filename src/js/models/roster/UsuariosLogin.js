import { Database } from '../db/Database';
import * as alerts from '../app/Alerts.js';
import { AppController } from '../app/App.js';
const XLSX = require('xlsx');

const el = {
    tblUsuariosLogin: $('#tblPlantillaUsuario'),
    tblDetalleUsuariosLogin: $('#tblDetalleUsuario'),
    formUsuariosLogin: document.getElementById('formUsuariosLogin'),
    selectUsuariosLogin: document.getElementById('selectUsuariosLogin'),
    xlsUsuariosLogin: document.getElementById('xlsUsuariosLogin'),
    btnCargaUsuariosLogin: document.getElementById('btnXlsUsuariosLogin'),
    infoResultado: document.getElementById('info'),
    btnEjecutaformUsuariosLogin: '',
    btnDownloadTmpFinal: '',
    progreso: document.getElementById('progreso'),
    bar: '',
}

const db = new Database();
const ap = new AppController();

export class usuariosLogin {

    cargaUsuariosLogin() {
        el.xlsUsuariosLogin.addEventListener('change', (e) => {
            const nomxls = xlsUsuariosLogin.files[0].name;
            if (nomxls === 'PlantillaUsuariosLogin.xlsx') {
                el.formUsuariosLogin.xlsUsuariosLogin.nextElementSibling.innerText = el.formUsuariosLogin.xlsUsuariosLogin.files[0].name;
                var reader = new FileReader()
                reader.readAsArrayBuffer(e.target.files[0]);
                reader.onload = (e) => {
                    let data = new Uint8Array(reader.result);
                    let wb = XLSX.read(data, { type: 'array', cellDates: true, blankrows: true })
                    let ws = wb.Sheets['usuariosLogin'];
                    if (typeof ws === 'undefined') {
                        alerts.errorReload('No se encontró la hoja "usuariosLogin"');
                    } else {
                        this.almacenaTmpUsuarios(XLSX.utils.sheet_to_json(ws, { header: 0, defval: "" }))
                    }
                }
            } else { alerts.error('Plantilla incorrecta!') }
        })
    }

    almacenaTmpUsuarios(data) {
        if (data.length === 0) {
            alerts.errorReload('El libro está vacío');
        } else if (data.length > 0 && data.length < 1501) {
            el.btnCargaUsuariosLogin.disabled = false;
            el.btnCargaUsuariosLogin.addEventListener('click', async (e) => {
                const ua = await alerts.userActivo();
                if (ua === false) {
                    alerts.errorReload('Tu sesión ha expirado!')
                } else {
                    alerts.load();
                    const datos = data.map(e => `&documento:${e.documento} &usuario:${e.usuario} &app:${e.app} &fechaInicio:${ap.convertDate(e.fechaInicio)} &|`).join('')
                    const res = await db.almacenaTmpUsuariosLogin(ua, datos);
                    if (parseInt(res[0].ErrorNumber) > 0) {
                        alerts.errorReload(res[0].ErrorMessage)
                    } else {
                        this.datosTmpUsuarios(res);
                    }
                }
            })
        } else {
            alerts.errorReload('El libro supera los 1.500 registros');
        }
    }


    datosTmpUsuarios(res) {
        // Elimina Form Input File
        el.formUsuariosLogin.classList.add('animate__animated', 'animate__flipOutX');
        el.formUsuariosLogin.addEventListener('animationend', () => {
            el.formUsuariosLogin.remove();
        });

        window.operateEvents = {
            'click .like': (e, value, row, index) => {
                DatosUnoaUnoUsuarios(row);
            }
            , 'click .likeDescargarUser': (e, value, row, index) => {
                descargarSelectedUser(row);
            }
        }

        // Tabla Resumen
        el.tblUsuariosLogin.bootstrapTable("destroy")
        el.tblUsuariosLogin.bootstrapTable({
            data: res,
            columns: [{
                field: 'estado',
                title: 'Estado',
                align: 'center',
                cellStyle: (value, row, index) => {
                    if (row.estado === 'No Valido') {
                        return {
                            classes: 'text-danger font-weight-bold'
                        }
                    } else {
                        return {
                            classes: 'text-info font-weight-bold'
                        }
                    }
                }
            }, {
                field: 'Cantidad',
                title: 'Cantidad',
                align: 'center',
                cellStyle: (value, row, index) => {
                    if (row.estado === 'No Valido') {
                        return {
                            classes: 'text-danger font-weight-bold'
                        }
                    } else {
                        return {
                            classes: 'text-info font-weight-bold'
                        }
                    }
                }
            }, {
                title: 'Detalle',
                align: 'center',
                events: window.operateEvents,
                formatter: (value, row, index) => { return '<a id="btnDetalle" type="button" class="like"><i class="fas fa-eye text-dark"></i></a> ' }
            }, {
                title: 'Descargar',
                align: 'center',
                events: window.operateEvents,
                formatter: (value, row, index) => { return '<a id="btnDescargar" type="button" class="likeDescargarUser"><i class="fas fa-download text-dark"></i> </a> ' }
            }]
        })

        // adiciona botones e info
        const ejec = (`<p class="text-left"><i class="fas fa-info-circle text-dark"></i>&nbsp;Solo serán procesados los registros válidos.</p>
                    <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i> La validación de los datos se realizó con base a las consideraciones establecidas.&nbsp; | <a href="" data-toggle="modal" data-target="#exampleModalLong" style="color:#2980b9"><b>Consultar</b></a>
                    </p>
                    <div class="row mt-5">
                    <div class="col-5">
                    <button id="" class="btn btn-danger btn-sm btn-block" type="button" onclick="window.location.href='usuarios';">
                    <i class="fas fa-arrow-left text-white"></i> Volver
                    </button> 
                    </div>
                    <div class="col-1">
                    </div>
                    <div class="col-5">
                    <button id="btnEjecutaTmpUsuarios" class="btn btn-primary btn-sm btn-block" type="button">
                    <i class="fas fa-check-circle text-white"></i> Continuar
                    </button>
                    </div>
                    </div>`);

        el.infoResultado.innerHTML = ejec;

        alerts.close();

        async function DatosUnoaUnoUsuarios(row) {
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                alerts.load();
                const req = row.estado
                const res = await db.consultaTmpUsuarios(ua, req);
                el.tblDetalleUsuariosLogin.bootstrapTable("destroy").bootstrapTable({
                    data: res,
                    search: true,
                    pagination: true,
                    columns: [{
                        field: 'documento',
                        title: 'Documento',
                        align: 'center'
                    }, {
                        field: 'idApp',
                        title: 'Id App',
                        align: 'center'
                    }, {
                        field: 'nombreApp',
                        title: 'Nombre App',
                        align: 'center'
                    }, {
                        field: 'fechaInicio',
                        title: 'Fecha Inicio',
                        align: 'center'
                    }, {
                        field: 'estado',
                        title: 'Estado',
                        align: 'center',
                        cellStyle: (value, row, index) => {
                            if (row.estado === 'No Valido') {
                                return {
                                    classes: 'text-danger font-weight-bold'
                                }
                            } else {
                                return {
                                    classes: 'text-info font-weight-bold'
                                }
                            }
                        }
                    }, {
                        field: 'observaciones',
                        title: 'Comentario',
                        align: 'center'
                    }]
                })

                alerts.close();
            }
        }

        async function descargarSelectedUser(row) {
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                alerts.load();
                const req = row.estado
                const res = await db.consultaTmpUsuarios(ua, req);
                var headers = ['id', 'userApp', 'documento', 'idApp', 'nombreApp', 'fechaInicio', 'estado', 'observaciones'];
                var data = [];
                var nomFile = 'detalle' + req + '.xlsx';
                data.push(headers);
                res.map(e => data.push([e.id, e.userApp, e.documento, e.idApp, e.nombreApp, e.fechaInicio, e.estado, e.observaciones]))
                var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
                XLSX.utils.book_append_sheet(wb, ws, req);
                XLSX.writeFile(wb, nomFile);
                alerts.close();
            }
        }

        el.btnEjecutaformUsuariosLogin = document.getElementById('btnEjecutaTmpUsuarios');

        el.btnEjecutaformUsuariosLogin.addEventListener('click', async (e) => {
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                alerts.confirm("¿Continúo?").then(async (e) => {
                    if (e.value === true) {
                        alerts.load();
                        const res = await db.ejecutaTmpUsuario(ua);
                        if (res[0].res == 'ok') {
                            alerts.saveReload();
                        } else {
                            alerts.errorReload('Error al guardar');
                        }
                    }
                })
            }
        })


    }

}

