jQuery( document ).ready(function() {

  $.fn.dataTable.ext.errMode = 'none';
  

  $('#account-statement').DataTable( {
    
    "pageLength": 50,
    "order": [],
    dom: 'Bfrtip',
    
    buttons: [
      {
          extend: 'pdfHtml5',
          
          orientation: 'landscape',
          pageSize: 'LEGAL',
          
      },'excelHtml5',
      
    ],
    "autoWidth": false,
   
} );
  
});