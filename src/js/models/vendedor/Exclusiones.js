import { Vendedor } from '../db/dbVendedor.js';
import { AppController } from '../app/App.js';
import * as alerts from '../app/Alerts.js';

import nprogress, * as NProgress from 'nprogress/nprogress.js';
NProgress.configure({ showSpinner: true, rickleRate: 0.01, trickleSpeed: 1100 });
// var moment = require('moment-timezone');

const db = new Vendedor();
const ap = new AppController();

const el = {

    // Botones de Inicio y Fin Gestión
    // formUpload: document.querySelector('#formUpload'),
    // XlsGuiaInformativa: document.querySelector('#XlsGuiaInformativa'),
    // btnXlsGuiaInformativa: document.querySelector('#btnXlsGuiaInformativa'),
}

var BU = 'Vendedor', Proceso = 'Exclusiones'

export class GuiaExclusiones {

    async inicioExclusiones() {
        console.log('listo')
        this.qryFLujo1();
    }

    async qryFLujo1(){
        const res = await db.qryFLujo1(BU,Proceso)
        console.log(res);
    }

   
}