$(document).ready(function(){

    let contenedorSelect = document.querySelector(".form-select");

    let titulo = document.querySelector('.titulo-dinamico');



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

        function SortByName(a, b){ 

            var aName = a.Country.toLowerCase(); 

            var bName = b.Country.toLowerCase(); 

            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0)); 
        } 

        datos.sort(SortByName);

        for(let data of datos){

            contenedorSelect.innerHTML +=`<option value="${data.Slug}">${data.Country}</option>`;
        }
    } 
    /* SELECT DINAMICO */



    /* SELECT QUE ENVIE EL VALOR SELECCIONADO */
    $('#selectPais').on('change', function() {

        $(titulo).text(this.value);

        $('#datosPais').val(this.value);
    })
    /* SELECT QUE ENVIE EL VALOR SELECCIONADO */
})