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
                           Información Roster
                        </div>
                        <div class="card-body">
                        <ul class="ml-4">
                            <li>No modifique la estructura de las plantillas de Excel.</li>
                            <li>Actualice las consultas de las plantillas de Excel antes de utilizarlas.</li>
                            <li>Consulte el roster actual antes de efectuar cambios..</li>
                            <li>Antes de carga información, verifique que los datos sean consistentes.</li>
                            
                        </ul>
                        </div>`
        el.welcomeInfo1.innerHTML = html1;
        alerts.close();
    }

}