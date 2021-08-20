const Swal = require('sweetalert2');
var CryptoJS = require("crypto-js");
export function save() {
    Swal.fire({
        icon: 'success',
        title: 'Guardado Exitoso!',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true,
        allowEscapeKey: false,
    })

}

export function cont(a) {
    Swal.fire({
        icon: 'success',
        title: a,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true,
        allowEscapeKey: false,
    })

}

export function cont2(a) {
    Swal.fire({
        // icon: 'success',
        imageUrl: 'http://10.208.254.8/wfm/dist/public/img/png/042-verify-min.png',
        imageHeight: 150,

        title: a,
        showConfirmButton: false,
        timer: 2000,
        toast: false,
        timerProgressBar: true,
        allowEscapeKey: false,
    })

}

export function powerOff(a) {
    Swal.fire({
        // icon: 'success',
        imageUrl: 'http://10.208.254.8/wfm/dist/public/img/png/054-power.png',
        imageHeight: 150,

        title: a,
        showConfirmButton: false,
        timer: 2000,
        toast: false,
        timerProgressBar: true,
        allowEscapeKey: false,
    })

}

export function remove(a) {
    Swal.fire({
        // icon: 'success',
        imageUrl: 'http://10.208.254.8/wfm/dist/public/img/png/056-remove.png',
        imageHeight: 150,

        title: a,
        showConfirmButton: false,
        timer: 2000,
        toast: false,
        timerProgressBar: true,
        allowEscapeKey: false,
    })

}


export function CancelarReload() {
    Swal.fire({
        icon: 'error',
        title: 'Cancelando...',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true,

    }); window["setTimeout"](function () { location["reload"]() }, 2000)
}

export function saveReload() {
    Swal.fire({
        icon: 'success',
        title: 'Guardado Exitoso!',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true,

    }); window["setTimeout"](function () { location["reload"]() }, 2000)
}

export function errorReload(a) {
    Swal.fire({
        icon: 'error',
        title: a,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true,
        allowEscapeKey: false,

    }); window["setTimeout"](function () { location["reload"]() }, 2000)
}

export function errorSave() {
    Swal.fire({
        icon: 'error',
        title: 'Error al Guardar!',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true,
        allowEscapeKey: false,

    })

}

export function error(a) {
    Swal.fire({
        icon: 'error',
        title: a,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true,
        allowEscapeKey: false,

    })

}


export function error2(a) {
    Swal.fire({
        imageUrl: 'http://10.208.254.8/wfm/dist/public/img/png/052-remove.png',
        imageHeight: 150,
        title: a,
        showConfirmButton: false,
        timer: 2000,
        toast: false,
        timerProgressBar: true,
        allowEscapeKey: false,

    })

}


export function security(a) {
    Swal.fire({
        imageUrl: 'http://10.208.254.8/wfm/dist/public/img/png/041-blocked.png',
        imageHeight: 150,
        // icon: 'error',
        title: a,
        showConfirmButton: false,
        timer: 2000,
        toast: false,
        timerProgressBar: true,
        allowEscapeKey: false,

    })

}

export function warning(a) {
    Swal.fire({
        icon: 'warning',
        title: a,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true,
        allowEscapeKey: false,

    })

}
export function confirm(a) {
    const result = Swal.fire({
        title: a,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        toast: false,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#dc3545',
        allowEscapeKey: false,
        allowOutsideClick: false,

    })

    return result;

}

export function confirm2(a) {
    const result = Swal.fire({
        imageUrl: 'http://10.208.254.8/wfm/dist/public/img/png/047-key.png',
        imageHeight: 150,
        title: a,
        html: '<br><div id="conteoPower" class="text-info h1" style="font-size:25px !important;"></div>',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Sigo aquí',
        confirmButtonColor: '#ffc107',
        toast: false,
        allowEscapeKey: false,
        allowOutsideClick: false,

    })

    return result;

}

export function load() {
    Swal.fire({
        customClass: 'swalcargando',
        imageUrl: "./public/img/oval.svg",
        html: '<h5 class="text-white" id="inValorProcess">Cargando...</h5>',
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,

    })
}


export function loadMsj(a) {
    Swal.fire({
        html: "<h5 class=\'text-white\'>" + a + "</h5>",
        customClass: 'swalcargando',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
    })
}

export function close() {
    Swal.close();
}

export function contador(a) {
    let b = a + 1;
    return b;
}

export async function userActivo() {


    // async function prueba(){
    //     b = await denc(localStorage.getItem('OLwfmUser'))
    //     return await b
    // }
    let b = await denc(localStorage.getItem('OLwfmUser'));
    let u = '';
    if (b === null) {
        u = false;
    } else {
        u = b // localStorage.getItem("OLwfmUser")
    }
    return u;
}

async function LlaveUser() {
    let data = new FormData();
    data.append('keyUser', 0);
    let response = await fetch('fetch/login.fetch.php', {
        method: 'post',
        body: data,
    });
    let j = await response.json();
    return j;
}

export async function enc(a) {
    const k = await LlaveUser();
    if (k > 0) {
        const e = CryptoJS.AES.encrypt(a, k).toString();
        return e;
    } else {
        alerts.error2('No existe key user')
    }
}

export async function denc(a) {
    const k = await LlaveUser();
    var bytes = CryptoJS.AES.decrypt(a, k);
    var d = bytes.toString(CryptoJS.enc.Utf8);
    return d;
}

// export function timePlugin(a) {
//     var timepicker = new TimePicker('time', {
//         lang: 'en',
//         theme: 'dark'
//     });

//     timepicker.on('change', function (evt) {
//         var value = (evt.hour || '00') + ':' + (evt.minute || '00');
//         evt.element.value = value;
//     });
// }