export class Database {
    /*LOGIN*/
    async login(user, pass) {
        let data = new FormData();
        data.append('iniUser', user);
        data.append('pass', pass);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;

    }

    async global(i, p, n) {
        let data = new FormData();
        data.append('idUser', i);
        data.append('pUser', p);
        data.append('nUser', n);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }

    async logout() {
        let data = new FormData();
        data.append('logout', 0);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }

    async validarFormDoc(a) {
        let data = new FormData();
        data.append('validarFormDoc', a);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }

    async validarFormUser(a, b) {
        let data = new FormData();
        data.append('doc', b);
        data.append('validarFormUser', a);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }

    async validarFormContrato(a, b, c) {
        let data = new FormData();
        data.append('doc', b);
        data.append('user', a);
        data.append('validarFormContrato', c);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }

    async restorePass(Inrid, Inriu, Inric, Inpass) {
        let data = new FormData();
        data.append('Inrid', Inrid);
        data.append('Inriu', Inriu);
        data.append('Inric', Inric);
        data.append('Inpass', Inpass);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }

    /* USER APP*/

    async searchId(a) {
        let data = new FormData();
        data.append('docUserApp', a);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }

    async listViewsApp(a) {
        let data = new FormData();
        data.append('listViewsApp', a);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }

    async saveUser(a, b, c) {
        let data = new FormData();
        data.append('savUsId', a);
        data.append('savUsPer', b);
        data.append('savUsApp', c);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }

    async validarLs(valiUser, valiPerfil) {
        let data = new FormData();
        data.append('valiUser', valiUser);
        data.append('valiPerfil', valiPerfil);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }

    async consultaUserVal(a) {
        let data = new FormData();
        data.append('validaUserACtivo', a);
        let response = await fetch('fetch/login.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return json;
    }
    

}