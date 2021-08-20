import jquery from 'jquery';
window.$ = window.jQuery = jquery;
var validator = require('validator');
var moment = require('moment');

export class AppController {

  creaPaquetes(data, tamano) {
    let paqTemp = 0
    let paquetes = []
    if (data.length == 1) {
      paquetes.push(data)
    } else {
      for (let i = 0; i < data.length + 1; i++) {
        const paq = []
        if (i == paqTemp +
          tamano) {
          for (let x = paqTemp; x < paqTemp + tamano; x++) {
            paq.push(data[x])
          }
          paqTemp = i
          paquetes.push(paq)
        } else if (data.length - paqTemp < tamano && data.length - paqTemp > 1) {
          for (let x = paqTemp; x < data.length; x++) {
            paq.push(data[x])
          }
          paqTemp = data.length
          paquetes.push(paq)
        }
      }
    }
    return paquetes

  }

  convertDate(a) {
    var date = new Date(a),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  convertDateTime(str) {
    var month, day, year, hours, minutes, seconds;
    var date = new Date(str),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        hours = ("0" + date.getHours()).slice(-2);
        minutes = ("0" + date.getMinutes()).slice(-2);
        seconds = ("0" + date.getSeconds()).slice(-2);

    var mySQLDate = [date.getFullYear(), month, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    return [mySQLDate, mySQLTime].join(" ");
  }

  convertTime(str) {
    var month, day, year, hours, minutes, seconds;
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    hours = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    seconds = ("0" + date.getSeconds()).slice(-2);

    var mySQLDate = [date.getFullYear(), month, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    if ([mySQLTime].join(" ") === 'aN:aN:aN') {
      return ''
    } else {
      return [mySQLTime].join(" ");
    }
  }

  minFecha(b) {
    let a = new Date();
    a.setDate(a.getDate() - b);

    let d = a.getDate() < 9 ? '0' + a.getDate() : a.getDate();
    let m = (a.getMonth() + 1) < 9 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1);
    let y = a.getFullYear();

    return `${y}-${m}-${d}`;
  };

  maxFecha(b) {
    let a = new Date();
    a.setDate(a.getDate() + b);

    let d = a.getDate() < 9 ? '0' + a.getDate() : a.getDate();
    let m = (a.getMonth() + 1) < 9 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1);
    let y = a.getFullYear();

    return `${y}-${m}-${d}`;
  };

  inicioSelect(list, a) {
    return list.slice(0, 0) + '<option selected hidden></option>' + list.slice(0 + Math.abs(0));
  }

  formInputsValido(a, inputs) {
    let datos = [];
    for (let index = 0; index < document.forms[a].length; index++) {
      datos.push(document.forms[a].elements[index].id);
    };
    let vbno = 0
    let res = false;
    if (Array.isArray(datos) && datos.length) {
      datos.map(e => { inputs.includes(e) === true ? vbno++ : false })
      if (vbno != datos.length) {
        res = false;
      } else {
        res = true;
      }
    } else {
      res = true;
    }
    return res;

  }


  formCompleto(a, inputs) {
    function validatorIn(b, c) {
      let val = c.substr(0, 3);
      let validacion = '';
      if (val === 'inT') { // validación campos de texto
        validacion = validator.isEmpty(b, { ignore_whitespace: true })
        if (validacion === false) {
          val = c.substr(0, 4)
          if (val === 'inTH') {
            validacion = validator.isLength(b, { min: 4, max: 5 })
            validacion === false ? validacion = true : validacion = false
          }

        } else {
          validacion = true
        }
      } else if (val === 'inE') { // validación campo telefonico
        validacion = validator.isMobilePhone(b, ['es-CO'])
        validacion === false ? validacion = true : validacion = false
      } else if (val === 'inM') { // validación campo correo Electronico
        validacion = validator.isEmail(b, { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, domain_specific_validation: false })
        validacion === false ? validacion = true : validacion = false
      } else if (val === 'inN') { // validación campo numero entero
        validacion = validator.isInt(b, { min: 0 })
        validacion === false ? validacion = true : validacion = false
      } else if (val === 'inF') { // validación campo float
        validacion = validator.isFloat(b)
        validacion === false ? validacion = true : validacion = false
      } else if (val === 'inD') { // validación campo fecha
        validacion = validator.isDate(b)
        validacion === false ? validacion = true : validacion = false
      } else {
        validacion = false;
      }
      return validacion;
    }

    let datos = [];
    for (let index = 0; index < document.forms[a].length; index++) {
      datos.push({ 'nombre': document.forms[a].elements[index].id, 'valor': document.forms[a].elements[index].value });
    };
    let valor = 0;
    if (Array.isArray(datos) && datos.length) {
      datos.map(e => {
        if (inputs.includes(e.nombre) === true) {
          valor++
          document.getElementById(e.nombre).classList.remove('border', 'border-danger')
          if (validatorIn(e.valor, e.nombre) === true) {
            valor--
            document.getElementById(e.nombre).className += " border border-danger";
          }
        }
      })
      return (valor / datos.length);

    } else {
      return 1;
    }

  }

  dateDiff(z) {
    var fi = moment(new Date(z));
    var ff = moment(new Date());

    let dias = ff.diff(fi, 'days', true)
    let meses = ff.diff(fi, 'months', true)
    let anio = ff.diff(fi, 'years', true)
    let res = []
    if (anio >= 1) {
      res.push(anio, 'Años')
    } else if (meses >= 1) {
      res.push(meses, 'Meses')
    } else {
      res.push(dias, 'Días')
    }
    return res;
  }

  // async tipificacionGestionOut() {
  // const res = await db.tipificacionOut();
  // localStorage.setItem('listSubGestionOutCovid', JSON.stringify(res));
  // }

  agrupaObj(res, valor) {
    let d = []
    res.map(e =>
      d.includes(e[valor]) === true ? [] : d.push(e[valor])
    )
    return d;
  }

  ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
      return a[p_key] > b[p_key];
    });


  }

  timePlugin(a, b) {
    $('#' + a).timepicker({
      timeFormat: 'H:mm',
      interval: 60,
      minTime: '0',
      maxTime: b,
      defaultTime: '0',
      startTime: '00:00',
      // closeOnWindowScroll: true,
      // disableTextInput: true,
      dynamic: false,
      dropdown: true,
      scrollbar: true,
      zindex: 3,
    });


  }


  sumarFecha(a, b) {
    let dateFrom = moment(a).add(b, 'd').format('YYYY-MM-DD');
    return dateFrom
  }

  validaFechaIugalMayorHoy(a) {
    let d
    if (moment(a).isSameOrAfter(moment())) {
      d = moment().add(-1, 'd').format('YYYY-MM-DD')
      return d;
    } else {
      d = moment(a).format('YYYY-MM-DD')
      return d;
    }
  }

  DateBeforeMoment(a, b) {
    let res = moment(a).isSameOrBefore(b);
    return res;
  }

  disableScroll() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y) };
  }

  enableScroll() {
    window.onscroll = null;
  }

}

