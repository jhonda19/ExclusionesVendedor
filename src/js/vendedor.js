'use strict';
import { GuiaExclusiones } from './models/vendedor/Exclusiones';

let page = window.location.href.split('/');
page = page[page.length - 1];

if (page === 'vendedor') {
    const i = new GuiaExclusiones();
    i.inicioExclusiones();
}
