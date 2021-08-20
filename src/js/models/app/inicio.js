import * as alerts from '../app/Alerts.js';

// import { configuraciones } from '../roster/configRoster';
const el = {
    welcomeInfo1: document.getElementById('welcomeInfo1'),
}
// const pa = new configuraciones();
export class inicioApp {

    home() {
        this.welcomeInfo();
    }

    async welcomeInfo() {
        const html1 = ` <div class="card-header">
                           Información
                        </div>
                        <div class="card-body">
                        <ul class="ml-4">
                            <li>Todas las actividades registradas en la aplicación estan siendo almacendas.</li>
                            <li>La administración del flujo de conocimiento esta acargo de los TL's</li>
                                                     
                        </ul>
                        </div>`
        el.welcomeInfo1.innerHTML = html1;
        alerts.close();
    }

}