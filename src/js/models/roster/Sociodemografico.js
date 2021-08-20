// import jquery from 'jquery';
// window.$ = window.jQuery = jquery;
import { Database } from '../db/Database.js';
import { AppController } from '../app/App.js';
import * as alerts from '../app/Alerts.js';
const XLSX = require('xlsx');
import nprogress, * as NProgress from 'nprogress/nprogress.js';
NProgress.configure({ showSpinner: true, rickleRate: 0.01, trickleSpeed: 1100 });


const db = new Database();
const ap = new AppController();

const el = {

    // Botones de Inicio y Fin Gestión
    formSociodemografico: document.querySelector('#formSociodemografico'),
    XlsSociodemografico: document.querySelector('#XlsSociodemografico'),
    btnXlsSociodemografico: document.querySelector('#btnXlsSociodemografico'),


    // tbl
    tblBasesCargadas: $('#tblBasesCargadas'),
}


export class adminSociodemografico {

    async inicioSociodemografico() {
        this.cargarBaseApp();
        // this.consultaBases(0);
    }

    cargarBaseApp() {
        el.XlsSociodemografico.addEventListener('change', (e) => {
            nprogress.start();
            const nomxls = XlsSociodemografico.files[0].name;
            if (nomxls === 'PlantillaSociodemografico.xlsx') {
                el.formSociodemografico.XlsSociodemografico.nextElementSibling.innerText = el.formSociodemografico.XlsSociodemografico.files[0].name;
                var reader = new FileReader()
                reader.readAsArrayBuffer(e.target.files[0]);

                reader.onload = (e) => {
                    let data = new Uint8Array(reader.result);
                    let wb = XLSX.read(data, { type: 'array', cellDates: true, blankrows: true })
                    let ws = wb.Sheets['sociodemografico'];
                    if (typeof ws === 'undefined') {
                        alerts.error('No se encontró la hoja "sociodemografico"')
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
        } else if (data.length > 0 && data.length < 8001) {
            this.almacenaBase(data)
        } else {
            alerts.errorReload('El libro supera los 8.000 registros');
        }

    }

    almacenaBase(datos) {


        el.btnXlsSociodemografico.disabled = false;
        el.btnXlsSociodemografico.addEventListener('click', async (e) => {
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                const demoInicio = await db.sociodemograficoInicio()
                if (demoInicio[0].res === 'ok') {
                    el.btnXlsSociodemografico.disabled = true;
                    // Prepara Datos
                    let info = [...datos];
                    let cantInfo = info.length;
                    const d = this.creaPaquetes(info, 1000);
                    const enviar = []
                    d.map(x => enviar.push(x.map(
                        e => `&idEmpl:${e.idEmpl} &documento:${e.documento} &telefono:${e.telefono} &direccion:${e.direccion} &barrio:${e.barrio} &localidad:${e.localidad} &correo:${e.correo} &fechaNacimiento:${ap.convertDate(e.fechaNacimiento)} &wave:${e.wave} &correoCliente:${e.correoCliente} &turnoContratado:${e.turnoContratado} &nivelEstudio:${e.nivelEstudio} &profesion:${e.profesion} &semestresCursados:${e.semestresCursados} &estudiaActualmente:${e.estudiaActualmente} &fechaFinCertificadoEstudio:${ap.convertDate(e.fechaFinCertificadoEstudio)} &|`
                    ).join('')
                    ));

                    let carga = 0;
                    let paq = enviar.length
                    nprogress.start();
                    enviar.map(async (e) => {
                        const res = await db.sociodemograficoUpload(e)
                        if (res[0].res === 'ok') {
                            carga += 1;
                            if (paq == carga) {
                                // console.log('ok upload')
                                const res = await db.sociodemograficoProcess()
                                if (res[0].res == 'ok') {
                                    alerts.saveReload();
                                    nprogress.done();


                                    // console.log('ok process')
                                    // const res = await db.sociodemograficoSave()
                                    // if (res[0].res == 'ok') {
                                    //     // console.log('ok save')
                                    //     nprogress.done();
                                    //     alerts.saveReload();
                                    // } else { alerts.errorReload('No se guardaron los cambios'); }
                                } else { alerts.errorReload('Error en los datos'); }
                            } // fin total paquetes
                        } else { alerts.errorReload(res[0].ErrorMessage); }
                    });

                } else {
                    alerts.errorReload('Existe otra actualización en curso')
                }

            }
        })
    }

    creaPaquetes(data, tamano) {
        let paqTemp = 0
        let paquetes = []
        if (data.length == 1) {
            paquetes.push(data)
        } else {
            for (let i = 0; i < data.length + 1; i++) {
                const paq = []
                if (i == paqTemp +
                    tamano) {
                    for (let x = paqTemp; x < paqTemp + tamano; x++) {
                        paq.push(data[x])
                    }
                    paqTemp = i
                    paquetes.push(paq)
                } else if (data.length - paqTemp < tamano && data.length - paqTemp > 1) {
                    for (let x = paqTemp; x < data.length; x++) {
                        paq.push(data[x])
                    }
                    paqTemp = data.length
                    paquetes.push(paq)
                }
            }
        }
        return paquetes

    }

}