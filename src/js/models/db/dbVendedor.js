export class Vendedor {   

    async qryFLujo1(a, b) {
        let data = new FormData();
        data.append('qry_f1_bu', a);
        data.append('qry_f1_proceso', b);
        let response = await fetch('fetch/vendedor.fetch.php', {
            method: 'post',
            body: data,
        });
        let json = response.json();
        return json;
    }

   
    
}