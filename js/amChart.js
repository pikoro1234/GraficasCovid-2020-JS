am4core.ready(function() {



   /* SELECT QUE ENVIE EL VALOR SELECCIONADO */
   $('#selectPais').on('change', function() {

    let dato = this.value;

    let pais = $('#datosPais').val();

    creacionGrafico(pais, dato);
  })  
  /* SELECT QUE ENVIE EL VALOR SELECCIONADO */



  /* AJAX CONSUMIR API */
  const __ajaxActualizar = (url) => {  

    const ajax = $.ajax({
        "method":"GET",
        "url":url       
    })

    return ajax;
  } 
  /* AJAX CONSUMIR API */


  const creacionGrafico = (paises, datosEscogidos) =>{

    const arrayConfirmed = [];
    const arrayRecovered = [];
    const arrayDeathred = [];

    const arrayGeneral = [];

    
    /* PETICION CONFIRMED */
    let urlPeticionConfirmed = `https://api.covid19api.com/total/country/${paises}/status/confirmed`
    __ajaxActualizar(urlPeticionConfirmed)
    .done((info) =>{

      arrayConfirmed.push(info);

      console.log(arrayConfirmed)
    })
    /* PETICION CONFIRMED */


    /* PETICION RECOVERED */
    let urlPeticionRecovered = `https://api.covid19api.com/total/country/${paises}/status/recovered`
    __ajaxActualizar(urlPeticionRecovered)
    .done((info) =>{
  
      arrayRecovered.push(info);

      console.log(arrayRecovered)
    })
    /* PETICION RECOVERED */


    /* PETICION DEATHED */
    let urlPeticionDeathed = `https://api.covid19api.com/total/country/${paises}/status/deaths`
    __ajaxActualizar(urlPeticionDeathed)
    .done((info) =>{
       
      arrayDeathred.push(info);

      console.log(arrayDeathred)
    })
    /* PETICION DEATHED */   
    
    
    
    /* CREACION DE OBJETOS PARA GRAFICO */
    /* const creacionArrayMultiple = (datos) =>{

      console.log(datos)
      for (let i = 0; i < datos.length; i++) {
        
        /* console.log(datos[i]); */
        
     /* }
      
    } */
    
    

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      
      // Create chart instance
      var chart = am4core.create("chartdiv", am4charts.XYChart);
      
      //
      
      // Increase contrast by taking evey second color
      chart.colors.step = 2;
      
      // Add data
      chart.data = generateChartData();
      
      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;
      
      // Create series
      function createAxisAndSeries(field, name, opposite, bullet) {
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        if(chart.yAxes.indexOf(valueAxis) != 0){
            valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
        }
        
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.yAxis = valueAxis;
        series.name = name;
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.tensionX = 0.8;
        series.showOnInit = true;
        
        var interfaceColors = new am4core.InterfaceColorSet();
        
        switch(bullet) {
          case "triangle":
            var bullet = series.bullets.push(new am4charts.Bullet());
            bullet.width = 12;
            bullet.height = 12;
            bullet.horizontalCenter = "middle";
            bullet.verticalCenter = "middle";
            
            var triangle = bullet.createChild(am4core.Triangle);
            triangle.stroke = interfaceColors.getFor("background");
            triangle.strokeWidth = 2;
            triangle.direction = "top";
            triangle.width = 12;
            triangle.height = 12;
            break;
          case "rectangle":
            var bullet = series.bullets.push(new am4charts.Bullet());
            bullet.width = 10;
            bullet.height = 10;
            bullet.horizontalCenter = "middle";
            bullet.verticalCenter = "middle";
            
            var rectangle = bullet.createChild(am4core.Rectangle);
            rectangle.stroke = interfaceColors.getFor("background");
            rectangle.strokeWidth = 2;
            rectangle.width = 10;
            rectangle.height = 10;
            break;
          default:
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.stroke = interfaceColors.getFor("background");
            bullet.circle.strokeWidth = 2;
            break;
        }
        
        valueAxis.renderer.line.strokeOpacity = 1;
        valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.line.stroke = series.stroke;
        valueAxis.renderer.labels.template.fill = series.stroke;
        valueAxis.renderer.opposite = opposite;
      }

      /* DATOS PARA LOS OBJETOS */    
      createAxisAndSeries("confirmed", "Confirmed", false, "circle");
      createAxisAndSeries("recovered", "Recovered", true, "triangle");
      createAxisAndSeries("deathed", "Deathed", true, "rectangle");
      
      // Add legend
      chart.legend = new am4charts.Legend();
      
      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      
      // generate some random data, quite different range
      function generateChartData() {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);
        firstDate.setHours(0, 0, 0, 0);
      
        var confirmed = 1600;
        var recovered = 2900;
        var deathed = 8700;
      
        for (var i = 0; i < 15; i++) {
          // we create date objects here. In your data, you can have date strings
          // and then set format of your dates using chart.dataDateFormat property,
          // however when possible, use date objects, as this will speed up chart rendering.
          var newDate = new Date(firstDate);
          newDate.setDate(newDate.getDate() + i);
      
          confirmed += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
          recovered += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
          deathed += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
      
          chartData.push({
            date: newDate,
            confirmed: confirmed,
            recovered: recovered,
            deathed: deathed
          });
        }
        return chartData;
      }
      /* DATOS PARA LOS OBJETOS */

  }
    
}); // end am4core.ready()



/*
confirmed --> confirmados
deaths --> muertos
recovered --> recuperados 
https://api.covid19api.com/total/country/{slug-pais}/status/{dinamico} */