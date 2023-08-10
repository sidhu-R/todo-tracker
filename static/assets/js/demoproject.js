$(document).ready(function() {
    $("#projectadd").validate({
  rules: {
    protitle:{
      required:true,
         },
    prodesc: {
      required: true,
    },
    prostart: {
      required: true,
    },
    proend: {
        required: true,
    },
    prohours: {
        required: true,
        digits:true,
    },

  },
  messages: {
    protitle:{
      required:"Project title is required",
    },

    prodesc:{
      required:'Project  description please',
    },
    prostart: {
      required:'Enter Start date please',
    },
    proend: {
        required:'Enter End date please',
    },
    prohours: {
        required:'Enter Estimated Hours please',
    },
    },
    submitHandler: function(form) {
        createProject(form);
        // return false;
      function createProject(form) {
        var formData = new FormData(form);
        $.ajax({
                url:'/project_create_view',
                type: 'POST',
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                  },
                data: formData,
                success: function (response) {
                    
                $('#Closebtn2').click()
                $('#projectadd')[0].reset();
                loadProject('','');
                // location.reload()
                alertify.set('notifier','position', 'top-right');
                alertify.notify('Project Added', 'custom', 2, function(){console.log('dismissed');});
            
                },
                error: function (response) {
                    alert('error')
                },
                cache: false,
                contentType: false,
                processData: false
        });
        };
         
        
    }
});
  
});
  


// load project
function loadProject(sortBy,sortBy2) {
  $('#projecttable').DataTable().clear().destroy();

  $.ajax({
    url: '/data_project_view/',
    type: 'GET',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    data: {
      'sort_by': sortBy,
      'sort_by2':sortBy2,
  },
    success: function(data) {
     
      var tbody = $('#projecttable tbody');
      tbody.empty();
  
      $.each(data, function(index, item) {  
        var row = `<tr data-id="${item.id}">
                        <td>${item.pro_title}</td>
                        <td>${item.pro_type}</td>
                        <td>${item.pro_status}</td>
                        <td>${item.pro_desc}</td>
                        <td>${item.pro_start}</td>
                        <td>${item.pro_end}</td>
                        <td>${item.duration}</td>
                        <td>${item.pro_hours}</td>
                        <td> <button id='but1' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#basicModal2'><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-primary" id="pageopenbtn"><a href="/managelist/${item.id}/"><i class="fa-solid fa-arrow-up"></i></a></button>
                        </td>
                      </tr>
                        `;
        tbody.append(row);
  
  
      });
  
      var dataTable = $('.datatable1').DataTable({
        "destroy": true,
        "retrieve": true,
        "info": false,
        "aaSorting": [],
        "language": {
          "emptyTable": "No Projects started yet"
        },

        drawCallback: function(settings) {
        var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
        pagination.toggle(this.api().page.info().pages > 1);
        },
        

  
      });
      
  
      dataTable.columns().every(function() {
      var column = this;
  
      $('.filter-column', this.footer()).on('keyup change', function() {
        if (column.search() !== this.value) {
          column
            .search(this.value)
            .draw();
          this.focus();
        }
      });


      });
      
  
  
    }
  
    
  });

  }
  
  loadProject('','');
  $('#task_date_submit').click(function() {
    var sortBy = $('#min').val();
    var sortBy2 = $('#max').val();
    loadProject(sortBy,sortBy2);
});
  



//update project
$(document).ready(function() {
  $("#editpro").validate({
  rules: {
    protitle2:{
      required:true,
         },
    prodesc2: {
      required: true,
    },
    prostart2: {
      required: true,
    },
    proend2: {
        required: true,
    },
    prohours2: {
        required: true,
        digits:true,
    },

  },
  messages: {
    protitle2:{
      required:"Project title is required",
    },

    prodesc2:{
      required:'Project  description please',
    },
    prostart2: {
      required:'Enter Start date please',
    },
    proend2: {
        required:'Enter End date please',
    },
    prohours2: {
        required:'Enter Estimated Hours please',
    },
    },
    submitHandler: function(form) {
    updateProject(form);
    return false;
    
  }

});

});


function updateProject() {
  var selectedRow = $('#projecttable tbody tr.selected');
  if (selectedRow.length === 0) {
    alert('Please select a row to update.');
    return;
  }
  
  var id = selectedRow.data('id');
  var title = $('#protitle2').val();
  var desc = $('#prodesc2').val();
  var start_dte = $('#prostart2').val();
  var end_dte = $('#proend2').val();
  var hour = $('#prohours2').val();
  var protype = $('#protype2').val();
  var status = $('#prostatus2').val();
  
  
  $.ajax({
  
  url: '/project_update/' + id + '/',
  type: 'POST',
  dataType: 'json',
  headers: {
    "X-CSRFToken": getCookie("csrftoken"),
  },
  data: {
    title:title,
    desc:desc,
    start_dte:start_dte,
    end_dte:end_dte,
    hour:hour,
    protype:protype,
    status:status,
  },
  success: function(response) {
  
    $('#protitle2').val('');
    $('#prodesc2').val('');
    $('#prostart2').val('');
    $('#proend2').val('');
    $('#prohours2').val(''); 

    // alert('Task updated');
    $('#proupclose').click();
    loadProject('','');
    // location.reload()
    
    alertify.set('notifier','position', 'top-right');
    alertify.notify('Project Updated', 'custom', 2, function(){console.log('dismissed');});
      
  
  }
});
}







// select a row and pass it
$(document).on('click', '#projecttable tbody tr', function() {
  $('#projecttable tbody tr').removeClass('selected');
  $(this).addClass('selected');
  
  var title = $(this).find('td:eq(0)').text();
  var type = $(this).find('td:eq(1)').text();
  var status = $(this).find('td:eq(2)').text();
  var desc = $(this).find('td:eq(3)').text();
  var dte = $(this).find('td:eq(4)').text();
  var dte2 = $(this).find('td:eq(5)').text();
  var hour = $(this).find('td:eq(6)').text();
  
  
  $('#protitle2').val(title);
  $('#prodesc2').val(desc);
  $('#prostart2').val(dte);
  $('#proend2').val(dte2);
  $('#prohours2').val(hour);
  $('#prostatus2').val(status);
  $('#protype2').val(type);
});
  



$('#prodeactivate').click(deactivatepro);
function deactivatepro() {
  var selectedRow = $('#projecttable tbody tr.selected');
  if (selectedRow.length === 0) {
    alert('Please select a row to delete.');
    return;
  }
  if (confirm('Are you sure you want to deactivate this Project ?')) {
  
  var id = selectedRow.data('id');
  
  $.ajax({
    url: '/project_delete/' + id + '/',  
    type: 'POST',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    dataType: 'json',
    success: function(response) {
  
      $('#protitle2').val('');
      $('#prodesc2').val('');
      $('#prostart2').val('');
      $('#proend2').val('');
      $('#prohours2').val(''); 
  
      // alert('Task Deactivated');
      // location.reload();
      loadProject('','');
      $('#proupclose').click()
      alertify.set('notifier','position', 'top-right');
      alertify.notify('Project Deactivated', 'custom', 2, function(){console.log('dismissed');});
  

    
    }
  });
  }
  }



function getCookie(name) {
let cookieValue = null;
if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }
}
return cookieValue;
}
const csrftoken = getCookie('csrftoken');