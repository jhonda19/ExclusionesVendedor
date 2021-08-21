// import jquery from 'jquery';
// window.$ = window.jQuery = jquery;
import { Database } from '../db/dbUpload.js';
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
    formUpload: document.querySelector('#formUpload'),
    XlsGuiaInformativa: document.querySelector('#XlsGuiaInformativa'),
    btnXlsGuiaInformativa: document.querySelector('#btnXlsGuiaInformativa'),
}


export class uploadData {

    async inicioUpload() {
        this.cargarBaseApp();
    }

    cargarBaseApp() {
        el.XlsGuiaInformativa.addEventListener('change', (e) => {
            nprogress.start();
            const nomxls = XlsGuiaInformativa.files[0].name;
            if (nomxls === 'PlantillaCargue_GuiaInfo.xlsx') {
                el.XlsGuiaInformativa.nextElementSibling.innerText = el.XlsGuiaInformativa.files[0].name;
                var reader = new FileReader()
                reader.readAsArrayBuffer(e.target.files[0]);

                reader.onload = (e) => {
                    let data = new Uint8Array(reader.result);
                    let wb = XLSX.read(data, { type: 'array', cellDates: true, blankrows: true })
                    let ws = wb.Sheets['GuiaInformativa'];
                    if (typeof ws === 'undefined') {
                        alerts.error('No se encontró la hoja "GuiaInformativa"')
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
        } else if (data.length > 0 && data.length < 2001) {
            this.almacenaBase(data)
        } else {
            alerts.errorReload('El libro supera los 2.000 registros');
        }

    }

    almacenaBase(datos) {
        el.btnXlsGuiaInformativa.disabled = false;
        el.btnXlsGuiaInformativa.addEventListener('click', async (e) => {
            el.btnXlsGuiaInformativa.disabled = true;
            el.XlsGuiaInformativa.disabled = true;
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                el.btnXlsGuiaInformativa.disabled = true;
                // Prepara Datos
                let info = [...datos];
                let cantInfo = info.length;
                const d = await ap.creaPaquetes(info, 1000);
                const enviar = []
                d.map(x => enviar.push(x.map(
                    e => `&BU:${e.BU} &Proceso:${e.Proceso} &Flujo_1:${e.Flujo_1} &Flujo_2:${e.Flujo_2} &Flujo_3:${e.Flujo_3} &Flujo_4:${e.Flujo_4} &Flujo_5:${e.Flujo_5} &Flujo_6:${e.Flujo_6} &|`
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
                        const res = await db.almacenaTmpData(ua, e, send)
                        if (res[0].res === 'ok') {
                            carga += 1;
                            if (paq == carga) {
                                const resProcess = await db.procesaTmpData(ua)
                                if (resProcess[0].res === 'ok') {
                                    alerts.saveReload();
                                    nprogress.done();
                                } else {
                                    alerts.errorReload('Error al guardar, algo no esta bien con los datos.'); 
                                }
                                // $('#modalResCargueMalla').modal('show');
                                // this.resTblValidacion(resProcess)
                               
                            }
                        } else { alerts.errorReload(res[0].ErrorMessage); }
                    });
                }
            }
        })
    }

}