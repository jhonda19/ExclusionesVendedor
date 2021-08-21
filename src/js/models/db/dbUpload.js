export class Database {

    async almacenaTmpData(ua, datos,send) {
        let data = new FormData();
        data.append('User_almacenaTmpData', ua);
        data.append('Data_almacenaTmpData', datos);
        data.append('Data_paqSend', send);
        let response = await fetch('fetch/upload.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }


    async procesaTmpData(ua) {
        let data = new FormData();
        data.append('User_procesaTmpData', ua);
        let response = await fetch('fetch/upload.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = await response.json();
        return await json;
    }

}