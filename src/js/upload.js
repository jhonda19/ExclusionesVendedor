'use strict';
// Modulos js Roster
import { uploadData } from './models/upload/UploadData';

// JS File page validation
let page = window.location.href.split('/');
page = page[page.length - 1];

 if (page === 'cargueDatos') {
    const i = new uploadData();
    i.inicioUpload();
} 
