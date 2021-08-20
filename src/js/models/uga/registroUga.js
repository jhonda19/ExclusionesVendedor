import { Database } from '../db/dbUga.js';
import { AppController } from '../app/App.js';
import * as alerts from '../app/Alerts.js';
const XLSX = require('xlsx');

import * as NProgress from 'nprogress/nprogress.js';
import 'nprogress/nprogress.css';

const el = {
    formLic_Vac: document.getElementById('formLic_Vac'),
    xlsLic_Vac: '',
    btnCargaLic_Vac: '',
    inputFileLicVac: document.getElementById('inputFileLicVac'),

}

const db = new Database();
const ap = new AppController();

export class gestionUGA {

    inicioUGA() {
        NProgress.configure({ showSpinner: false });
        this.TmpLic_vac();
    }

    /* REGISTRO DE NOEVDADES UGA */
    TmpLic_vac() {
        el.xlsLic_Vac = document.querySelector('#xlsLic_Vac');
        el.btnCargaLic_Vac = document.querySelector('#btnXlsLic_Vac');
        el.xlsLic_Vac.addEventListener('change', (e) => {
            const nomxls = xlsLic_Vac.files[0].name.substring(0, xlsLic_Vac.files[0].name.indexOf("_") + 1)
            const extXls = xlsLic_Vac.files[0].name.substring(((xlsLic_Vac.files[0].name.length) - 5), 100)
            if (nomxls === 'RegistroNovedadesUGA_' && extXls === '.xlsx') {
                NProgress.start({ showSpinner: false })
                el.xlsLic_Vac.nextElementSibling.innerText = el.xlsLic_Vac.files[0].name;
                var reader = new FileReader()
                reader.readAsArrayBuffer(e.target.files[0]);
                reader.onload = (e) => {
                    let data = new Uint8Array(reader.result);
                    let wb = XLSX.read(data, { type: 'array', cellDates: true, blankrows: true })
                    let ws = wb.Sheets['ConsolidadoNovedades'];
                    if (typeof ws === 'undefined') {
                        this.resetInputFile_LicVaca()
                        alerts.error('No se encontró la hoja "Lic_Vac"');
                        NProgress.done();
                    } else {

                        this.almacenaTmpLic_vac(XLSX.utils.sheet_to_json(ws, { header: 0, defval: "" }))
                        NProgress.done();
                    }
                }
            } else {
                this.resetInputFile_LicVaca()
                alerts.error('Plantilla incorrecta!')
                NProgress.done();
            }
        })
    }

    resetInputFile_LicVaca() {
        el.xlsLic_Vac.remove()
        const html = ` <div class="custom-file col-sm-6 mt-3">
                            <input id="xlsLic_Vac" class="custom-file-input" type="file" name="xlsLic_Vac">
                            <label for="xlsLic_Vac" class="custom-file-label">Seleccionar Excel...</label>
                        </div>
                        <div class="col-sm-3 mt-3">
                            <button id="btnXlsLic_Vac" class="btn btn-primary btn-sm btn-block" type="button" data-toggle="modal" data-target="" disabled>
                                <i class="fas fa-cloud-upload-alt"></i>
                        </div>
                        <div class="col-3">
                        </div>`
        el.inputFileLicVac.innerHTML = html;
        this.TmpLic_vac();
    }

    almacenaTmpLic_vac(data) {
        if (data.length === 0) {
            this.resetInputFile_LicVaca()
            alerts.error('El libro está vacío');
        } else if (data.length > 0 && data.length < 2501) {
            el.btnCargaLic_Vac.disabled = false;
            el.btnCargaLic_Vac.addEventListener('click', async (e) => {
                alerts.load();
                const ua = await alerts.userActivo();
                if (ua === false) {
                    this.resetInputFile_LicVaca()
                    alerts.error('Tu sesión ha expirado!')
                } else {
                    const datos = data.map(e => `&FECHA_DE_REPORTE:${ap.convertDate(e.FECHA_DE_REPORTE)} &CEDULA:${e.CEDULA} &TIPO_NOVEDAD:${e.TIPO_NOVEDAD} &FECHA_INICIO:${ap.convertDate(e.FECHA_INICIO)} &FECHA_FINAL:${ap.convertDate(e.FECHA_FINAL)} &DIAS:${e.DIAS} &|`).join('')
                    const res = await db.almacenaTmpNovedadUGA(ua, datos);
                    if (parseInt(res[0].ErrorNumber) > 0) {
                        this.resetInputFile_LicVaca()
                        alerts.error(res[0].ErrorMessage)
                    } else {
                        this.resetInputFile_LicVaca()
                        alerts.save();
                    }
                }
            })

        } else {
            this.resetInputFile_LicVaca()
            alerts.error('El libro supera los 2.500 registros');
        }


    }

}