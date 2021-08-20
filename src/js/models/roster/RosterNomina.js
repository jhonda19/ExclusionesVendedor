import { Database } from '../db/Database';
import * as alerts from '../app/Alerts.js';
import { AppController } from '../app/App.js';
const XLSX = require('xlsx');
require('bootstrap-table');

const el = {
    tblRosterNomina: $('#tblPlantillaEmpleado'),
    tblDetalleRosterNomina: $('#tblDetalleValidacion'),
    formRosterNomina: document.getElementById('formRosterNomina'),
    selectRosterNomina: document.getElementById('selectRosterNomina'),
    xlsRosterNomina: document.getElementById('xlsRosterNomina'),
    btnCargaRosterNomina: document.getElementById('btnXlsRosterNomina'),
    infoResultado: document.getElementById('info'),
    btnEjecutaformRosterNomina: '',
    btnDownloadTmpFinal: '',
    infoModal: document.getElementById('infoModal'),
    infoModal2: document.getElementById('infoModal2'),
    progreso: document.getElementById('progreso'),
    infoActualizacion: document.getElementById('infoActualizacion'),
    infoActualizacionHis: document.getElementById('infoActualizacionHis'),
    bar: '',
}

const db = new Database();
const ap = new AppController();

export class rosterNomina {

    inicio() {
        setInterval(() => {
            valida();
        }, 1000);
        async function valida() {
            let infoUpdate = '';
            const res = await db.rosterNominaActivoInfo()
            if (res[0].valor == '1') {
                infoUpdate = (`<h3 class="card-title text-danger font-weight-bold"><i class="fas fa-sync-alt"></i>&nbsp;Actualización en Curso</h3>
                                <h4 class="card-subtitle text-dark">${res[0].fh_update}</h4>`);
                el.infoActualizacion.innerHTML = infoUpdate;
                infoActualizacion
            } else {
                infoUpdate = (`<h3 class="card-title text-dark font-weight-bold"><i class="fas fa-info-circle text-primary"></i>&nbsp;Última Actualización</h3>
                                <h4 class="card-subtitle text-dark">${res[0].fh_update}</h4>`);
                el.infoActualizacion.innerHTML = infoUpdate;
            }

        }

        async function his() {
            let data = ''
            const res = await db.historicoUpdate()
            data = res.map((e) => `<div class="card border-left-info mt-2">
            <h5 class="ml-1 text-justify text-dark font-weight-bold"> Usuario: <span class="h5 text-muded"> ${e.userApp}</span></h5>
            <h5 class="ml-2 text-justify text-dark font-weight-bold"> Fecha de la solicitud: <span class="h5 text-muded">${e.fhInicio}</span></h5>
            <h5 class="ml-2 text-justify text-dark font-weight-bold"> Cantidad registros: <span class="h5 text-muded">${e.cantidad}</span></h5>
            <h5 class="ml-2 text-justify text-dark font-weight-bold"> Gestión: <span class="h5 text-muded">${e.gestion}</span></h5>
            <h5 class="ml-2 text-justify text-dark font-weight-bold"> Estado: <span class="h5 font-weight-bold ${e.estado == 'completado' ? 'text-primary' : 'text-danger'}">${e.estado}</span></h5>
            </div>
        `).join('');
            el.infoActualizacionHis.innerHTML = data;

        }
        his();
    }


    cargaRosterNomina() {
        el.xlsRosterNomina.addEventListener('change', (e) => {
            const nomxls = xlsRosterNomina.files[0].name;
            if (nomxls === 'PlantillaRosterNomina.xlsx') {
                el.formRosterNomina.xlsRosterNomina.nextElementSibling.innerText = el.formRosterNomina.xlsRosterNomina.files[0].name;
                var reader = new FileReader()
                reader.readAsArrayBuffer(e.target.files[0]);
                reader.onload = (e) => {
                    let data = new Uint8Array(reader.result);
                    let wb = XLSX.read(data, { type: 'array', cellDates: true, blankrows: true })
                    let ws = wb.Sheets['rosterNomina'];
                    if (typeof ws === 'undefined') {
                        alerts.error('No se encontró la hoja "rosterNomina"');
                    } else {
                        this.almacenaRosterNomina(XLSX.utils.sheet_to_json(ws, { header: 0, defval: "" }))
                    }
                }
            } else { alerts.error('Plantilla incorrecta!') }
        })
    }

    almacenaRosterNomina(datos) {

        let gestion = '';
        el.selectRosterNomina.disabled = false;
        el.selectRosterNomina.addEventListener('change', async (e) => {
            el.btnCargaRosterNomina.disabled = false;
            gestion = selectRosterNomina.value;
        })
        el.btnCargaRosterNomina.addEventListener('click', async (e) => {
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {

                // Prepara Inicio front
                el.btnCargaRosterNomina.disabled = true;
                el.selectRosterNomina.disabled = true;
                el.xlsRosterNomina.disabled = true;
                const prog = (`<div id="bar" class="progress-bar progress-bar-striped active bg-success progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 5%"></div>`);
                el.progreso.classList.add('progress');
                el.progreso.innerHTML = prog;
                el.bar = document.getElementById('bar');

                // Prepara Datos
                let info = [...datos];
                let cantInfo = info.length;
                const d = this.creaPaquetes(info, 1000);
                const enviar = []
                d.map(x => enviar.push(x.map(
                    e => `&empresa:${e.empresa} &site:${e.site} &tipoId:${e.tipoId} &cedula:${e.cedula} &vhur:${e.vhur} &nombreApellido:${e.nombreApellido} &estadoEmpleado:${e.estadoEmpleado} &split:${e.split} &claseSalario:${e.claseSalario} &fechaIngreso:${ap.convertDate(e.fechaIngreso)} &fechaRetiro:${ap.convertDate(e.fechaRetiro)} &motivoRetiro:${e.motivoRetiro} &idMylink:${e.idMylink} &|`
                ).join('')
                ));
                let carga = 0;
                let paq = enviar.length
                const res = await db.rosterNominaInicio()
                if (res[0].res === 'ok') {
                    enviar.map(async (e) => {
                        const res = await db.rosterNominaUpload(e)
                        if (res[0].res === 'ok') {
                            carga += 1;
                            let avance = (((carga / paq) * 0.5) * 100) + '%';
                            el.bar.style.width = avance;
                            if (paq == carga) {
                                const res = await db.rosterNominaLog(ua, paq, cantInfo, gestion)
                                if (res[0].res == 'ok') {
                                    el.bar.style.width = '75%';
                                    const res = await db.rosterNominaProcess()
                                    if (res[0].res == 'ok') {

                                        if (gestion == 'Nómina') {
                                            const res = await db.rosterNominaUpdate(ua)
                                            if (res[0].res == 'ok') {
                                                el.bar.style.width = '100%';
                                                alerts.saveReload();
                                            } else { alerts.errorReload(res[0].ErrorMessage); }

                                        } else if (gestion == 'IdMylink') {
                                            const res = await db.rosterNominaMylink(ua)
                                            if (res[0].res == 'ok') {
                                                el.bar.style.width = '100%';
                                                alerts.saveReload();
                                            } else { alerts.errorReload(res[0].ErrorMessage); }

                                        } else if (gestion == 'Retiro') {
                                            const res = await db.rosterNominaRetiro(ua)
                                            if (res[0].res == 'ok') {
                                                el.bar.style.width = '100%';
                                                alerts.saveReload();
                                            } else { alerts.errorReload(res[0].ErrorMessage); }

                                        } else {
                                            alerts.errorReload('Gestión inconrrecta: ' + gestion);
                                        }

                                    } else { alerts.errorReload('Error en los datos'); }
                                } else { alerts.errorReload(res[0].ErrorMessage); }
                            } // fin total paquetes
                        } else { alerts.errorReload(res[0].ErrorMessage); }
                    });

                } else if (res[0].res === 'process') {
                    alerts.errorReload('Ups! Hay una actualización en curso.');
                } else {
                    alerts.errorReload('No se logró establecer la conexión');
                }
            }
        })
    }

    finFront() {
        // Prepara Fin del Front
        el.progreso.classList.add('animate__animated', 'animate__flipOutX');
        el.progreso.addEventListener('animationend', () => {
            el.progreso.remove();
        });
        el.xlsRosterNomina.disabled = false;
        // pendiente limpiar input file 
        el.formRosterNomina.reset();
        el.xlsRosterNomina.reset();
        el.selectRosterNomina.reset();
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

    // tabla resumen

}