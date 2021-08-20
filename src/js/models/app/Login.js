var bcrypt = require('bcryptjs');
var owasp = require('owasp-password-strength-test');


import { Database } from '../db/dbApp';
import * as alerts from '../app/Alerts.js';

const db = new Database();

const loginEl = {
    loginForm: document.querySelector('#loginForm'),
    inputUser: document.querySelector('#InputUser'),
    inputPassword: document.querySelector('#InputPassword'),
    btnLogin: document.querySelector('#loginBtn'),
}

export class Login {

    validaForm() {
        loginEl.inputUser.focus();
        loginEl.inputUser.addEventListener('change', (e) => {
            loginEl.inputPassword.addEventListener('focus', (e) => {
                loginEl.btnLogin.disabled = false;
            })
        })

        loginEl.btnLogin.addEventListener('click', async (e) => {
            const user = loginEl.inputUser.value
            const pass = loginEl.inputPassword.value
            if (user == '' || pass == '') {
                alerts.error('Formulario incompleto');
            } else {
                loginEl.btnLogin.disabled = true;
                alerts.load();
                const res = await db.login(user, pass);
                this.login(res, pass);
            }
        })

    }


    login(d, p) {
        const r = d[0].res
        if (r == 1) {
            const v = bcrypt.compareSync(p, d[0].contraseniaApp);
            if (v == true) {
                global(d, d[0].id, d[0].perfilApp, d[0].userRed);
            } else {
                alerts.error2('Contraseña incorrecta')
            }
        } else if (r == 0) {
            alerts.error2('Usuario incorrecto');
        }

        async function global(a, b, c, d) {
            const res = await db.global(b, c, d);
            if (res > 0) {
                alerts.cont2('Muy bien!');
                localStorage.setItem('OLwfmId', a[0].id);
                localStorage.setItem('OLwfmNombre', a[0].nombre);
                localStorage.setItem('OLwfmFeIngreso', a[0].fechaIngreso);
                localStorage.setItem('OLwfmEstado', a[0].estado);
                localStorage.setItem('OLwfmFeContra', a[0].fechaContrato);
                localStorage.setItem('OLwfmSexo', a[0].Sexo);
                localStorage.setItem('OLwfmUser', await alerts.enc(a[0].userRed));
                localStorage.setItem('OLwfmToken', a[0].tokenApp);
                localStorage.setItem('OLwfmPerfil', await alerts.enc(a[0].perfilApp));
                localStorage.setItem('OLwfmUnidad', await alerts.enc(a[0].unidad));
                localStorage.setItem('OLwfmCargo', a[0].cargo);
                localStorage.setItem('OLwfmPosicion', await alerts.enc(a[0].posicion));
                localStorage.setItem('OLwfmJerarquia', await alerts.enc(a[0].jerarquia));
                localStorage.setItem('OLwfmDocUser', await alerts.enc(a[0].documento));   
                localStorage.setItem('OLwfmAdminApp', await alerts.enc(a[0].adminApp));       
                
                
                setTimeout(() => {
                    location.href = "inicio";
                }, 2000);
            }

        }

    }



    formRestore() {
        const restoreEl = {
            ba1: document.querySelector('#basic-addon1'),
            ba2: document.querySelector('#basic-addon2'),
            ba3: document.querySelector('#basic-addon3'),
            ba4: document.querySelector('#basic-addon4'),
            restoreForm: document.querySelector('#restoreForm'),
            restoreInputDoc: document.querySelector('#restoreInputDoc'),
            restoreInputUser: document.querySelector('#restoreInputUser'),
            restoreInputContrato: document.querySelector('#restoreInputContrato'),
            restoreInputPass: document.querySelector('#restoreInputPass'),
            btnRestoreLogin: document.querySelector('#btnRestoreLogin'),
        }
        let a = 0, b = 0, c = 0
        const load = (` <span class="input-group-text mt-2">
                        <div class="spinner-border spinner-border-sm text-muted" role="status"></div>
                        </span>`);
        const htmlOk = (`<span class="input-group-text mt-2 bg-success">
                            <i class="fas fa-check text-white"></i>
                        </span>`);
        const htmlErr = (`<span class="input-group-text mt-2 bg-danger">
                            <i class="fas fa-times text-white"></i>
                        </span>`);

        restoreEl.restoreInputDoc.addEventListener('change', async (e) => {
            setTimeout(() => {
                restoreEl.restoreInputPass.disabled = false;
            }, 4000);
            restoreEl.ba1.innerHTML = load;
            restoreEl.restoreInputUser.value = '';
            restoreEl.restoreInputContrato.value = '';
            const rid = restoreEl.restoreInputDoc.value
            const vi = await db.validarFormDoc(rid);
            const res = vi[0].res
            if (res === '1') {
                restoreEl.ba1.innerHTML = htmlOk;
                a = 1;
            } else {
                restoreEl.ba1.innerHTML = htmlErr;
                a = 0
            }
        })

        restoreEl.restoreInputUser.addEventListener('change', async (e) => {
            restoreEl.ba2.innerHTML = load;
            restoreEl.restoreInputContrato.value = '';
            const rid = restoreEl.restoreInputDoc.value
            const riu = restoreEl.restoreInputUser.value
            const vi = await db.validarFormUser(riu, rid);
            const res = vi[0].res
            if (res === '1') {
                restoreEl.ba2.innerHTML = htmlOk;
                b = 1;
            } else {
                restoreEl.ba2.innerHTML = htmlErr;
                b = 0
            }
        })

        restoreEl.restoreInputContrato.addEventListener('change', async (e) => {
            restoreEl.ba3.innerHTML = load;
            const rid = restoreEl.restoreInputDoc.value
            const riu = restoreEl.restoreInputUser.value
            const ric = restoreEl.restoreInputContrato.value
            const vi = await db.validarFormContrato(riu, rid, ric);
            const res = vi[0].res
            if (res === '1') {
                restoreEl.ba3.innerHTML = htmlOk;
                c = 1;
            } else {
                restoreEl.ba3.innerHTML = htmlErr;
                c = 0
            }
        })

        owasp.config({
            allowPassphrases: true,
            maxLength: 30,
            minLength: 6,
            minPhraseLength: 10,
            minOptionalTestsToPass: 4,
        });


        restoreEl.restoreInputPass.addEventListener('keydown', async (e) => {
            let p = restoreEl.restoreInputPass.value
            var result = owasp.test(p);
            if (result.strong == true) {
                restoreEl.ba4.innerHTML = htmlOk;
                restoreEl.btnRestoreLogin.disabled = false;
            } else {
                restoreEl.ba4.innerHTML = htmlErr;
                restoreEl.btnRestoreLogin.disabled = true;
            }
        })


        restoreEl.btnRestoreLogin.addEventListener('click', async (e) => {
            alerts.load();
            let p = restoreEl.restoreInputPass.value
            var result = owasp.test(p);
            if (result.strong == true && (a + b + c) == 3) {
                const Inrid = restoreEl.restoreInputDoc.value
                const Inriu = restoreEl.restoreInputUser.value
                const Inric = restoreEl.restoreInputContrato.value
                const p = restoreEl.restoreInputPass.value
                var salt = bcrypt.genSaltSync(10);
                var Inpass = bcrypt.hashSync(p, salt);
                const res = await db.restorePass(Inrid, Inriu, Inric, Inpass);
                if (res[0].res == '1') {
                    alerts.saveReload();
                } else {
                    alerts.error();
                }
            } else {
                alerts.error2('Datos incorrectos')
            }
        })






    }


}