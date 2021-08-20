export class Database {

    async almacenaTmpMallas(ua, datos,send) {
        let data = new FormData();
        data.append('User_almacenaTmpMallas', ua);
        data.append('Data_almacenaTmpMallas', datos);
        data.append('Data_paqSend', send);
        let response = await fetch('fetch/mallas.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }


    async procesaTmpMallas(ua) {
        let data = new FormData();
        data.append('User_procesaTmpMallas', ua);
        let response = await fetch('fetch/mallas.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

    async consultaTmpMallasxEstado(ua, req) {
        let data = new FormData();
        data.append('User_consultaTmpMalasXe', ua);
        data.append('Estado_consultaTmpMalasXe', req);
        let response = await fetch('fetch/mallas.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

    async ejecutaTmpMalla(ua) {
        let data = new FormData();
        data.append('User_ejecutaTmpMalla', ua);
        let response = await fetch('fetch/mallas.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }




    
    
}