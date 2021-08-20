import { Database } from '../db/Database.js';
import { AppController } from '../app/App.js';
import * as alerts from '../app/Alerts.js';
const XLSX = require('xlsx');
require('bootstrap-table');
const el = {
    tblEmpleados: $('#tblPlantillaEmpleado'),
    tblDetalleEmpleados: $('#tblDetalleValidacion'),
    formEmpleados: document.getElementById('formEmpleados'),
    xlsEmpleados: document.getElementById('xlsEmpleados'),
    btnCargaEmpleados: document.getElementById('btnXlsEmpleados'),
    infoResultado: document.getElementById('info'),
    btnEjecutaTmpEmpleado: '',
    btnDownloadTmpFinal: '',
    infoModal: document.getElementById('infoModal'),
    infoModal2: document.getElementById('infoModal2'),
}

const db = new Database();
const ap = new AppController();

export class empleados {

    TmpEmpleado() {
        el.xlsEmpleados.addEventListener('change', (e) => {
            const nomxls = xlsEmpleados.files[0].name.substring(0, xlsEmpleados.files[0].name.indexOf("_") + 1)
            const extXls = xlsEmpleados.files[0].name.substring(((xlsEmpleados.files[0].name.length) - 5), 100)
            if (nomxls === 'PlantillaEmpleado_' && extXls === '.xlsx') {
                el.formEmpleados.xlsEmpleados.nextElementSibling.innerText = el.formEmpleados.xlsEmpleados.files[0].name;
                var reader = new FileReader()
                reader.readAsArrayBuffer(e.target.files[0]);
                reader.onload = (e) => {
                    let data = new Uint8Array(reader.result);
                    let wb = XLSX.read(data, { type: 'array', cellDates: true, blankrows: true })
                    let ws = wb.Sheets['Empleados'];
                    if (typeof ws === 'undefined') {
                        alerts.errorReload('No se encontró la hoja "Empleados"');
                    } else {
                        this.almacenaTmp(XLSX.utils.sheet_to_json(ws, { header: 0, defval: "" }))
                    }
                }
            } else { alerts.error('Plantilla incorrecta!') }
        })
    }

    almacenaTmp(data) {
        if (data.length === 0) {
            alerts.errorReload('El libro está vacío');
        } else if (data.length > 0 && data.length < 1501) {
            el.btnCargaEmpleados.disabled = false;
            el.btnCargaEmpleados.addEventListener('click', async (e) => {
                alerts.load();
                const ua = await alerts.userActivo();
                if (ua === false) {
                    alerts.errorReload('Tu sesión ha expirado!')
                } else {
                    const datos = data.map(e => `&vhur:${e.vhur} &idMylink:${e.idMylink} &tipoId:${e.tipoId} &documento:${e.documento} &documentoJefe:${e.documentoJefe} &cuentaEmpleado:${e.cuentaEmpleado} &cargoEmpleado:${e.cargoEmpleado} &cargoEjecutadoEmpleado:${e.cargoEjecutadoEmpleado} &site:${e.site} &piso:${e.piso} &FechaInicio:${ap.convertDate(e.FechaInicio)} &fechaContrato:${ap.convertDate(e.fechaContrato)} &sexo:${e.sexo} &nombre:${e.nombre} &modeloTrabajo:${e.modeloTrabajo} &split:${e.split} &claseSalario:${e.claseSalario} &|`).join('')
                    const res = await db.almacenaTmpEmpleados(ua, datos);
                    if (parseInt(res[0].ErrorNumber) > 0) {
                        alerts.errorReload(res[0].ErrorMessage)
                    } else {
                        this.datosTmp(res);
                    }
                }
            })

        } else {
            alerts.errorReload('El libro supera los 1.500 registros');
        }

    }

    datosTmp(res) {
        el.formEmpleados.classList.add('animate__animated', 'animate__flipOutX');
        el.formEmpleados.addEventListener('animationend', () => {
            el.formEmpleados.remove();
        });
        window.operateEvents = {
            'click .like': (e, value, row, index) => {
                DatosUnoaUno(row);
            },

            'click .likeDescargar': (e, value, row, index) => {
                descargarSelected(row);
            }



        }
        el.tblEmpleados.bootstrapTable("destroy")
        el.tblEmpleados.bootstrapTable({
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
                formatter: (value, row, index) => { return '<a id="btnDetalle" type="button" class="like"><i class="fas fa-eye text-dark"></i> </a> ' }
            }, {
                title: 'Descargar',
                align: 'center',
                events: window.operateEvents,
                formatter: (value, row, index) => { return '<a id="btnDescargar" type="button" class="likeDescargar"><i class="fas fa-download text-dark"></i> </a> ' }
            }]
        })

        const ejec = (`<p class="text-left"><i class="fas fa-info-circle text-dark"></i>&nbsp;Solo serán procesados los registros válidos.</p>
                <p class="text-left mt-2"><i class="fas fa-info-circle text-dark"></i> La validación de los datos se realizó con base a las consideraciones establecidas.&nbsp; | <a href="" data-toggle="modal" data-target="#exampleModalLong" style="color:#2980b9"><b>Consultar</b></a>
                </p>
                <div class="row mt-5">
                <div class="col-5">
                <button id="" class="btn btn-danger btn-sm btn-block" type="button" onclick="window.location.href='empleados';">
                <i class="fas fa-arrow-left text-white"></i> Volver
                </button> 
                </div>
                <div class="col-1">
                </div>
                <div class="col-5">
                <button id="btnEjecutaTmpEmpleado" class="btn btn-primary btn-sm btn-block" type="button">
                <i class="fas fa-check-circle text-white"></i> Continuar
                </button>
                </div>
                </div>`);
        el.infoResultado.innerHTML = ejec;
        alerts.close();

        async function DatosUnoaUno(row) {
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                alerts.load();
                const req = row.estado
                const res = await db.consultaTmpEmpleados(ua, req);
                el.tblDetalleEmpleados.bootstrapTable("destroy").bootstrapTable({
                    data: res,
                    search: true,
                    pagination: true,
                    columns: [{
                        field: 'documento',
                        title: 'Documento',
                        align: 'center'
                    }, {
                        field: 'documentoJefe',
                        title: 'Documento Jefe',
                        align: 'center'
                    }, {
                        field: 'FechaCambios',
                        title: 'Fecha Cambios',
                        align: 'center'
                    }, {
                        field: 'fechaInicioOperacion',
                        title: 'Fecha Inicio',
                        align: 'center'
                    }, {
                        field: 'cuentaEmpleado',
                        title: 'Cuenta',
                        align: 'center'
                    }, {
                        field: 'cargoEmpleado',
                        title: 'Cargo',
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
                        field: 'comentario',
                        title: 'Comentario',
                        align: 'center'
                    }]
                })
                alerts.close();
            }
        }


        async function descargarSelected(row) {
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                alerts.load();
                const req = row.estado
                const res = await db.consultaTmpEmpleados(ua, req);
                var headers = ['id', 'userApp', 'vhur', 'idMylink', 'tipoId', 'documento', 'documentoJefe', 'cuentaEmpleado', 'cargoEmpleado', 'cargoEjecutadoEmpleado', 'site', 'piso', 'FechaCambios', 'fechaInicioOperacion', 'sexo', 'nombre', 'modeloTrabajo', 'split', 'claseSalario', 'estado', 'comentario', 'ejecuta'];
                var data = [];
                var nomFile = 'detalle' + req + '.xlsx';
                data.push(headers);
                res.map(e => data.push([e.id, e.userApp, e.vhur, e.idMylink, e.tipoId, e.documento, e.documentoJefe, e.cuentaEmpleado, e.cargoEmpleado, e.cargoEjecutadoEmpleado, e.site, e.piso, e.FechaCambios, e.fechaInicioOperacion, e.sexo, e.nombre, e.modeloTrabajo, e.split, e.claseSalario, e.estado, e.comentario, e.ejecuta]))
                var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
                XLSX.utils.book_append_sheet(wb, ws, req);
                XLSX.writeFile(wb, nomFile);
                alerts.close();
            }
        }

        el.btnEjecutaTmpEmpleado = document.getElementById('btnEjecutaTmpEmpleado');
        el.btnEjecutaTmpEmpleado.addEventListener('click', async (e) => {
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                alerts.confirm("¿Continúo?").then(async (e) => {
                    if (e.value === true) {
                        alerts.load();
                        const res = await db.ejecutaTmpEmpleado(ua);
                        this.datosModal(res)
                        alerts.close();
                    }
                })
            }
        })
    }

    datosModal(res) {
        var modal = $('#modalResEjecuta');

        const datosModal = res.map(e => `
        ${e.ejecuta === 'Correcto' ? '<h3 class="font-weight-bold text-success"><i class="fas fa-check-circle text-dark"></i>&nbsp;' + e.ejecuta + ':&nbsp;' + e.cantidad + '</h3>'
                : '<h3 class="font-weight-bold text-danger"><i class="fas fa-x-circle text-dark"></i>&nbsp;' + e.ejecuta + ':&nbsp;' + e.cantidad + '</h3>'}        `).join('');

        modal.modal({ backdrop: 'static', keyboard: false })
        modal.find('.modal-title').text('Proceso Finalizado!')
        el.infoModal.innerHTML = datosModal;
        el.btnDownloadTmpFinal = document.getElementById('dfTmpEmpleados');

        
      
    }

    


}