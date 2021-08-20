export class Database {

    async almacenaTmpNovedadUGA(ua, datos) {
        let data = new FormData();
        data.append('User_almacenaTmpLic_Vac', ua);
        data.append('Data_almacenaTmpLic_Vac', datos);
        let response = await fetch('fetch/uga.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

    
}