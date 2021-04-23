$(document).ready(function(){

    let contenedorSelect = document.querySelector(".form-select");



    /* AJAX CONSUMIR API */
    const __ajaxActualizar = (url) => {  

        const ajax = $.ajax({
            "method":"GET",
            "url":url          
        })

        return ajax;
    } 
    /* AJAX CONSUMIR API */



    /* PETICION AJAX */
    __ajaxActualizar("https://api.covid19api.com/countries")
    .done((info) =>{

        construccionSelect(info);
    })
    /* PETICION AJAX */



    /* SELECT DINAMICO */
    const construccionSelect = (datos) =>{

        for(let data of datos){

            contenedorSelect.innerHTML +=`<option value="${data.Slug}">${data.Country}</option>`;
        }
    } 
    /* SELECT DINAMICO */



    /* SELECT QUE ENVIE EL VALOR SELECCIONADO */
    $('#selectPais').on('change', function() {
        
        alert(this.value);
    })
    /* SELECT QUE ENVIE EL VALOR SELECCIONADO */

})