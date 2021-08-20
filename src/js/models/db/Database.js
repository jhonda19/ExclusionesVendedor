export class Database {   

/*ROSTER*/
    async almacenaTmpEmpleados(u, d) {
        let data = new FormData();
        data.append('ua', u);
        data.append('almacenaTmpEmpleados', d);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async consultaTmpEmpleados(u, d) {
        let data = new FormData();
        data.append('ua', u);
        data.append('consultaTmpEmpleados', d);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async ejecutaTmpEmpleado(u) {
        let data = new FormData();
        data.append('ejecutaTmpEmpleado', u);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async rosterNominaInicio() {
        let data = new FormData();
        data.append('rosterNominaInicio', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async rosterNominaUpload(e) {
        let data = new FormData();
        data.append('rosterNominaUpload', e);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async rosterNominaLog(ua, paq, cant,ges) {
        let data = new FormData();
        data.append('ua', ua);
        data.append('paqrosterNominaLog', paq);
        data.append('cantrosterNominaLog', cant);
        data.append('gesRosterNomina', ges);       
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async rosterNominaProcess() {
        let data = new FormData();
        data.append('rosterNominaProcess', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async rosterNominaActivoInfo() {
        let data = new FormData();
        data.append('rosterNominaActivoInfo', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async historicoUpdate() {
        let data = new FormData();
        data.append('historicoUpdate', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }
    
    async rosterNominaUpdate(ua) {
        let data = new FormData();
        data.append('rosterNominaUpdate', ua);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }
    
    async rosterNominaMylink(ua) {
        let data = new FormData();
        data.append('rosterNominaMylink', ua);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async rosterNominaRetiro(ua) {
        let data = new FormData();
        data.append('rosterNominaRetiro', ua);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async almacenaTmpUsuariosLogin(u, d) {
        let data = new FormData();
        data.append('ua', u);
        data.append('almacenaTmpUsuariosLogin', d);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async consultaTmpUsuarios(u, d) {
        let data = new FormData();
        data.append('ua', u);
        data.append('consultaTmpUsuarios', d);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async ejecutaTmpUsuario(u) {
        let data = new FormData();
        data.append('ejecutaTmpUsuario', u);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }
    
    async listNegocios(unidad) {
        let data = new FormData();
        data.append('listNegocio', unidad);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }
    
    async listSplit() {
        let data = new FormData();
        data.append('listSplit', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async DatosSplit() {
        let data = new FormData();
        data.append('DatosSplit', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async listEmpresa() {
        let data = new FormData();
        data.append('listEmpresa', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async updateNegocio(id,uni,subu,lob,ser,split) {
        let data = new FormData();
        data.append('updateIdNeg', id);
        data.append('updateUni', uni);
        data.append('updateSubu', subu);
        data.append('updateLob', lob);
        data.append('updateSer', ser);
        data.append('updateSplit', split);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async deleteNegocio(id) {
        let data = new FormData();
        data.append('deleteIdNeg', id);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async nuevoNegocio(uni,subu,lob,ser,split) {
        let data = new FormData();
        data.append('nuevoUni', uni);
        data.append('nuevoSubu', subu);
        data.append('nuevoLob', lob);
        data.append('nuevoSer', ser);
        data.append('nuevoSplit', split);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async nuevoSplit(emp, split) {
        let data = new FormData();
        data.append('CrearSplitEmp', emp);
        data.append('CrearSplit', split);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async deleteSplit(id) {
        let data = new FormData();
        data.append('deleteSplit', id);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async updateCentroCosto(id, emp, split) {
        let data = new FormData();
        data.append('updCcId', id);
        data.append('updCcEmp', emp);
        data.append('updCcSplit', split);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async rpte1() {
        let data = new FormData();
        data.append('rpte1', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async rpte2() {
        let data = new FormData();
        data.append('rpte2', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async rpte3() {
        let data = new FormData();
        data.append('rpte3', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 


    async rpte5() {
        let data = new FormData();
        data.append('rpte5', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async rpte4(uni) {
        let data = new FormData();
        data.append('rpte4', uni);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async TotalRoster() {
        let data = new FormData();
        data.append('TotalRoster', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 
   
    async buscaDoc(a) {
        let data = new FormData();
        data.append('buscaDoc', a);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 

    async btnUpdateSearchEmpl(ua,idEmpl,docOld,docNew,coment) {
        let data = new FormData();
        data.append('uabtnUpdateSearchEmpl', ua);
        data.append('idEmplbtnUpdateSearchEmpl', idEmpl);
        data.append('docOldbtnUpdateSearchEmpl', docOld);
        data.append('docNewbtnUpdateSearchEmpl', docNew);
        data.append('comentbtnUpdateSearchEmpl', coment);
       
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    } 
    
    async btnDeleteSearchEmpl(ua, idEmpl, docOld, docNew, coment) {
        let data = new FormData();
        data.append('uabtnDeleteSearchEmpl', ua);
        data.append('idEmplbtnDeleteSearchEmpl', idEmpl);
        data.append('docOldbtnDeleteSearchEmpl', docOld);
        data.append('docNewbtnDeleteSearchEmpl', docNew);
        data.append('comentbtnDeleteSearchEmpl', coment);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async btnQuitarRetiroSearchEmpl(ua, idEmpl, docOld, docNew, coment) {
        let data = new FormData();
        data.append('uabtnQuitarRetiroSearchEmpl', ua);
        data.append('idEmplbtnQuitarRetiroSearchEmpl', idEmpl);
        data.append('docOldbtnQuitarRetiroSearchEmpl', docOld);
        data.append('docNewbtnQuitarRetiroSearchEmpl', docNew);
        data.append('comentbtnQuitarRetiroSearchEmpl', coment);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async updateConfigRang(inParamRangEmpl,inParamRangUsu,inParamRangNom,inParamConfigComent,ua) {
        let data = new FormData();
        data.append('inParamRangEmpl', inParamRangEmpl);
        data.append('inParamRangUsu', inParamRangUsu);
        data.append('inParamRangNom', inParamRangNom);
        data.append('inParamConfigComent', inParamConfigComent);
        data.append('inParamConfigUA', ua);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async consulParamRang() {
        let data = new FormData();
        data.append('consulParamRang', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async listMesesReport() {
        let data = new FormData();
        data.append('listMesesReport', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async dashboardHome1(u,m) {
        let data = new FormData();
        data.append('dashboardHome1Uni', u);
        data.append('dashboardHome1Mes', m);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async dashboardHome2(u,m) {
        let data = new FormData();
        data.append('dashboardHome2Uni', u);
        data.append('dashboardHome2Mes', m);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async dashboardHome3(u,m) {
        let data = new FormData();
        data.append('dashboardHome3Uni', u);
        data.append('dashboardHome3Mes', m);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }
    
    async rpteHomeCuentaMes(u,m) {
        let data = new FormData();
        data.append('rpteHomeCuentaMes_Uni', u);
        data.append('rpteHomeCuentaMes_Mes', m);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    /* SOCIODEMOGRAFICO*/

    async sociodemograficoInicio() {
        let data = new FormData();
        data.append('DS_sociodemograficoInicio', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }


    


    async sociodemograficoUpload(a) {
        let data = new FormData();
        data.append('DS_sociodemograficoUpload', a);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

    async sociodemograficoProcess() {
        let data = new FormData();
        data.append('DS_sociodemograficoProcess', 0);
        let response = await fetch('fetch/database.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }




    


    
    
}