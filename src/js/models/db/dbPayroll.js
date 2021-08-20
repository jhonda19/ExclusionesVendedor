export class Database {

    async ListQuincena() {
        let data = new FormData();
        data.append('listQuincenaPayroll', 0);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

    async ListpersonalAsignado(idUser) {
        let data = new FormData();
        data.append('idEmplUserPayroll', idUser);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

    async logActualiacionConexion(a) {
        let data = new FormData();
        data.append('logConexionesXCuenta', a);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }


    async consulPayrollEmpl(idEmpl, Q) {
        let data = new FormData();
        data.append('idEmplConsulPayroll', idEmpl);
        data.append('QuincenaPayrollConsulta', Q);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

    async consultaInfoEmpleado(idEmpl) {
        let data = new FormData();
        data.append('infoEmpleadoDoc', idEmpl);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

    async consultaCxDia(i, f) {
        let data = new FormData();
        data.append('infoConexionDiaEmpl', i);
        data.append('infoConexionDiaFecha', f);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

    async consultaCausalesAjusteCx() {
        let data = new FormData();
        data.append('causalesDeAjustesCx', 0);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }



    /* CONFIGURACIÓN PAYROLL */

    async consHabilitadorAjusActual(a) {
        let data = new FormData();
        data.append('unidadHabilitadorAjuste', a);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }


    async guardarDatosHA(u, m, c, fi, ff, ua) {
        let data = new FormData();
        data.append('guardarHAUnidad', u);
        data.append('guardarHAMes', m);
        data.append('guardarHACorte', c);
        data.append('guardarHAFhIni', fi);
        data.append('guardarHAFhFin', ff);
        data.append('guardarHAUserApp', ua);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

    async validaHA(u, f) {
        let data = new FormData();
        data.append('validaHAUnidad', u);
        data.append('validaHAFiAjuste', f);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

    async GSAjuste(data) {
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }


    /* GESTIONAR AJUSTE */

    async consultaAjustesPendientes(u,p) {
        let data = new FormData();
        data.append('ajustesPendiente_Unidad', u);
        data.append('ajustesPendiente_Nivel', p);
        let response = await fetch('fetch/payroll.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    } 












}