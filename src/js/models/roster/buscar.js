import { Database } from '../db/Database';
import * as alerts from '../app/Alerts.js';
const XLSX = require('xlsx');
const db = new Database();

const el = {
    inDoc: document.querySelector('#inDoc'),
    btnBuscarEmp: document.querySelector('#btnBuscarEmp'),
    datosModalResEmpl: document.querySelector('#datosModalResEmpl'),
    datosModalEditEmpl: document.querySelector('#datosModalEditEmpl'),
    inDocEmpl: '',
    inComenModifica: '',
    customCheck1: '',
    btnDeleteEmp: '',
    btnUpdateEmp: '',
    btnQuitarRetiroEmp: '',
}

export class busquedaEmpl {

    inicioBusquda() {
        // validar Campo
        el.btnBuscarEmp.addEventListener('click', () => {
            var doc = el.inDoc.value;
            if (doc.length > 0) {
                alerts.load();
                this.buscaDoc(doc);
            } else {
                alerts.error('Formulario Incompleto!')
            }
        })
    }

    async buscaDoc(a) {
        const res = await db.buscaDoc(a);
        if (res.length > 0) {
            this.infoModal(res);
        } else {
            alerts.error('Ups!! valida el documento.')
        }
    }

    infoModal(emp) {
        // console.log(emp)
        var html = `  <div class="col-lg-6 mt-3">
                        <label>Nombre</label>
                        <input type="text" class="form-control font-weight-bold" value="${emp[0].nombre}" disabled>
                    </div>
                    <div class="col-lg-6 mt-3">
                        <label>Cargo</label>
                        <input type="text" class="form-control font-weight-bold" value="${emp[0].cargo}" disabled>
                    </div>
                    <div class="col-lg-12 mt-3">
                        <label>Unidad - SubUnidad - LOB - Servicio</label>
                        <input type="text" class="form-control" value="${emp[0].unidad + ' - ' + emp[0].subunidad + ' - ' + emp[0].lob + ' - ' + emp[0].servicio}" disabled>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label>VHUR</label>
                        <input type="number" class="form-control" value="${emp[0].vhur}" disabled>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label>idMylink</label>
                        <input type="number" class="form-control" value="${emp[0].idmylink}" disabled>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label># Documento</label>
                        <input type="text" class="form-control font-weight-bold" id="inDocEmpl" value="${emp[0].documento}" disabled>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label>Fecha Contrato</label>
                        <input type="date" class="form-control" value="${emp[0].fechaContrato}" disabled>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label>Fecha Retiro</label>
                        <input type="date" class="form-control" value="${emp[0].fechaRetiro}" disabled>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label>Estado</label>
                        <input type="text" class="form-control font-weight-bold ${emp[0].estado === 'Activo' ? 'text-success' : 'text-danger'}" value="${emp[0].estado}" disabled>
                    </div>                 
                    <div class="col-lg-4 mt-3">
                        <label>Split Nómina</label>
                        <input type="text" class="form-control" value="${emp[0].splitNomina}" disabled>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label>Clase de Salario</label>
                        <input type="text" class="form-control font-weight-bold" value="${emp[0].claseSalario}" disabled>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label>Contrato Nómina</label>
                        <input type="text" class="form-control font-weight-bold ${emp[0].contratadoReal === 'Si' ? 'text-success' : 'text-danger'}"" value="${emp[0].contratadoReal}" disabled>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label>Site</label>
                        <input type="text" class="form-control font-weight-bold" value="${emp[0].site}" disabled>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label>Piso</label>
                        <input type="text" class="form-control font-weight-bold" value="${emp[0].piso}" disabled>
                    </div>
                    
                    <div class="col-lg-4 mt-3">
                        <label>Jefe Inmediato</label>
                        <input type="text" class="form-control" value="${emp[0].nombreJefe}" disabled>
                    </div>
                   
                    `

        el.datosModalResEmpl.innerHTML = html;
        $('#searchEmplModal').modal('show');

        this.validaAccesoEdit(emp[0].idEmplWf, emp[0].documento, emp[0].estado);
        alerts.close();


    }

    async validaAccesoEdit(a, b, c) {
        let p = await alerts.denc(localStorage.getItem('OLwfmPosicion'))
        p = p + '$OL_CO_GESTION'
        if (p === 'WFM$OL_CO_GESTION') {
            const editEmpl = ` <div class="col-lg-12 mt-5">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" value="1" id="customCheck1">
                                <label class="custom-control-label" for="customCheck1">Eliminar o actualizar empleado</label>
                            </div>
                        </div>
                        <div class="col-lg-12 mt-3">
                        <textarea id="inComenModifica" class="md-textarea form-control" rows="2" placeholder="Por favor indique claramente el motivo de la solicitud." disabled></textarea>
                        </div>
                        <div class="col-lg-12 mt-3 row">
                            <div class="p-3">
                            <button type="button" class="btn btn-danger btn-user" id="btnQuitarRetiroEmp" disabled>
                            <i class="fas fa-arrow-alt-circle-left"></i>&nbsp; Reversar Retiro</button>
                            </div>
                            <div class="p-3">
                            <button type="button" class="btn btn-danger btn-user" id="btnDeleteEmp" disabled>
                            <i class="fas fa-window-close"></i>&nbsp; Eliminar Empleado</button>
                            </div>
                            <div class="p-3">
                            <button type="button" class="btn btn-primary btn-user" id="btnUpdateEmp" disabled>
                            <i class="fas fa-save"></i>&nbsp; Actualizar Documento</button>
                            </div>
                        </div>`
            el.datosModalEditEmpl.innerHTML = editEmpl;
            el.customCheck1 = document.querySelector('#customCheck1');
            el.inComenModifica = document.querySelector('#inComenModifica');
            el.btnDeleteEmp = document.querySelector('#btnDeleteEmp');
            el.btnUpdateEmp = document.querySelector('#btnUpdateEmp');
            el.inDocEmpl = document.querySelector('#inDocEmpl');
            el.btnQuitarRetiroEmp = document.querySelector('#btnQuitarRetiroEmp');
            this.processEmp(a, b, c);

        }
    }

    processEmp(a, b, c) {
        el.customCheck1.addEventListener('change', () => {
            if (el.customCheck1.checked) {
                this.reversarRetiro(a, b, c);
                this.updateDocEmpl(a, b, c);
                this.deleEmpleado(a, b, c);
                el.btnDeleteEmp.disabled = false;
                el.btnUpdateEmp.disabled = false;
                c === 'Activo' ? el.btnQuitarRetiroEmp.disabled = true : el.btnQuitarRetiroEmp.disabled = false
                el.inDocEmpl.disabled = false;
                el.inComenModifica.disabled = false;
            } else {
                el.btnDeleteEmp.disabled = true;
                el.btnUpdateEmp.disabled = true;
                el.inDocEmpl.disabled = true;
                el.inComenModifica.disabled = true;
                el.btnQuitarRetiroEmp.disabled = true;
            }
        })

    }


    reversarRetiro(a, b, c) {
        el.btnQuitarRetiroEmp.addEventListener('click', async (e) => {
            var docNew = inDocEmpl.value;
            var coment = inComenModifica.value;
            var idEmpl = a;
            var docOld = b;
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                if (coment.length > 0) {
                    alerts.load();
                    const res = await db.btnQuitarRetiroSearchEmpl(ua, idEmpl, docOld, docNew, coment);
                    if (res[0].res === '1') {
                        alerts.save();
                        el.inDoc.value = ''
                        $('#searchEmplModal').modal('hide');
                    } else {
                        alerts.errorSave();
                        el.inDoc.value = ''
                        $('#searchEmplModal').modal('hide');
                    }
                } else {
                    alerts.error('Formulario incompleto!')
                }
            }
        })
    }

    updateDocEmpl(a, b, c) {
        el.btnUpdateEmp.addEventListener('click', async (e) => {
            var docNew = inDocEmpl.value;
            var coment = inComenModifica.value;
            var idEmpl = a;
            var docOld = b;
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                if (coment.length > 0 && docNew.length > 0) {
                    alerts.load();
                    const res = await db.btnUpdateSearchEmpl(ua, idEmpl, docOld, docNew, coment);
                    if (res[0].res === '1') {
                        alerts.save();
                        el.inDoc.value = ''
                        $('#searchEmplModal').modal('hide');
                    } else {
                        alerts.errorSave();
                        el.inDoc.value = ''
                        $('#searchEmplModal').modal('hide');
                    }
                } else {
                    alerts.error('Formulario incompleto!')
                }
            }
        })
    }

    deleEmpleado(a, b, c) {
        el.btnDeleteEmp.addEventListener('click', async (e) => {
            var docNew = inDocEmpl.value;
            var coment = inComenModifica.value;
            var idEmpl = a;
            var docOld = b;
            const ua = await alerts.userActivo();
            if (ua === false) {
                alerts.errorReload('Tu sesión ha expirado!')
            } else {
                if (coment.length > 0 && docNew.length > 0) {
                    alerts.load();
                    const res = await db.btnDeleteSearchEmpl(ua, idEmpl, docOld, docNew, coment);
                    if (res[0].res === '1') {
                        alerts.save();
                        el.inDoc.value = ''
                        $('#searchEmplModal').modal('hide');
                    } else {
                        alerts.errorSave();
                        el.inDoc.value = ''
                        $('#searchEmplModal').modal('hide');
                    }
                } else {
                    alerts.error('Formulario incompleto!')
                }
            }
        })
    }

}
