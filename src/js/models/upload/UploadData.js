// import jquery from 'jquery';
// window.$ = window.jQuery = jquery;
import { Database } from '../db/dbMallas.js';
import { AppController } from '../app/App.js';
import * as alerts from '../app/Alerts.js';
const XLSX = require('xlsx');
require('bootstrap-table');
import nprogress, * as NProgress from 'nprogress/nprogress.js';
NProgress.configure({ showSpinner: true, rickleRate: 0.01, trickleSpeed: 1100 });
// var moment = require('moment-timezone');

const db = new Database();
const ap = new AppController();

const el = {

    // Botones de Inicio y Fin Gestión
    formTurnoProgramado: document.querySelector('#formTurnoProgramado'),
    XlsTurnoProgramado: document.querySelector('#XlsTurnoProgramado'),
    btnXlsTurnoProgramado: document.querySelector('#btnXlsTurnoProgramado'),


    // // tbl
    tblResMallasVali: $('#tblResMallasVali'),

    // btns
    btnCloseModal: document.querySelector('#btnCloseModal'),
    btnSaveManage: document.querySelector('#btnSaveManage'),
}


export class adminTurnoProgramado {

    async inicioTurnoProgramado() {
        this.cargarBaseApp();
        this.ejecutarTarea();

        el.btnCloseModal.addEventListener('click', () => {
            el.btnSaveManage.disabled = true
            el.btnCloseModal.disabled = true
            alerts.CancelarReload()
        })
    }

    cargarBaseApp() {
        el.XlsTurnoProgramado.addEventListener('change', (e) => {
            nprogress.start();
            const nomxls = XlsTurnoProgramado.files[0].name;
            if (nomxls === 'PlantillaCargueMallas.xlsx') {
                el.formTurnoProgramado.XlsTurnoProgramado.nextElementSibling.innerText = el.formTurnoProgramado.XlsTurnoProgramado.files[0].name;
                var reader = new FileReader()
                reader.readAsArrayBuffer(e.target.files[0]);

                reader.onload = (e) => {
                    let data = new Uint8Array(reader.result);
                    let wb = XLSX.read(data, { type: 'array', cellDates: true, blankrows: true })
                    let ws = wb.Sheets['TurnoProgramado'];
                    if (typeof ws === 'undefined') {
                        alerts.error('No se encontró la hoja "TurnoProgramado"')
                        nprogress.done();;
                    } else {
                        nprogress.done();
                        this.xlsValidacion(XLSX.utils.sheet_to_json(ws, { header: 0, defval: "" }))
                    }
                }
            } else {
                alerts.error('Plantilla incorrecta!')
                nprogress.done();
            }
        })
    }

    xlsValidacion(data) {
        if (data.length === 0) {
            alerts.errorReload('El libro está vacío');
        } else if (data.length > 0 && data.length < 5001) {
            this.almacenaBase(data)
        } else {
            alerts.errorReload('El libro supera los 5.000 registros');
        }

    }

    almacenaBase(datos) {
        el.btnXlsTurnoProgramado.disabled = false;
        el.btnXlsTurnoProgramado.addEventListener('click', async (e) => {
            el.btnXlsTurnoProgramado.disabled = true;
            el.XlsTurnoProgramado.disabled = true;
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                el.btnXlsTurnoProgramado.disabled = true;
                // Prepara Datos
                let info = [...datos];
                let cantInfo = info.length;
                const d = await ap.creaPaquetes(info, 1000);
                const enviar = []
                d.map(x => enviar.push(x.map(
                    e => `&documento:${e.documento} &turnoAjustado:${e.turnoAjustado} &fechaEntrada:${ap.convertDate(e.fechaEntrada)} &horaEntrada:${ap.convertTime(e.horaEntrada)} &FechaSalida:${ap.convertDate(e.FechaSalida)} &horaSalida:${ap.convertTime(e.horaSalida)} &almuerzoInicio:${ap.convertTime(e.almuerzoInicio)} &almuerzoFin:${ap.convertTime(e.almuerzoFin)} &break1Inicio:${ap.convertTime(e.break1Inicio)} &break1Fin:${ap.convertTime(e.break1Fin)} &break2Inicio:${ap.convertTime(e.break2Inicio)} &break2Fin:${ap.convertTime(e.break2Fin)} &coaching1Inicio:${ap.convertTime(e.coaching1Inicio)} &coaching1Fin:${ap.convertTime(e.coaching1Fin)} &coaching2Inicio:${ap.convertTime(e.coaching2Inicio)} &coaching2Fin:${ap.convertTime(e.coaching2Fin)} &coaching3Inicio:${ap.convertTime(e.coaching3Inicio)} &coaching3Fin:${ap.convertTime(e.coaching3Fin)} &preTurnoInicio:${ap.convertTime(e.preTurnoInicio)} &preTurnoFin:${ap.convertTime(e.preTurnoFin)} &posTurnoInicio:${ap.convertTime(e.posTurnoInicio)} &|`
                ).join('')
                ));

                let carga = 0;
                let send = 0
                let paq = enviar.length
                nprogress.start();
                const ua = await alerts.userActivo();
                if (ua === false) {
                    alerts.errorReload('Tu sesión ha expirado!')
                } else {
                    enviar.map(async (e) => {
                        send += 1;
                        const res = await db.almacenaTmpMallas(ua, e, send)
                        if (res[0].res === 'ok') {
                            carga += 1;
                            if (paq == carga) {
                                const resProcess = await db.procesaTmpMallas(ua)
                                // console.log(resProcess)
                                $('#modalResCargueMalla').modal('show');
                                this.resTblValidacion(resProcess)
                                // alerts.save();
                                nprogress.done();
                            }
                        } else { alerts.errorReload(res[0].ErrorMessage); }
                    });
                }
            }
        })
    }

    resTblValidacion(resProcess) {
        window.operateEvents = {
            'click .likeDescargar': (e, value, row, index) => {
                descargarSelected(row);
            }
        }

        el.tblResMallasVali.bootstrapTable("destroy")
        el.tblResMallasVali.bootstrapTable({
            data: resProcess,
            columns: [{
                field: 'estado',
                title: 'Estado',
                align: 'center',
                cellStyle: (value, row, index) => {
                    if (row.estado === 'Incorrecto') {
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
                    if (row.estado === 'Incorrecto') {
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
                title: 'Descargar',
                align: 'center',
                events: window.operateEvents,
                formatter: (value, row, index) => { return '<a id="btnDescargar" type="button" class="likeDescargar"><i class="fas fa-download text-dark"></i> </a> ' }
            }]
        })


        async function descargarSelected(row) {
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                alerts.load();
                const req = row.estado
                const res = await db.consultaTmpMallasxEstado(ua, req);
                var headers = ['documento', 'fecha', 'turnoAjustado', 'nocturno', 'entrada', 'salida', 'almuerzoInicio', 'almuerzoFin', 'break1Inicio', 'break1Fin', 'break2Inicio', 'break2Fin', 'coaching1Inicio', 'coaching1Fin', 'coaching2Inicio', 'coaching2Fin', 'coaching3Inicio', 'coaching3Fin', 'preTurnoInicio', 'preTurnoFin', 'posTurnoInicio', 'estado', 'comentario'];
                var data = [];
                var nomFile = 'turnos' + req + '.xlsx';
                data.push(headers);
                res.map(e => data.push([e.documento, e.fecha, e.turnoAjustado, e.nocturno, e.entrada.replace('.000', ''), e.salida.replace('.000', ''), e.almuerzoInicio.replace('.0000000', ''), e.almuerzoFin.replace('.0000000', ''), e.break1Inicio.replace('.0000000', ''), e.break1Fin.replace('.0000000', ''), e.break2Inicio.replace('.0000000', ''), e.break2Fin.replace('.0000000', ''), e.coaching1Inicio.replace('.0000000', ''), e.coaching1Fin.replace('.0000000', ''), e.coaching2Inicio.replace('.0000000', ''), e.coaching2Fin.replace('.0000000', ''), e.coaching3Inicio.replace('.0000000', ''), e.coaching3Fin.replace('.0000000', ''), e.preTurnoInicio.replace('.0000000', ''), e.preTurnoFin.replace('.0000000', ''), e.posTurnoInicio.replace('.0000000', ''), e.estado, e.comentario]))
                var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
                XLSX.utils.book_append_sheet(wb, ws, req);
                XLSX.writeFile(wb, nomFile);
                alerts.close();
            }
        }



    }


    ejecutarTarea() {
        el.btnSaveManage.addEventListener('click', async (e) => {
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                alerts.load();
                el.btnSaveManage.disabled = true
                el.btnCloseModal.disabled = true
                const res = await db.ejecutaTmpMalla(ua);
                if (res[0].res === 'ok') {
                    alerts.saveReload();
                } else {
                    alerts.errorReload('Error al guardar!')
                }
            }
        })
    }





}